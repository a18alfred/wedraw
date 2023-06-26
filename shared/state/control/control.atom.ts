import { atom } from 'recoil';
import { ClientControl } from '@/shared/types/global';

export const DEFAULT_CONTROL: ClientControl = {
    dragging: true,
    touchDragging: false,
    isMapOpen: true,
    isToolsOpen: true,
    isChatOpen: false,
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
};

export const controlAtom = atom<ClientControl>({
    key: 'control',
    default: DEFAULT_CONTROL,
});
