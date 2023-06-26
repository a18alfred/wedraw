import { socket } from '@/shared/utils/socket';
import useStoredId from '@/shared/hooks/useStoredId';

const useRoomConnect = () => {
    const { getSavedIdByRoom } = useStoredId();
    const connectToRoom = (roomId: string, username: string) => {
        const prevKey = getSavedIdByRoom(roomId);
        socket.emit('join_room', roomId, username, prevKey);
    };

    return {
        connectToRoom,
    };
};

export default useRoomConnect;
