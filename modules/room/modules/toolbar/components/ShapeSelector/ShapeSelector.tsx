import React, { useState } from 'react';
import { BiCircle, BiRectangle } from 'react-icons/bi';
import { Shape } from '@/shared/types/global';
import { motion } from 'framer-motion';
import { styles } from '@/shared/styles/custom';
import { useOptionsFillShape } from '@/shared/state/options';
import AnimatedSwitcher from '@/shared/components/AnimatedSwitcher';

interface ShapeSelectorProps {
    handleShapeChange: (shape: Shape) => void;
    selected: Shape;
}

const ShapeSelector = ({ handleShapeChange, selected }: ShapeSelectorProps) => {
    const { fillShape, toggleFill } = useOptionsFillShape();

    return (
        <>
            <div className={'flex gap-2 text-4xl items-center justify-evenly'}>
                <BiRectangle
                    className={`cursor-pointer ${selected === 'rect' ? 'text-violet-500' : 'text-white'}`}
                    onClick={() => handleShapeChange('rect')}
                />
                <BiCircle
                    className={`cursor-pointer ${selected === 'circle' ? 'text-violet-500' : 'text-white'}`}
                    onClick={() => handleShapeChange('circle')}
                />
            </div>
            <div className={'flex items-center gap-4 text-sm text-secondary'}>
                <p>Заливка</p>
                <AnimatedSwitcher
                    isOn={fillShape}
                    toggle={toggleFill}
                    theme='dark'
                />
            </div>
        </>
    );
};

export default ShapeSelector;
