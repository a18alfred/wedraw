import React, { useEffect, useState } from 'react';
import { RgbaColor, RgbaColorPicker } from 'react-colorful';
import { COLORS_PRESETS } from '@/shared/constants/colors';
import { getRgbaFromHex } from '@/shared/utils/getRgbaFromHex';

interface ColorPickerProps {
    onChange: (color: RgbaColor) => void;
    initialColor: RgbaColor;
}

const ColorPicker = ({ onChange, initialColor }: ColorPickerProps) => {
    const [color, setColor] = useState<RgbaColor>(initialColor);

    const handleChangeColor = () => {
        onChange(color);
    };

    const handleColorClick = (e: React.MouseEvent<HTMLDivElement>, hash: string) => {
        const newColor = getRgbaFromHex(hash, 1);
        setColor(newColor);
        onChange(newColor);
    };

    useEffect(() => {
        setColor(initialColor);
    }, [initialColor, setColor]);


    return (
        <>
            <div className={'picker-react-colorful'}>
                <RgbaColorPicker
                    color={color}
                    onChange={(e) => {
                        setColor(e);
                    }}
                    onMouseUp={handleChangeColor}
                    onTouchEnd={handleChangeColor}
                />
            </div>
            <div className={'flex flex-wrap gap-2 justify-center'}>
                {
                    COLORS_PRESETS.map((color) => (
                        <div
                            onClick={e => handleColorClick(e, color.hash)}
                            key={color.name}
                            style={{
                                width: '21px',
                                height: '21px',
                                background: color.hash,
                                cursor: 'pointer',
                            }}>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default ColorPicker;
