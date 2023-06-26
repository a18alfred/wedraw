import { socket } from '@/shared/utils/socket';

import UserMouse from './UserMouse';
import { useRoomUsers } from '@/shared/state/room';

const ServerMouses = () => {
    const users = useRoomUsers();
    
    return (
        <>
            {[...users.keys()].map((userId) => {
                if (userId === socket.id) return null;
                const user = users.get(userId);
                if (!user) return null;
                return <UserMouse userId={userId} user={user} key={userId} />;
            })}
        </>
    );
};

export default ServerMouses;
