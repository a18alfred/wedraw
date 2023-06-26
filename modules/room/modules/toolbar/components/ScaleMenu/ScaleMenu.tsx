import React, { useRef } from 'react';
import { useControlZoom } from '@/shared/state/control';
import { ZOOM_SETTINGS } from '@/shared/constants/canvasSize';

const ScaleMenu = () => {
    const { zoom, setZoom } = useControlZoom();
    const sliderRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <p className={'text-sm text-center text-secondary whitespace-nowrap'}>Масштаб</p>
            <input
                ref={sliderRef}
                type='range'
                min={ZOOM_SETTINGS.min * 100}
                max={ZOOM_SETTINGS.max * 100}
                value={zoom * 100}
                onChange={e => setZoom(parseInt(e.target.value, 10) / 100)}
                className='h-[15px] w-[125px] cursor-pointer appearance-none rounded-full bg-white bg-opacity-30 mb-2'
            />
        </>
    );
};

export default ScaleMenu;
