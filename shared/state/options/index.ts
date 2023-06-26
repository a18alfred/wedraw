/* eslint-disable import/no-cycle */
import { optionsAtom } from './options.atom';
import {
    useOptions,
    useSetOptions,
    useOptionsValue,
    useSetSelection,
    useOptionsMode,
    useOptionsShape,
    useOptionsSelection,
    useOptionsEraserOpacity,
    useOptionsFillShape,
    useOptionsPathSmoothness, useOptionsColor,
} from './options.hooks';

export default optionsAtom;

export {
    useOptions,
    useOptionsValue,
    useSetOptions,
    useSetSelection,
    useOptionsMode,
    useOptionsShape,
    useOptionsSelection,
    useOptionsEraserOpacity,
    useOptionsFillShape,
    useOptionsPathSmoothness,
    useOptionsColor,
};
