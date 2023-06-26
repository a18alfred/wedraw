import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import ChatInput from './ChatInput';
import { useControlChatState } from '@/shared/state/control';
import TopBar from '@/modules/room/modules/chat/components/TopBar';
import ChatContent from '@/modules/room/modules/chat/components/ChatContent';
import MessageAlert from '@/modules/room/modules/chat/components/MessageAlert';
import { styles } from '@/shared/styles/custom';
import { isInstalled } from '@/shared/utils/isInstalled';

const Chat = () => {
    const opened = useControlChatState();
    const [newMsg, setNewMsg] = useState(false);
    const paddingBottom = isInstalled() ? 'pb-6' : 'pb-1';

    const newMsgAlert = () => {
        if (!opened) setNewMsg(true);
    };

    useEffect(() => {
        if (opened && newMsg) setNewMsg(false);
    }, [opened, newMsg]);

    return (
        <>
            <MessageAlert newMsg={newMsg} />
            <motion.div
                className={styles.chatContainer}
                animate={{ y: opened ? -400 : 0 }}
                transition={{ duration: 0.2 }}
            >
                <TopBar />
                <div
                    className={`flex flex-1 flex-col justify-between bg-white border-b border-breaker ${paddingBottom}`}>
                    <ChatContent newMsgAlert={newMsgAlert} />
                    <ChatInput />
                </div>
            </motion.div>
        </>
    );
};

export default Chat;
