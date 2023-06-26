import { Move } from '../types/global';

export const DEFAULT_MOVE: Move = {
    circle: {
        cX: 0,
        cY: 0,
        radiusX: 0,
        radiusY: 0,
    },
    rect: {
        width: 0,
        height: 0,
    },
    path: [],
    options: {
        shape: 'line',
        mode: 'draw',
        lineWidth: 1,
        lineColor: { r: 0, g: 0, b: 0, a: 1 },
        fillColor: { r: 255, g: 255, b: 255, a: 1 },
        fillShape: false,
        eraserOpacity: 1,
        pathSmoothness: 2,
        selection: null,
    },
    id: '',
    img: {
        base64: '',
    },
    timestamp: 0,
};
