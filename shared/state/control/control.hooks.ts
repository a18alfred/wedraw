import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    controlDraggingSelector, controlIsChatOpenSelector,
    controlIsMapOpenSelector,
    controlIsToolsOpenSelector, controlTouchDraggingSelector, controlZoomSelector,
} from '@/shared/state/control/control.selectors';
import { controlAtom } from '@/shared/state/control/control.atom';
import { useEffect } from 'react';
import { CANVAS_SIZE, ZOOM_SETTINGS } from '@/shared/constants/canvasSize';
import { useBoardPosition } from '@/modules/room/modules/board/hooks/useBoardPosition';
import { useViewportSize } from '@/shared/hooks/useViewportSize';

export const useControlState = () => {
    return useRecoilValue(controlAtom);
};
export const useControlDraggingState = () => {
    const dragging = useRecoilValue(controlDraggingSelector);
    const touchDragging = useRecoilValue(controlTouchDraggingSelector);

    return {
        dragging,
        touchDragging,
    };
};

export const useControlZoom = () => {
    const { zoom, offsetX, offsetY } = useRecoilValue(controlZoomSelector);
    const setControl = useSetRecoilState(controlAtom);
    const { x, y } = useBoardPosition();
    const { width, height } = useViewportSize();


    const setZoom = (newZoom: number, clientCenterX?: number, clientCenterY?: number) => {
        if (zoom === newZoom) return;
        if (newZoom < ZOOM_SETTINGS.min) return;
        if (newZoom > ZOOM_SETTINGS.max) return;

        const newOffsetX = Math.floor((CANVAS_SIZE.width - CANVAS_SIZE.width * newZoom) / 2);
        const newOffsetY = Math.floor((CANVAS_SIZE.height - CANVAS_SIZE.height * newZoom) / 2);

        const zoomMultiplier = newZoom / zoom;
        const centerX = clientCenterX || width / 2;
        const centerY = clientCenterY || height / 2;

        let newCenterX = (-x.get() - offsetX + centerX) * zoomMultiplier - centerX;
        if (newCenterX < 0) newCenterX = 0;
        x.set(-newCenterX - newOffsetX);

        let newCenterY = (-y.get() - offsetY + centerY) * zoomMultiplier - centerY;
        if (newCenterY < 0) newCenterY = 0;
        y.set(-newCenterY - newOffsetY);

        setControl(prev => ({
            ...prev, zoom: newZoom, offsetX: newOffsetX, offsetY: newOffsetY,
        }));
    };

    const zoomInStep = (clientCenterX: number, clientCenterY: number) => {
        setZoom(zoom + ZOOM_SETTINGS.step, clientCenterX, clientCenterY);
    };

    const zoomOutStep = (clientCenterX: number, clientCenterY: number) => {
        setZoom(zoom - ZOOM_SETTINGS.step, clientCenterX, clientCenterY);
    };

    return {
        zoom,
        offsetX,
        offsetY,
        setZoom,
        zoomInStep,
        zoomOutStep,
    };
};

export const useControlMapState = () => {
    return useRecoilValue(controlIsMapOpenSelector);
};

export const useControlToolsState = () => {
    return useRecoilValue(controlIsToolsOpenSelector);
};

export const useControlChatState = () => {
    return useRecoilValue(controlIsChatOpenSelector);
};

export const useControl = () => {
    const setControl = useSetRecoilState(controlAtom);

    const toggleMap = () => {
        setControl(prev => ({ ...prev, isMapOpen: !prev.isMapOpen }));
    };

    const toggleDragging = () => {
        setControl(prev => ({ ...prev, dragging: !prev.dragging }));
    };

    const toggleTools = () => {
        setControl(prev => ({ ...prev, isToolsOpen: !prev.isToolsOpen }));
    };

    const toggleChat = () => {
        setControl(prev => ({ ...prev, isChatOpen: !prev.isChatOpen }));
    };

    const startDragging = () => {
        setControl(prev => ({ ...prev, dragging: true }));
    };

    const stopDragging = () => {
        setControl(prev => ({ ...prev, dragging: false }));
    };

    const startTouchDragging = () => {
        setControl(prev => ({ ...prev, touchDragging: true }));
    };

    const stopTouchDragging = () => {
        setControl(prev => ({ ...prev, touchDragging: false }));
    };

    useEffect(() => {
        window.addEventListener('resize', stopDragging);

        return () => {
            window.removeEventListener('resize', stopDragging);
        };
    }, []);

    return {
        toggleMap,
        toggleDragging,
        toggleTools,
        startDragging,
        stopDragging,
        toggleChat,
        startTouchDragging,
        stopTouchDragging,
    };
};
