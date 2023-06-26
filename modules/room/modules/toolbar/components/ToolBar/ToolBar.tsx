import { motion } from 'framer-motion';
import { useControlToolsState } from '@/shared/state/control';
import ToolBarContent from '@/modules/room/modules/toolbar/components/ToolBar/ToolBarContent';

const ToolBar = () => {
    const opened = useControlToolsState();

    return (
        <>
            <motion.div
                className={'absolute left-0 top-0 z-toolbar flex flex-col h-full w-[52px] sm:w-[56px] items-center gap-6 bg-tertiary p-4 text-white'}
                animate={{
                    x: opened ? 0 : -65,
                }}
                transition={{
                    duration: 0.2,
                }}
            >
                <ToolBarContent />
            </motion.div>
        </>
    );
};

export default ToolBar;
