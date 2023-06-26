import { atom } from 'recoil';

import { CtxOptions } from '@/shared/types/global';

export const optionsAtom = atom<CtxOptions>({
    key: 'options',
    default: {
        lineColor: { r: 0, g: 0, b: 0, a: 1 },
        fillColor: { r: 255, g: 255, b: 255, a: 1 },
        fillShape: false,
        eraserOpacity: 1,
        pathSmoothness: 2,
        lineWidth: 5,
        mode: 'draw',
        shape: 'line',
        selection: null,
    },
});
