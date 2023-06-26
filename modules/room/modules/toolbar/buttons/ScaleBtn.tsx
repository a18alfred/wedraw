import React, { useRef, useState } from 'react';
import useClickAway from '@/shared/hooks/useClickAway';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { AnimatePresence, motion } from 'framer-motion';
import { EntryAnimation } from '@/modules/room/modules/toolbar/animations/Entry.animations';
import ScaleMenu from '@/modules/room/modules/toolbar/components/ScaleMenu/ScaleMenu';
import { useOptionsMode, useSetOptions } from '@/shared/state/options';
import { isMobile } from 'react-device-detect';
import useLocalDraw from '@/modules/room/hooks/useLocalDraw';
import HOTKEYS from '@/shared/constants/hotKeys';

const ScaleBtn = () => {
    const { isDrawing } = useLocalDraw();
    const [opened, setOpened] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useClickAway(ref, () => setOpened(false));
    const mode = useOptionsMode();
    const setOptions = useSetOptions();

    const handleBtnClick = () => {
        if (isDrawing) return;
        if (mode !== 'zoomIn' && mode !== 'zoomOut') {
            setOptions((prev) => ({
                ...prev,
                mode: 'zoomIn',
            }));
        }
        if (opened) setOpened(false);
    };

    if (isMobile) return null;

    return (
        <div className='relative flex items-center' ref={ref}>
            <BtnWithTooltip
                type='tool'
                icon={<HiOutlineMagnifyingGlass />}
                tooltipText='Масштаб (Z)'
                tooltipPlace='right'
                isPushed={mode === 'zoomIn' || mode === 'zoomOut'}
                disabledTip={opened}
                uniqueId='toolBtnZoom'
                onClick={handleBtnClick}
                onDoubleClick={() => setOpened(true)}
                hotKeys={HOTKEYS.scale}
            />
            <AnimatePresence>
                {opened && (
                    <motion.div
                        className={'absolute top-0 left-14 z-selection-shape flex flex-col gap-4 bg-tertiary shadow-card py-2 px-4'}
                        variants={EntryAnimation}
                        initial='from'
                        animate='to'
                        exit='from'
                    >
                        <ScaleMenu />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ScaleBtn;
