import { useEffect, useMemo, useRef, useState } from 'react';

import { motion, useMotionValue } from 'framer-motion';

import { CANVAS_SIZE } from '@/shared/constants/canvasSize';
import { useViewportSize } from '@/shared/hooks/useViewportSize';

import { useRefs } from '../../../hooks/useRefs';
import { useBoardPosition } from '../hooks/useBoardPosition';
import { useControlDraggingState, useControlMapState, useControlZoom } from '@/shared/state/control/control.hooks';

type MiniMapSize = {
    map: {
        width: number
        height: number
    },
    indicator: {
        width: number
        height: number
    }
}

const MiniMap = () => {
    const { dragging, touchDragging } = useControlDraggingState();
    const opened = useControlMapState();
    const boardPos = useBoardPosition();
    const { width, height } = useViewportSize();
    const { zoom, offsetX, offsetY } = useControlZoom();

    const { minimapRef, clientCanvasRef } = useRefs();
    const containerRef = useRef<HTMLDivElement>(null);

    const miniX = useMotionValue(0);
    const miniY = useMotionValue(0);

    const [draggingMinimap, setDraggingMinimap] = useState(false);

    const divider = useMemo(() => {
        if (width > 1600) return 10;
        if (width > 1000) return 13;
        if (width > 600) return 17;
        return 20;
    }, [width]);

    const size = useMemo<MiniMapSize>(() => {
        const sizes = {
            map: {
                width: CANVAS_SIZE.width / divider,
                height: CANVAS_SIZE.height / divider,
            },
            indicator: {
                width: Math.min(width / divider, CANVAS_SIZE.width / divider) / zoom,
                height: Math.min(height / divider, CANVAS_SIZE.height / divider) / zoom,
            },
        };

        const indicatorDifY = sizes.map.height - (miniY.get() + sizes.indicator.height);
        if (indicatorDifY < 0) miniY.set(sizes.map.height - sizes.indicator.height);

        const indicatorDifX = sizes.map.width - (miniX.get() + sizes.indicator.width);
        if (indicatorDifX < 0) miniX.set(sizes.map.width - sizes.indicator.width);

        const boardPosX = boardPos.x.get() - width;
        if ((-boardPosX - offsetX) > CANVAS_SIZE.width * zoom) boardPos.x.set(width - CANVAS_SIZE.width * zoom - offsetX);
        miniX.set(Math.floor(-(boardPos.x.get() + offsetX) / divider / zoom));

        const boardPosY = boardPos.y.get() - height;
        if ((-boardPosY - offsetY) > CANVAS_SIZE.height * zoom) boardPos.y.set(height - CANVAS_SIZE.height * zoom - offsetY);
        miniY.set(Math.floor(-(boardPos.y.get() + offsetY) / divider / zoom));

        return sizes;
    }, [divider, width, height, zoom, offsetX, offsetY]);


    useEffect(() => {
        function updatePositionX(newX: number) {
            if (draggingMinimap) boardPos.x.set(Math.floor(-newX * divider * zoom - offsetX));
        }

        function updatePositionY(newY: number) {
            if (draggingMinimap) boardPos.y.set(Math.floor(-newY * divider * zoom - offsetY));
        }

        function updateIndicatorPositionX(newX: number) {
            if ((dragging || touchDragging) && !draggingMinimap) miniX.set(Math.floor(-(newX + offsetX) / divider / zoom));
        }

        function updateIndicatorPositionY(newY: number) {
            if ((dragging || touchDragging) && !draggingMinimap) miniY.set(Math.floor(-(newY + offsetY) / divider / zoom));
        }

        const unsubscribeBorderX = boardPos.x.onChange(updateIndicatorPositionX);
        const unsubscribeBorderY = boardPos.y.onChange(updateIndicatorPositionY);
        const unsubscribeX = miniX.onChange(updatePositionX);
        const unsubscribeY = miniY.onChange(updatePositionY);

        return () => {
            unsubscribeBorderX();
            unsubscribeBorderY();
            unsubscribeX();
            unsubscribeY();
        };

    }, [divider, dragging, touchDragging, draggingMinimap, offsetX, offsetY, zoom]);

    const startDrag = () => {
        if (clientCanvasRef.current)
            clientCanvasRef.current.style.pointerEvents = 'none';
        setDraggingMinimap(true);
    };

    const stopDrag = () => {
        if (clientCanvasRef.current)
            clientCanvasRef.current.style.pointerEvents = 'auto';
        setDraggingMinimap(false);
    };

    return (
        <>
            <motion.div
                className={`absolute right-2 top-2 sm:right-4 sm:top-4 z-map overflow-hidden box-border bg-tertiary shadow-card`}
                style={{
                    width: size.map.width,
                    height: size.map.height,
                }}
                animate={{
                    x: opened ? 0 : size.map.width + 100,
                }}
                transition={{
                    duration: 0.2,
                }}
                ref={containerRef}
            >
                <canvas
                    ref={minimapRef}
                    width={CANVAS_SIZE.width}
                    height={CANVAS_SIZE.height}
                    className='h-full w-full opacity-95 dark:opacity-20'
                />
                <motion.div
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0}
                    onDragStart={startDrag}
                    onDragEnd={stopDrag}
                    dragTransition={{ power: 0, timeConstant: 0 }}
                    className='absolute top-0 left-0 cursor-grab border-2 border-violet-500'
                    style={{
                        width: size.indicator.width,
                        height: size.indicator.height,
                        x: miniX,
                        y: miniY,
                    }}
                />
            </motion.div>
        </>
    );
};

export default MiniMap;
