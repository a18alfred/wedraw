import React, { useRef, useState } from 'react';
import { BsEraserFill } from 'react-icons/bs';

import { motion, AnimatePresence } from 'framer-motion';
import { useOptionsMode, useOptionsShape, useSetOptions } from '@/shared/state/options';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import useClickAway from '@/shared/hooks/useClickAway';
import { EntryAnimation } from '@/modules/room/modules/toolbar/animations/Entry.animations';
import EraserMenu from '@/modules/room/modules/toolbar/components/EraserMenu/EraserMenu';
import useLocalDraw from '@/modules/room/hooks/useLocalDraw';
import HOTKEYS from '@/shared/constants/hotKeys';

const EraserBtn = () => {
    const { isDrawing } = useLocalDraw();
    const [opened, setOpened] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useClickAway(ref, () => setOpened(false));
    const mode = useOptionsMode();
    const shape = useOptionsShape();
    const setOptions = useSetOptions();

    const onEraserMode = () => {
        if (isDrawing) return;
        if (mode !== 'eraser' || shape !== 'line') {
            setOptions((prev) => ({
                ...prev,
                mode: 'eraser',
                shape: 'line',
            }));
        }
        if (opened) setOpened(false);
    };

    return (
        <div className='relative flex items-center' ref={ref}>
            <BtnWithTooltip
                type='tool'
                icon={<BsEraserFill />}
                tooltipText='Ластик (E)'
                tooltipPlace='right'
                disabledTip={opened}
                isPushed={mode === 'eraser' && shape === 'line'}
                uniqueId='toolBtnEraser'
                onClick={onEraserMode}
                onDoubleClick={() => setOpened(true)}
                hotKeys={HOTKEYS.eraser}
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
                        <EraserMenu />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EraserBtn;
