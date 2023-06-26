import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { optionsAtom } from './options.atom';
import {
    optionsEraserOpacitySelector, optionsFillColorSelector,
    optionsFillShapeSelector, optionsLineColorSelector,
    optionsLineWidthSelector,
    optionsModeSelector, optionsPathSmoothnessSelector, optionsSelectionSelector,
    optionsShapeSelector,
} from '@/shared/state/options/options.selectors';
import { RgbaColor } from 'react-colorful';

export const useOptionsValue = () => {
    return useRecoilValue(optionsAtom);
};

export const useOptionsSelection = () => {
    return useRecoilValue(optionsSelectionSelector);
};

export const useOptionsMode = () => {
    return useRecoilValue(optionsModeSelector);
};

export const useOptionsShape = () => {
    return useRecoilValue(optionsShapeSelector);
};

export const useOptionsColor = () => {
    const lineColor = useRecoilValue(optionsLineColorSelector);
    const fillColor = useRecoilValue(optionsFillColorSelector);
    const setOptions = useSetRecoilState(optionsAtom);

    const setLineColor = (newColor: RgbaColor) => {
        setOptions(prev => ({ ...prev, lineColor: newColor }));
    };

    const setFillColor = (newColor: RgbaColor) => {
        setOptions(prev => ({ ...prev, fillColor: newColor }));
    };

    const setColors = (newLineColor: RgbaColor, newFillColor: RgbaColor) => {
        setOptions(prev => ({ ...prev, lineColor: newLineColor, fillColor: newFillColor }));
    };

    return {
        lineColor,
        fillColor,
        setLineColor,
        setFillColor,
        setColors,
    };
};


export const useOptionsLineWidth = () => {
    const lineWidth = useRecoilValue(optionsLineWidthSelector);
    const setOptions = useSetRecoilState(optionsAtom);

    const setLineWidth = (newWidth: number) => {
        setOptions(prev => ({ ...prev, lineWidth: newWidth }));
    };

    return {
        lineWidth,
        setLineWidth,
    };
};

export const useOptionsFillShape = () => {
    const setOptions = useSetRecoilState(optionsAtom);
    const fillShape = useRecoilValue(optionsFillShapeSelector);

    const toggleFill = () => {
        setOptions(prev => ({ ...prev, fillShape: !prev.fillShape }));
    };

    return {
        fillShape,
        toggleFill,
    };
};

export const useOptionsEraserOpacity = () => {
    const eraserOpacity = useRecoilValue(optionsEraserOpacitySelector);
    const setOptions = useSetRecoilState(optionsAtom);

    const setEraserOpacity = (newOpacity: number) => {
        setOptions(prev => ({ ...prev, eraserOpacity: newOpacity }));
    };
    return {
        eraserOpacity,
        setEraserOpacity,
    };
};

export const useOptionsPathSmoothness = () => {
    const pathSmoothness = useRecoilValue(optionsPathSmoothnessSelector);
    const setOptions = useSetRecoilState(optionsAtom);
    const setPathSmoothness = (newSmoothness: number) => {
        setOptions(prev => ({ ...prev, pathSmoothness: newSmoothness }));
    };

    return {
        pathSmoothness,
        setPathSmoothness,
    };
};


export const useSetOptions = () => {
    const setOptions = useSetRecoilState(optionsAtom);

    return setOptions;
};

export const useOptionsZoom = () => {
    const setOptions = useSetRecoilState(optionsAtom);
    const setZoomInMode = () => {
        setOptions(prev => ({ ...prev, mode: 'zoomIn' }));
    };

    const setZoomOutMode = () => {
        setOptions(prev => ({ ...prev, mode: 'zoomOut' }));
    };

    return {
        setZoomInMode,
        setZoomOutMode,
    };
};

export const useOptions = () => {
    const options = useRecoilState(optionsAtom);

    return options;
};

export const useSetSelection = () => {
    const setOptions = useSetOptions();

    const setSelection = (rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    }) => {
        setOptions((prev) => ({ ...prev, selection: rect }));
    };

    const clearSelection = () => {
        setOptions((prev) => ({ ...prev, selection: null }));
    };

    return { setSelection, clearSelection };
};
