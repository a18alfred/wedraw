import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { GiArrowCursor } from 'react-icons/gi';

import { socket } from '@/shared/utils/socket';

import { useBoardPosition } from '../hooks/useBoardPosition';
import { User } from '@/shared/types/global';
import { useControlZoom } from '@/shared/state/control';

interface UserMouseProps {
    userId: string;
    user: User;
}

const UserMouse = ({ userId, user }: UserMouseProps) => {
    const boardPos = useBoardPosition();

    const [msg, setMsg] = useState('');
    const [x, setX] = useState(boardPos.x.get());
    const [y, setY] = useState(boardPos.y.get());
    const [pos, setPos] = useState({ x: -1, y: -1 });
    const { zoom, offsetX, offsetY } = useControlZoom();

    useEffect(() => {
        const unsubscribeX = boardPos.x.onChange(setX);
        const unsubscribeY = boardPos.y.onChange(setY);

        socket.on('mouse_moved', (newX, newY, socketIdMoved) => {
            if (socketIdMoved === userId) {
                setPos({ x: newX * zoom + offsetX, y: newY * zoom + offsetY });
            }
        });

        const handleNewMsg = (msgUserId: string, newMsg: string) => {
            if (msgUserId === userId) {
                setMsg(newMsg);

                setTimeout(() => {
                    setMsg('');
                }, 3500);
            }
        };
        socket.on('new_msg', handleNewMsg);

        return () => {
            socket.off('mouse_moved');
            socket.off('new_msg', handleNewMsg);
            unsubscribeX();
            unsubscribeY();
        };
    }, [boardPos.x, boardPos.y, offsetX, offsetY, userId, zoom]);

    if (!user.displayMouse) return null;

    return (
        <motion.div
            className={`pointer-events-none absolute top-0 left-0 z-mouse-user text-blue-800 ${
                pos.x === -1 && 'hidden'
            }`}
            style={{ color: user.color }}
            animate={{ x: pos.x + x, y: pos.y + y }}
            transition={{ duration: 0.3, ease: 'linear' }}
        >
            <GiArrowCursor className={'text-lg'} />
            {msg && (
                <p className='absolute top-full left-5 max-w-[15rem] overflow-hidden text-ellipsis bg-grey  whitespace-nowrap py-1 px-2 text-black text-sm'>
                    {msg}
                </p>
            )}
            <p className='ml-2'>{user.name || 'Anonymous'}</p>
        </motion.div>
    );
};
export default UserMouse;
