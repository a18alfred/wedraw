import { useControlDraggingState } from '@/shared/state/control';
import { useEffect } from 'react';
import { useOptionsMode, useOptionsShape } from '@/shared/state/options';
import { useRefs } from '@/modules/room/hooks/useRefs';
import { generateBrushCursorSVG, zoomInSVG, zoomOutSVG } from '@/shared/utils/generateSVGcursor';
import { useOptionsLineWidth, useOptionsZoom } from '@/shared/state/options/options.hooks';
import { useBackground } from '@/shared/state/background';

const CursorUpdater = () => {
    const { clientCanvasRef } = useRefs();
    const { dragging } = useControlDraggingState();
    const { lineWidth } = useOptionsLineWidth();
    const bg = useBackground();
    const toolMode = useOptionsMode();
    const toolShape = useOptionsShape();
    const { setZoomInMode, setZoomOutMode } = useOptionsZoom();

    useEffect(() => {
        if (toolMode === 'zoomIn' || toolMode === 'zoomOut') {
            function handleKeyDown(event: KeyboardEvent) {
                if (event.repeat) return;
                event.preventDefault();
                if (event.altKey || event.metaKey) {
                    if (toolMode === 'zoomIn') setZoomOutMode();
                }
            }

            function handleKeyUp(event: KeyboardEvent) {
                event.preventDefault();
                if (!event.altKey && !event.metaKey) {
                    if (toolMode === 'zoomOut') setZoomInMode();
                }
            }

            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('keyup', handleKeyUp);
            };
        }
    }, [setZoomOutMode, toolMode, setZoomInMode]);

    useEffect(() => {
        const cursorSwitcher = () => {
            if (!clientCanvasRef.current) return;
            if (dragging) {
                clientCanvasRef.current.style.cursor = 'grab';
                return;
            }

            if (toolShape !== 'line') {
                clientCanvasRef.current.style.cursor = 'default';
                return;
            }

            const brushSVG = generateBrushCursorSVG(lineWidth < 2 ? 2 : lineWidth, bg.mode);
            switch (toolMode) {
                case 'zoomIn':
                    clientCanvasRef.current.style.cursor =
                        `url("data:image/svg+xml,${encodeURIComponent(zoomInSVG(bg.mode))}") 
                            0 0,
                            auto
                            `;
                    break;
                case 'zoomOut':
                    clientCanvasRef.current.style.cursor =
                        `url("data:image/svg+xml,${encodeURIComponent(zoomOutSVG(bg.mode))}") 
                            0 0,
                            auto
                            `;
                    break;
                case 'draw':
                case 'eraser':
                    clientCanvasRef.current.style.cursor =
                        `url("data:image/svg+xml,${encodeURIComponent(brushSVG)}") 
                            ${Math.floor(lineWidth / 2)}
                            ${Math.floor(lineWidth / 2)},
                            auto
                            `;
                    break;
                default:
                    clientCanvasRef.current.style.cursor = 'default';
            }
        };

        cursorSwitcher();
    }, [dragging, toolMode, lineWidth, toolShape, bg.mode]);

    return null;
};

export default CursorUpdater;
