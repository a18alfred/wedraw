import React, { useEffect, useRef, memo } from 'react';
import Message from '@/modules/room/modules/chat/components/Message';
import { socket } from '@/shared/utils/socket';
import useList from '@/shared/hooks/useList';
import { MessageType } from '@/shared/types/global';
import { useRoomUsers } from '@/shared/state/room';
import { isInstalled } from '@/shared/utils/isInstalled';

interface ChatContent {
    newMsgAlert: () => void;
}

const ChatContent = memo(({ newMsgAlert }: ChatContent) => {
    const msgList = useRef<HTMLDivElement>(null);
    const users = useRoomUsers();
    const { items: msgs, addItem: addMsg } = useList<MessageType>([]);
    const height = isInstalled() ? 'h-[276px]' : 'h-[296px]';

    useEffect(() => {
        if (msgList.current) {
            msgList.current.scrollTop = msgList.current.scrollHeight;
        }
    }, [msgs]);

    useEffect(() => {
        const handleNewMsg = (userId: string, msg: string) => {
            const user = users.get(userId);

            addMsg({
                userId,
                msg,
                id: msgs.length + 1,
                username: user?.name || 'Аноним',
                color: user?.color || '#000',
            });

            newMsgAlert();
        };

        socket.on('new_msg', handleNewMsg);

        return () => {
            socket.off('new_msg', handleNewMsg);
        };
    }, [addMsg, msgs, newMsgAlert, users]);

    return (
        <div className={`${height} overflow-y-scroll px-4 py-4 flex flex-col gap-4`} ref={msgList}>
            {msgs.map((msg) => (
                <Message key={msg.id} {...msg} />
            ))}
        </div>
    );
});

ChatContent.displayName = 'ChatContent';

export default ChatContent;
