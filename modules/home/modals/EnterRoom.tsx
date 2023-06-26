import RoomForm from '@/modules/home/components/RoomForm';
import useRoomConnect from '@/modules/home/hooks/useRoomConnect';

const EnterRoom = () => {
    const { connectToRoom } = useRoomConnect();
    const onSubmit = (roomId: string, username: string) => {
        connectToRoom(roomId, username);
    };

    return (
        < >
            <RoomForm
                onFormSubmit={onSubmit}
            />
        </>
    );
};

export default EnterRoom;
