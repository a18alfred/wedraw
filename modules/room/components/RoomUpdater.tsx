import { useEffect, useRef, useState } from 'react';
import { useRoomId, useRoomUsername, useRoomUsers, useSetRoom, useSetUsers } from '@/shared/state/room/room.hooks';
import { socket } from '@/shared/utils/socket';
import { Move, User } from '@/shared/types/global';
import { COLORS_ARRAY } from '@/shared/constants/colors';
import useStoredId from '@/shared/hooks/useStoredId';
import useRoomConnect from '@/modules/home/hooks/useRoomConnect';

const RoomUpdater = () => {
    const setRoom = useSetRoom();
    const users = useRoomUsers();
    const roomId = useRoomId();
    const username = useRoomUsername();
    const { connectToRoom } = useRoomConnect();
    const reconnected = useRef<boolean>(false);
    const [reconnecting, setReconnecting] = useState<boolean>(false);


    const { handleAddUser, handleRemoveUser } = useSetUsers();
    const { saveCurrentId } = useStoredId();

    useEffect(() => {
        if (reconnecting) {
            const reconnectionTimer = setTimeout(() => {
                setReconnecting(false);
                reconnected.current = false;
            }, 2000);

            return () => {
                clearTimeout(reconnectionTimer);
            };
        }
    }, [reconnecting, setReconnecting]);

    useEffect(() => {
        socket.on('connect', () => {
            if (!reconnected.current) {
                connectToRoom(roomId, username);
                reconnected.current = true;
                setReconnecting(true);
            }
        });

        socket.on('room', (usersMovesToParse, usersToParse) => {
            const usersMoves = new Map<string, Move[]>(
                JSON.parse(usersMovesToParse),
            );
            const usersParsed = new Map<string, string>(
                JSON.parse(usersToParse),
            );

            const newUsers = new Map<string, User>();

            usersParsed.forEach((name, id) => {
                if (id === socket.id) return;

                const index = [...usersParsed.keys()].indexOf(id);

                const color = COLORS_ARRAY[index % COLORS_ARRAY.length];

                newUsers.set(id, {
                    name,
                    color,
                    displayMouse: true,
                });
            });

            const myMoves: Move[] = usersMoves.get(socket.id) || [];
            usersMoves.delete(socket.id);

            setRoom((prev) => ({
                ...prev,
                users: newUsers,
                usersMoves,
                myMoves: myMoves,
            }));

            saveCurrentId(roomId, socket.id);
        });

        socket.on('new_user', (userId, username) => {
            handleAddUser(userId, username);
        });

        socket.on('user_disconnected', (userId) => {
            handleRemoveUser(userId);
        });

        socket.on('joined', () => {
            socket.emit('joined_room');
        });

        return () => {
            socket.off('connect');
            socket.off('room');
            socket.off('new_user');
            socket.off('user_disconnected');
            socket.off('joined');
        };
    }, [handleAddUser, handleRemoveUser, setRoom, users]);


    return null;
};

export default RoomUpdater;
