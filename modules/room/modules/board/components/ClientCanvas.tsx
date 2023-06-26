import React, { useEffect, useRef } from 'react';

import { motion, useDragControls } from 'framer-motion';

import { CANVAS_SIZE, ZOOM_SETTINGS } from '@/shared/constants/canvasSize';
import { useViewportSize } from '@/shared/hooks/useViewportSize';

import { useRefs } from '../../../hooks/useRefs';
import { useBoardPosition } from '../hooks/useBoardPosition';
import { useDraw } from '../hooks/useDraw';
import { useControlDraggingState, useControl, useControlZoom } from '@/shared/state/control/control.hooks';
import MoveUpdater from '@/modules/room/modules/board/components/MoveUpdater';
import { useOptionsMode } from '@/shared/state/options';
import useLocalDraw from '@/modules/room/hooks/useLocalDraw';
import { useSocketDraw } from '@/modules/room/modules/board/hooks/useSocketDraw';

const ClientCanvas = () => {
    const { clientCanvasRef } = useRefs();
    const { width, height } = useViewportSize();
    const { x, y } = useBoardPosition();

    const { dragging } = useControlDraggingState();
    const { startDragging, stopDragging, startTouchDragging, stopTouchDragging } = useControl();
    const { zoom, offsetX, offsetY, zoomInStep, zoomOutStep, setZoom } = useControlZoom();
    const mode = useOptionsMode();
    const dragControls = useDragControls();
    const lastZoomDiff = useRef<number>(0);
    const lastCenterX = useRef<number>(0);
    const lastCenterY = useRef<number>(0);
    const { isDrawing } = useLocalDraw();
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    const {
        handleEndDrawing,
        handleDraw,
        handleStartDrawing,
        clearOnYourMove,
    } = useDraw();

    useSocketDraw();

    useEffect(() => {
        stopDragging();
    }, []);

    const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (isTouchDevice) return;
        if (e.button === 2) {
            if (!isDrawing) {
                startDragging();
                dragControls.start(e as unknown as PointerEvent);
            }
            return;
        }
        if (mode === 'zoomIn') {
            zoomInStep(e.clientX, e.clientY);
            return;
        }
        if (mode === 'zoomOut') {
            zoomOutStep(e.clientX, e.clientY);
            return;
        }
        handleStartDrawing(e.clientX, e.clientY);
    };

    const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (isTouchDevice) return;
        if (e.button === 2) stopDragging();
        else handleEndDrawing();
    };

    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (isTouchDevice) return;
        handleDraw(e.clientX, e.clientY, e.shiftKey);
    };

    const onTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
        if (dragging) return;
        switch (e.touches.length) {
            case 2:
                handleEndDrawing(true);
                startTouchDragging();
                const finger1 = e.touches[0];
                const finger2 = e.touches[1];
                const distance = Math.sqrt(
                    (finger1.clientX - finger2.clientX) ** 2 +
                    (finger1.clientY - finger2.clientY) ** 2,
                );
                lastCenterX.current = (finger1.clientX + finger2.clientX) / 2;
                lastCenterY.current = (finger1.clientY + finger2.clientY) / 2;
                lastZoomDiff.current = distance;
                break;
            case 1:
                handleStartDrawing(
                    e.changedTouches[0].clientX,
                    e.changedTouches[0].clientY,
                );
                break;
        }
    };

    const onTouchEnd = () => {
        handleEndDrawing();
        if (lastCenterX.current !== 0 || lastZoomDiff.current !== 0) stopTouchDragging();
        lastZoomDiff.current = 0;
        lastCenterX.current = 0;
        lastCenterY.current = 0;
    };

    const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
        if (dragging) return;

        switch (e.touches.length) {
            case 1:
                handleDraw(
                    e.changedTouches[0].clientX,
                    e.changedTouches[0].clientY,
                );
                break;
            case 2:

                const finger1 = e.touches[0];
                const finger2 = e.touches[1];
                const centerX = (finger1.clientX + finger2.clientX) / 2;
                const centerY = (finger1.clientY + finger2.clientY) / 2;
                const distance = Math.sqrt(
                    (finger1.clientX - finger2.clientX) ** 2 +
                    (finger1.clientY - finger2.clientY) ** 2,
                );
                const diff = distance - lastZoomDiff.current;
                if (diff > 0) {
                    const newZoom = Math.min(zoom + diff / 100, ZOOM_SETTINGS.max);
                    setZoom(newZoom, centerX, centerY);
                } else if (diff < 0) {
                    const newZoom = Math.max(zoom + diff / 100, ZOOM_SETTINGS.min);
                    setZoom(newZoom, centerX, centerY);
                }
                lastZoomDiff.current = distance;

                const centerDiffX = (lastCenterX.current - centerX);
                const centerDiffY = (lastCenterY.current - centerY);

                const newBoardX = x.get() - centerDiffX;
                const newBoardY = y.get() - centerDiffY;

                if (newBoardX < (-offsetX) && (newBoardX > -(CANVAS_SIZE.width * zoom + offsetX - width))) x.set(Math.floor(newBoardX));
                if (newBoardY < (-offsetY) && (newBoardY > -(CANVAS_SIZE.height * zoom + offsetY - height))) y.set(Math.floor(newBoardY));

                lastCenterX.current = centerX;
                lastCenterY.current = centerY;

                break;
        }
    };

    return (
        <div className={`relative h-full w-full overflow-hidden`}>
            <motion.canvas
                ref={clientCanvasRef}
                width={CANVAS_SIZE.width}
                height={CANVAS_SIZE.height}
                className={'absolute top-0 z-canvas-client'}
                style={{ x, y, scale: zoom }}

                drag={dragging}
                dragConstraints={{
                    left: -(CANVAS_SIZE.width - width) + offsetX,
                    right: -offsetX,
                    top: -(CANVAS_SIZE.height - height) + offsetY,
                    bottom: -offsetY,
                }}
                dragControls={dragControls}
                dragElastic={0}
                dragTransition={{ power: 0, timeConstant: 0 }}

                onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onTouchMove={onTouchMove}
            />
            <MoveUpdater clearOnYourMove={clearOnYourMove} />
        </div>
    );
};

export default ClientCanvas;