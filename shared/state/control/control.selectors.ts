import { selector } from 'recoil';
import { controlAtom } from '@/shared/state/control/control.atom';

export const controlDraggingSelector = selector({
    key: 'controlDragging',
    get: ({ get }) => {
        const room = get(controlAtom);
        return room.dragging;
    },
});

export const controlIsMapOpenSelector = selector({
    key: 'controlIsMapOpened',
    get: ({ get }) => {
        const room = get(controlAtom);
        return room.isMapOpen;
    },
});

export const controlIsToolsOpenSelector = selector({
    key: 'controlIsToolsOpen',
    get: ({ get }) => {
        const room = get(controlAtom);
        return room.isToolsOpen;
    },
});

export const controlIsChatOpenSelector = selector({
    key: 'controlIsChatOpen',
    get: ({ get }) => {
        const room = get(controlAtom);
        return room.isChatOpen;
    },
});

export const controlZoomSelector = selector({
    key: 'controlZoom',
    get: ({ get }) => {
        const room = get(controlAtom);
        return {
            zoom: room.zoom,
            offsetX: room.offsetX,
            offsetY: room.offsetY,
        };
    },
});

export const controlTouchDraggingSelector = selector({
    key: 'controlTouchDragging',
    get: ({ get }) => {
        const room = get(controlAtom);
        return room.touchDragging;
    },
});