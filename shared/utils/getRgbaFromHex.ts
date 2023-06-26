import { RgbaColor } from 'react-colorful';

type HexColor = string;

export const getRgbaFromHexString = (hex: HexColor, alpha: number): string => {
    const rgb = hex.match(/[A-Za-z0-9]{2}/g)?.map((x) => parseInt(x, 16));

    if (!rgb || rgb.length !== 3) {
        return `rgba(0, 0, 0, ${alpha})`;
    }

    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
};

export const getRgbaFromHex = (hex: HexColor, alpha: number): RgbaColor => {
    const rgb = hex.match(/[A-Za-z0-9]{2}/g)?.map((x) => parseInt(x, 16));

    if (!rgb || rgb.length !== 3) {
        return { r: 0, g: 0, b: 0, a: alpha };
    }

    return { r: rgb[0], g: rgb[1], b: rgb[2], a: alpha };
};

export const getHexFromRgba = (rgba: RgbaColor): HexColor => {
    const { r, g, b } = rgba;
    const alpha = Math.round(rgba.a * 255).toString(16).padStart(2, '0');

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${alpha}`;
};