import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilState } from 'recoil';

import Portal from '@/modules/modal/components/portal/Portal';

import {
    bgAnimation,
    modalAnimation,
} from '../../animations/ModalManager.animations';
import { modalAtom } from '../../state/modal.atom';
import { ImCross } from 'react-icons/im';
import { useModal } from '@/modules/modal';

const ModalManager = () => {
    const { closeModal } = useModal();
    const [{ opened, modal }, setModal] = useRecoilState(modalAtom);

    const [portalNode, setPortalNode] = useState<HTMLElement>();

    useEffect(() => {
        if (!portalNode) {
            const node = document.getElementById('portal');
            if (node) setPortalNode(node);
            return;
        }

        if (opened) {
            portalNode.style.pointerEvents = 'all';
        } else {
            portalNode.style.pointerEvents = 'none';
        }
    }, [opened, portalNode]);

    return (
        <Portal>
            <motion.div
                className='absolute z-modal flex min-h-full w-full items-center justify-center bg-black/80'
                onClick={() => setModal({ modal: <></>, opened: false })}
                variants={bgAnimation}
                initial='closed'
                animate={opened ? 'opened' : 'closed'}
            >
                <AnimatePresence>
                    {opened && (
                        <motion.div
                            variants={modalAnimation}
                            initial='closed'
                            animate='opened'
                            exit='exited'
                            onClick={(e) => e.stopPropagation()}
                            className='p-6 sm:min-w-[480px] min-w-full'
                        >
                            <div
                                className='relative flex flex-col items-center rounded-md bg-white p-10 text-center text-primary gap-4'>
                                <button onClick={closeModal} className='absolute top-5 right-5 text-primary'>
                                    <ImCross />
                                </button>
                                {modal}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </Portal>
    );
};

export default ModalManager;
