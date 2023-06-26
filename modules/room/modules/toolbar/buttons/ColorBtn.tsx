import React, { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { BsArrowRepeat } from 'react-icons/bs';

import { EntryAnimation } from '../animations/Entry.animations';
import useClickAway from '@/shared/hooks/useClickAway';
import ColorPicker from '@/modules/room/modules/toolbar/components/ColorPicker/ColorPicker';
import { useOptionsColor } from '@/shared/state/options';
import { getHexFromRgba } from '@/shared/utils/getRgbaFromHex';
import { isMobile } from 'react-device-detect';
import { Tooltip } from 'react-tooltip';

const ColorBtn = () => {
    const [isBg, setIsBg] = useState(false);
    const [opened, setOpened] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useClickAway(ref, () => setOpened(false));

    const { lineColor, fillColor, setLineColor, setFillColor, setColors } = useOptionsColor();

    const toggleLineColorPicker = () => {
        setOpened(prev => !prev);
    };

    const onLineClick = () => {
        if (isBg) setIsBg(false);
    };

    const onBgClick = () => {
        if (!isBg) setIsBg(true);
    };

    const onExchangeColors = () => {
        setColors(fillColor, lineColor);
    };

    return (
        <div className='relative flex items-center' ref={ref}>
            <div
                id={'toolColorBtn'}
                onClick={toggleLineColorPicker}
                className={'relative h-[30px] w-[30px]'}
            >
                <div
                    className={'shadow-picker'}
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        height: '20px',
                        width: '20px',
                        border: '2px solid #fff',
                        background: getHexFromRgba(lineColor),
                        zIndex: '27',
                        cursor: 'pointer',
                    }}
                />
                <div
                    className={'shadow-picker'}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        height: '20px',
                        width: '20px',
                        border: '2px solid #fff',
                        background: getHexFromRgba(fillColor),
                        zIndex: '26',
                        cursor: 'pointer',
                    }}
                />
                {!isMobile && !opened && <Tooltip
                    style={{ opacity: 1, zIndex: '45' }}
                    anchorSelect={`#toolColorBtn`}
                    content={'Выбор цвета'}
                    place={'right'}
                />}
            </div>
            <AnimatePresence>
                {opened && (
                    <motion.div
                        className={'absolute top-0 left-14 z-selection-shape flex flex-col gap-4 bg-tertiary shadow-card py-4 px-6'}
                        variants={EntryAnimation}
                        initial='from'
                        animate='to'
                        exit='from'
                    >
                        <div className={'flex justify-between items-center w-full'}>
                            <p className={'flex gap-2'}>
                                <span
                                    onClick={onLineClick}
                                    className={`text-base text-center ${isBg ? 'text-secondary' : 'text-white'} cursor-pointer`}
                                >
                                    Линия
                                </span>
                                <span className={'text-base text-center text-secondary'}>/</span>
                                <span
                                    onClick={onBgClick}
                                    className={`text-base text-center ${isBg ? 'text-white' : 'text-secondary'} cursor-pointer`}
                                >
                                    Заливка
                                </span>
                            </p>
                            <BsArrowRepeat
                                onClick={onExchangeColors}
                                className={'text-xl text-secondary cursor-pointer'}
                            />
                        </div>
                        {
                            isBg
                                ? <ColorPicker
                                    initialColor={fillColor}
                                    onChange={setFillColor}
                                />
                                : <ColorPicker
                                    initialColor={lineColor}
                                    onChange={setLineColor}
                                />
                        }
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ColorBtn;
