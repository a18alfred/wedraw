import { useRef } from 'react';

import { DEFAULT_MOVE } from '@/shared/constants/defaultMove';
import { useViewportSize } from '@/shared/hooks/useViewportSize';
import { getPos } from '@/shared/utils/getPos';
import { getStringFromRgba } from '@/shared/utils/rgba';
import { socket } from '@/shared/utils/socket';
import { useOptionsValue } from '@/shared/state/options';
import { useSetSelection } from '@/shared/state/options/options.hooks';
import { useSetSavedMoves } from '@/shared/state/savedMoves';
import { Move, PathPoint } from '@/shared/types/global';

import { drawRect, drawCircle, drawLine } from '../helpers/Canvas.helpers';
import { useBoardPosition } from './useBoardPosition';
import { useClientCtx } from './useClientCtx';
import { useRefs } from '@/modules/room/hooks/useRefs';
import { smoothPath } from '@/shared/utils/smoothPoints';
import { useControlDraggingState, useControlZoom } from '@/shared/state/control';
import { checkNewSelection } from '@/shared/utils/selectionChecker';
import { useMainCtx } from '@/modules/room/modules/board/hooks/useMainCtx';
import { v4 } from 'uuid';
import useLocalDraw from '@/modules/room/hooks/useLocalDraw';

let tempMoves: PathPoint[] = [];
let tempCircle = { cX: 0, cY: 0, radiusX: 0, radiusY: 0 };
let tempRect = { width: 0, height: 0 };
let tempImageData: ImageData | undefined;

export const useDraw = () => {
    const { imageRef } = useRefs();
    const options = useOptionsValue();
    const boardPosition = useBoardPosition();
    const { clearSavedMoves } = useSetSavedMoves();
    const { setSelection, clearSelection } = useSetSelection();
    const vw = useViewportSize();
    const { zoom, offsetX, offsetY } = useControlZoom();
    const touchDevice = window.matchMedia('(pointer: coarse)').matches;
    const { isDrawing, setIsDrawing, addToDrawCache } = useLocalDraw();
    const { dragging } = useControlDraggingState();

    const movedX = boardPosition.x;
    const movedY = boardPosition.y;

    const clientCtx = useClientCtx();
    const mainCtx = useMainCtx();
    const ctx = useRef<CanvasRenderingContext2D | undefined>(undefined);

    const blocked = options.mode === 'zoomIn' || dragging || options.mode === 'zoomOut';
    const setupCtxOptions = () => {
        if (!ctx.current) return;

        ctx.current.lineWidth = options.lineWidth;
        ctx.current.strokeStyle = getStringFromRgba(options.lineColor);
        ctx.current.fillStyle = getStringFromRgba(
            options.fillShape ? options.fillColor : { r: 0, g: 0, b: 0, a: 0 },
        );

        switch (options.mode) {
            case 'eraser':
                ctx.current.strokeStyle = getStringFromRgba({ ...options.lineColor, a: options.eraserOpacity });
                ctx.current.globalCompositeOperation = 'destination-out';
                break;
            default:
                ctx.current.globalCompositeOperation = 'source-over';
                break;
        }
    };
    const cacheCanvasVisiblePart = () => {
        const screenX = (-movedX.get() - offsetX) / zoom;
        const screenY = (-movedY.get() - offsetY) / zoom;

        if (!tempImageData && ctx.current) {
            tempImageData = ctx.current.getImageData(
                screenX,
                screenY,
                vw.width,
                vw.height,
            );
        }

        if (tempImageData && ctx.current) {
            ctx.current.putImageData(
                tempImageData,
                screenX,
                screenY,
            );
        }
    };

    const handleStartDrawing = (x: number, y: number) => {
        switch (options.mode) {
            case 'eraser':
                ctx.current = mainCtx;
                cacheCanvasVisiblePart();
                break;
            case 'select':
                clearSelection();
                ctx.current = clientCtx;
                break;
            default:
                ctx.current = clientCtx;
                cacheCanvasVisiblePart();
                break;
        }

        if (!ctx.current || blocked) return;
        if (imageRef.current) imageRef.current.style.pointerEvents = 'none';

        setIsDrawing(true);
        setupCtxOptions();

        const [finalX, finalY] = [getPos(x, movedX, offsetX, zoom), getPos(y, movedY, offsetY, zoom)];

        if (options.mode !== 'select' && options.shape === 'line') {
            ctx.current.beginPath();
            ctx.current.lineTo(finalX, finalY);
            if (touchDevice) touchScreenHack(finalX, finalY);
            ctx.current.stroke();
        }

        tempMoves.push([finalX, finalY]);
    };

    const handleDraw = (x: number, y: number, shift?: boolean) => {
        if (!ctx.current || !isDrawing || blocked) return;

        const [finalX, finalY] = [getPos(x, movedX, offsetX, zoom), getPos(y, movedY, offsetY, zoom)];

        cacheCanvasVisiblePart();

        if (options.mode === 'select') {
            ctx.current.fillStyle = 'rgba(74,54,182,0.4)';
            drawRect(ctx.current, tempMoves[0], finalX, finalY, false, true);
            tempMoves.push([finalX, finalY]);
            setupCtxOptions();

            return;
        }

        switch (options.shape) {
            case 'line':
                if (shift) tempMoves = tempMoves.slice(0, 1);
                drawLine(ctx.current, tempMoves[0], finalX, finalY, shift);
                tempMoves.push([finalX, finalY]);
                break;

            case 'circle':
                tempCircle = drawCircle(
                    ctx.current,
                    tempMoves[0],
                    finalX,
                    finalY,
                    shift,
                );
                break;

            case 'rect':
                tempRect = drawRect(
                    ctx.current,
                    tempMoves[0],
                    finalX,
                    finalY,
                    shift,
                );
                break;

            default:
                break;
        }
    };

    const clearOnYourMove = () => {
        cacheCanvasVisiblePart();
        tempImageData = undefined;
    };
    const handleEndDrawing = (cancel?: boolean) => {
        if (!ctx.current || blocked || !isDrawing) return;
        if (imageRef.current) imageRef.current.style.pointerEvents = 'auto';

        setIsDrawing(false);
        ctx.current.closePath();

        if (cancel) {
            clearOnYourMove();
            clearTemp();
            return;
        }

        switch (options.mode) {
            case 'select':
                if (tempMoves.length === 0) break;
                clearOnYourMove();
                const { x, y, width, height } = checkNewSelection({
                    x: tempMoves[0][0],
                    y: tempMoves[0][1],
                    width: tempMoves[tempMoves.length - 1][0] - tempMoves[0][0],
                    height: tempMoves[tempMoves.length - 1][1] - tempMoves[0][1],
                });

                if ((width < 4 || width > 4) && (height < 4 || height > 4)) {
                    setSelection({ x, y, width, height });
                } else {
                    clearSelection();
                }
                break;

            default:
                let canceledMove = false;

                switch (options.shape) {
                    case 'circle':
                        if (tempCircle.radiusX === 0 && tempCircle.radiusY === 0)
                            canceledMove = true;
                        break;
                    case 'rect':
                        if (tempRect.width === 0 && tempRect.height === 0)
                            canceledMove = true;
                        break;
                    default:
                        break;
                }

                if (canceledMove) break;

                const lineColor = options.mode === 'eraser'
                    ? { ...options.lineColor, a: options.eraserOpacity }
                    : options.lineColor;

                const move: Move = {
                    ...DEFAULT_MOVE,
                    id: v4(),
                    rect: {
                        ...tempRect,
                    },
                    circle: {
                        ...tempCircle,
                    },
                    path: smoothPath(tempMoves, options.pathSmoothness),
                    options: {
                        ...options,
                        lineColor,
                    },
                };

                addToDrawCache(move);

                if (options.mode === 'draw') clearOnYourMove();

                socket.emit('draw', move);
                clearSavedMoves();
                break;
        }

        clearTemp();
    };

    const clearTemp = () => {
        tempMoves = [];
        tempCircle = { cX: 0, cY: 0, radiusX: 0, radiusY: 0 };
        tempRect = { width: 0, height: 0 };
    };

    const touchScreenHack = (x: number, y: number) => {
        ctx.current?.lineTo(x, y);
        tempMoves.push([x + 0.01, y + 0.01]);
    };

    return {
        handleEndDrawing,
        handleDraw,
        handleStartDrawing,
        clearOnYourMove,
    };
};
