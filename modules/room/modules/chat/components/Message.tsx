import { memo } from 'react';
import { socket } from '@/shared/utils/socket';
import { MessageType } from '@/shared/types/global';
import { getRgbaFromHexString } from '@/shared/utils/getRgbaFromHex';

const Message = memo(({ userId, msg, username, color }: MessageType) => {
    const client = socket.id === userId;
    const bubbleColor = client ? '#EEEEEE' : getRgbaFromHexString(color, 0.05);

    return (
        <div className={`rounded flex flex-col ${client && 'justify-end'}`}>
            {!client &&
                < p className='text-xs font-bold mb-1 ' style={{ color: color }}>
                    {username}
                </p>
            }
            <p className={`text-black p-2 rounded-lg max-w-max select-text ${client && 'self-end'}`}
               style={{ wordBreak: 'break-all', background: bubbleColor }}
            >
                {msg}
            </p>
        </div>
    );
});

Message.displayName = 'Message';

export default Message;
