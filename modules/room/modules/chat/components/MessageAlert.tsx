import React from 'react';
import { motion } from 'framer-motion';
import { useControl } from '@/shared/state/control';

interface MessageAlertProps {
    newMsg: boolean;
}

const MessageAlert = React.memo(({ newMsg }: MessageAlertProps) => {
    const { toggleChat } = useControl();

    if (!newMsg) return null;

    return (
        <motion.div
            className='absolute bottom-3 left-0 right-0 z-chat-alert flex items-center justify-center max-w-max mx-auto cursor-pointer'
            onClick={toggleChat}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
            }}
        >
            <p className={'h-2 w-2 rounded-full bg-violet-500 mr-1'}></p>
            <span className={'text-sm text-violet-500'}>Новое сообщение</span>
        </motion.div>
    );
});

MessageAlert.displayName = 'MessageAlert';
export default MessageAlert;
