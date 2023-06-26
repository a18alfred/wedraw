import NameForm from '@/shared/components/NameForm';
import { socket } from '@/shared/utils/socket';

const CreateRoom = () => {
    const onSubmit = (username: string) => {
        socket.emit('create_room', username);
    };

    return (
        < >
            <NameForm
                submitText='Создать комнату'
                onFormSubmit={onSubmit}
            />
        </>
    );
};

export default CreateRoom;
