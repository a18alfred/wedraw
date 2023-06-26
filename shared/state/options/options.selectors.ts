import { selector } from 'recoil';
import { optionsAtom } from './options.atom';

export const optionsModeSelector = selector({
    key: 'optionsModeSelector',
    get: ({ get }) => {
        const options = get(optionsAtom);
        return options.mode;
    },
});

export const optionsLineWidthSelector = selector({
    key: 'optionsLineWidthSelector',
    get: ({ get }) => {
        const options = get(optionsAtom);
        return options.lineWidth;
    },
});

export const optionsShapeSelector = selector({
    key: 'optionsShapeSelector',
    get: ({ get }) => {
        const options = get(optionsAtom);
        return options.shape;
    },
});

export const optionsSelectionSelector = selector({
    key: 'optionsSelectionSelector',
    get: ({ get }) => {
        const options = get(optionsAtom);
        return options.selection;
    },
});

export const optionsFillShapeSelector = selector({
    key: 'optionsFillShapeSelector',
    get: ({ get }) => {
        const options = get(optionsAtom);
        return options.fillShape;
    },
});

export const optionsEraserOpacitySelector = selector({
    key: 'optionsEraserOpacitySelector',
    get: ({ get }) => {
        const options = get(optionsAtom);
        return options.eraserOpacity;
    },
});

export const optionsPathSmoothnessSelector = selector({
    key: 'optionsPathSmoothnessSelector',
    get: ({ get }) => {
        const options = get(optionsAtom);
        return options.pathSmoothness;
    },
});

export const optionsLineColorSelector = selector({
    key: 'optionsLineColorSelector',
    get: ({ get }) => {
        const options = get(optionsAtom);
        return options.lineColor;
    },
});

export const optionsFillColorSelector = selector({
    key: 'optionsFillColorSelector',
    get: ({ get }) => {
        const options = get(optionsAtom);
        return options.fillColor;
    },
});
