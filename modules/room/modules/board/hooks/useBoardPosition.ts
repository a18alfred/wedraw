import { useContext } from 'react';
import { roomPosContext } from '@/modules/room/context/position/RoomPos.context';

export const useBoardPosition = () => {
    const { x, y } = useContext(roomPosContext);

    return { x, y };
};
