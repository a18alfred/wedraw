import React, { useEffect, useRef } from 'react';
import { useOptionsPathSmoothness } from '@/shared/state/options';
import { useOptionsLineWidth } from '@/shared/state/options/options.hooks';

const WidthMenu = () => {
    const sliderWidthRef = useRef<HTMLInputElement>(null);
    const sliderSmoothRef = useRef<HTMLInputElement>(null);
    const inputWidthRef = useRef<HTMLInputElement>(null);
    const { pathSmoothness, setPathSmoothness } = useOptionsPathSmoothness();
    const { lineWidth, setLineWidth } = useOptionsLineWidth();

    useEffect(() => {
        const initSliders = () => {
            if (sliderSmoothRef.current)
                sliderSmoothRef.current.value = String(pathSmoothness * 10);
            if (sliderWidthRef.current)
                sliderWidthRef.current.value = String(lineWidth);
        };

        const initInput = () => {
            if (inputWidthRef.current)
                inputWidthRef.current.value = String(lineWidth);
        };

        initSliders();
        initInput();
    }, []);

    const handleWidthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        const value = e.target.value;
        let finalValue = 0;

        if (!re.test(value)) finalValue = lineWidth;
        else finalValue = parseInt(value, 10);
        if (value === '') finalValue = 0;
        if (isNaN(finalValue)) finalValue = 1;
        if (finalValue < 0) finalValue = 1;
        if (finalValue > 125) finalValue = 125;

        if (inputWidthRef.current &&
            sliderWidthRef.current &&
            finalValue !== 0
        ) {
            inputWidthRef.current.value = String(finalValue);
            sliderWidthRef.current.value = String(finalValue);
            if (finalValue !== lineWidth) setLineWidth(finalValue);
        }

    };

    const handleSmoothChange = () => {
        if (!sliderSmoothRef.current) return;
        const value = sliderSmoothRef.current.value;
        setPathSmoothness(parseInt(value, 10) / 10);
    };

    const handleWidthSliderChange = () => {
        if (!sliderWidthRef.current) return;
        const value = sliderWidthRef.current.value;
        setLineWidth(parseInt(value, 10));
    };

    const handleWidthSliderMove = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (inputWidthRef.current) {
            inputWidthRef.current.value = value;
        }
    };

    return (
        <>
            <div className={'flex items-center gap-4 mb-2'}>
                <p className={'text-sm text-secondary'}>Размер:</p>
                <input
                    ref={inputWidthRef}
                    type={'number'}
                    min={1}
                    max={125}
                    maxLength={3}
                    placeholder={'px'}
                    onChange={handleWidthInputChange}
                    className={'bg-white w-12 bg-opacity-30 text-base px-2 py-1 text-white placeholder:text-secondary outline-none'}
                />
            </div>
            <input
                ref={sliderWidthRef}
                type='range'
                min={1}
                max={125}
                onChange={handleWidthSliderMove}
                onMouseUp={handleWidthSliderChange}
                onTouchEnd={handleWidthSliderChange}
                className='h-[15px] w-full cursor-pointer appearance-none rounded-full bg-white bg-opacity-30 mb-2'
            />
            <p className={'text-sm text-secondary'}>Сглаживание:</p>
            <input
                ref={sliderSmoothRef}
                type='range'
                min={1}
                max={200}
                onMouseUp={handleSmoothChange}
                onTouchEnd={handleSmoothChange}
                className='h-[15px] w-full cursor-pointer appearance-none rounded-full bg-white bg-opacity-30 mb-2'
            />
        </>
    );
};

export default WidthMenu;
