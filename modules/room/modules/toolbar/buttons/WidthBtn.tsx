import React, { useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { RxBorderWidth } from 'react-icons/rx';

import { EntryAnimation } from '../animations/Entry.animations';
import useClickAway from '@/shared/hooks/useClickAway';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import WidthMenu from '@/modules/room/modules/toolbar/components/WidthMenu/WidthMenu';

const WidthBtn = () => {
    const [opened, setOpened] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useClickAway(ref, () => setOpened(false));

    const toggleWidthMenu = () => {
        setOpened(prev => !prev);
    };

    return (
        <div className='relative flex items-center' ref={ref}>
            <BtnWithTooltip
                type='tool'
                icon={<RxBorderWidth />}
                tooltipText='Толщина линии'
                tooltipPlace='right'
                isPushed={opened}
                disabledTip={opened}
                uniqueId='toolBtnWidth'
                onClick={toggleWidthMenu}
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
                        <WidthMenu />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WidthBtn;
