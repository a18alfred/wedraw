import React, { useEffect, useRef } from 'react';
import { useOptionsEraserOpacity } from '@/shared/state/options';

const EraserMenu = () => {
    const { eraserOpacity, setEraserOpacity } = useOptionsEraserOpacity();
    const sliderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const initSlider = () => {
            if (sliderRef.current)
                sliderRef.current.value = String(eraserOpacity * 100);
        };

        initSlider();
    }, []);
    const handleMouseUp = () => {
        if (!sliderRef.current) return;

        const value = sliderRef.current.value;
        setEraserOpacity(parseInt(value, 10) / 100);
    };

    return (
        <>
            <p className={'text-sm text-center text-secondary whitespace-nowrap'}>Прозрачность</p>
            <input
                ref={sliderRef}
                type='range'
                min={0}
                max={100}
                onMouseUp={handleMouseUp}
                onTouchEnd={handleMouseUp}
                className='h-[15px] w-[125px] cursor-pointer appearance-none rounded-full bg-white bg-opacity-30 mb-2'
            />
        </>
    );
};

export default EraserMenu;
