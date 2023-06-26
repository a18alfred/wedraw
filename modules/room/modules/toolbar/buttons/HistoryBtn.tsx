import { AnimatePresence, motion } from 'framer-motion';
import { FaHistory } from 'react-icons/fa';
import React, { useRef, useState } from 'react';
import HistoryList from '@/modules/room/modules/toolbar/components/History/HistoryList';
import { EntryAnimation } from '@/modules/room/modules/toolbar/animations/Entry.animations';
import useClickAway from '@/shared/hooks/useClickAway';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import HOTKEYS from '@/shared/constants/hotKeys';

const HistoryBtn = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [opened, setOpened] = useState(false);
    useClickAway(containerRef, () => setOpened(false));
    const toggleHistory = () => {
        setOpened(prev => !prev);
    };

    return (
        <>
            <div className='relative flex items-center' ref={containerRef}>
                <BtnWithTooltip
                    type='tool'
                    icon={<FaHistory />}
                    onClick={toggleHistory}
                    tooltipText='История (H)'
                    tooltipPlace='right'
                    isPushed={opened}
                    disabledTip={opened}
                    uniqueId='toolBtnHistory'
                    hotKeys={HOTKEYS.history}
                />
                <AnimatePresence>
                    {opened &&
                        <motion.div
                            className='absolute top-0 left-14 z-selection-shape flex bg-white shadow-card'
                            variants={EntryAnimation}
                            initial='from'
                            animate='to'
                            exit='from'
                        >
                            <HistoryList setOpened={setOpened} />
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </>
    );
};

export default HistoryBtn;
