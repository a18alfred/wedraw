import { useBackground, useSetBackground } from '@/shared/state/background';
import React from 'react';
import AnimatedSwitcher from '@/shared/components/AnimatedSwitcher';

const BackgroundModal = () => {
    const bg = useBackground();
    const setBackground = useSetBackground();

    const toggleLines = () => {
        setBackground(prev => ({ ...prev, lines: !prev.lines }));
    };

    const toggleBg = () => {
        setBackground(prev => ({
            ...prev,
            mode: prev.mode === 'dark' ? 'light' : 'dark',
        }));
    };

    return (
        <>
            <h2 className='text-lg font-bold text-primary w-full'>
                Настройки фона
            </h2>

            <div className='w-full flex justify-between gap-8 mt-2 items-center'>
                <p className={'text-base text-secondary'}>Темный фон</p>
                <AnimatedSwitcher
                    isOn={bg.mode === 'dark'}
                    toggle={toggleBg}
                    theme='light'
                />
            </div>
            <div className='w-full flex justify-between gap-8 mt-2 items-center'>
                <p className={'text-base text-secondary'}>Линии</p>
                <AnimatedSwitcher
                    isOn={bg.lines}
                    toggle={toggleLines}
                    theme='light'
                />
            </div>
        </>
    );
};

export default BackgroundModal;
