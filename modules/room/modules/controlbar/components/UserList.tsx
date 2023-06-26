import { useRoomUsers } from '@/shared/state/room';
import Avatar from '@/modules/room/components/Avatar';


const UserList = () => {
    const users = useRoomUsers();
    
    return (
        <>
            {[...users.keys()].map((userId, index) => {
                const user = users.get(userId);
                if (!user) return null;
                return (
                    <Avatar key={index} user={user} userId={userId} />
                );
            })}
        </>
    );
};

export default UserList;
