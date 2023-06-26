import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getNextColor } from '@/shared/utils/getNextColor';
import { Move } from '@/shared/types/global';

import { DEFAULT_ROOM, roomAtom } from './room.atom';
import {
    roomIdSelector,
    roomMyMovesSelector,
    roomUsernameSelector,
    roomUsersSelector,
} from '@/shared/state/room/room.selectors';

export const useRoom = () => {
    return useRecoilValue(roomAtom);
};

export const useRoomId = () => {
    return useRecoilValue(roomIdSelector);
};

export const useRoomUsername = () => {
    return useRecoilValue(roomUsernameSelector);
};

export const useRoomUsers = () => {
    return useRecoilValue(roomUsersSelector);
};

export const useSetRoom = () => {
    const setRoom = useSetRecoilState(roomAtom);

    return setRoom;
};

export const useUserMouseToggle = () => {
    const setRoom = useSetRecoilState(roomAtom);

    return (userId: string) => {
        setRoom(prev => {
            const users = prev.users;
            const user = users.get(userId);

            if (user) {
                user.displayMouse = !user.displayMouse;
                users.set(userId, user);
            }

            return {
                ...prev, users: new Map([...users]),
            };
        });
    };
};

export const useSetRoomJoin = () => {
    const setRoom = useSetRecoilState(roomAtom);

    const joinRoom = (id: string, username: string) => {
        setRoom({ ...DEFAULT_ROOM, id, username });
    };

    const resetRoom = () => {
        setRoom(DEFAULT_ROOM);
    };
    return {
        joinRoom,
        resetRoom,
    };
};

export const useSetUsers = () => {
    const setRoom = useSetRecoilState(roomAtom);

    const handleAddUser = (userId: string, name: string) => {
        setRoom((prev) => {
            const newUsers = prev.users;
            const newUsersMoves = prev.usersMoves;

            const color = getNextColor([...newUsers.values()].pop()?.color);

            newUsers.set(userId, {
                name,
                color,
                displayMouse: true,
            });
            newUsersMoves.set(userId, []);

            return { ...prev, users: (new Map([...newUsers])), usersMoves: new Map([...newUsersMoves]) };
        });
    };

    const handleRemoveUser = (userId: string) => {
        setRoom((prev) => {
            const newUsers = prev.users;
            newUsers.delete(userId);
            return {
                ...prev,
                users: new Map([...newUsers]),
            };
        });
    };

    const handleAddMoveToUser = (userId: string, moves: Move[]) => {
        setRoom((prev) => {
            const newUsersMoves = prev.usersMoves;
            const oldMoves = prev.usersMoves.get(userId);

            newUsersMoves.set(userId, [...(oldMoves || []), ...moves]);
            return { ...prev, usersMoves: newUsersMoves };
        });
    };

    const handleRemoveMoveFromUser = (userId: string, n: number) => {
        setRoom((prev) => {
            const newUsersMoves = prev.usersMoves;
            const oldMoves = prev.usersMoves.get(userId);
            oldMoves?.splice(-n, n);

            newUsersMoves.set(userId, oldMoves || []);
            return { ...prev, usersMoves: newUsersMoves };
        });
    };

    return {
        handleAddUser,
        handleRemoveUser,
        handleAddMoveToUser,
        handleRemoveMoveFromUser,
    };
};

export const useMyMoves = () => {
    const myMoves = useRecoilValue(roomMyMovesSelector);
    const setRoom = useSetRecoilState(roomAtom);
    const handleAddMyMove = (moves: Move[]) => {

        setRoom((prev) => {
            if (
                prev.myMoves[prev.myMoves.length - 1]?.options.mode === 'select'
            )
                return {
                    ...prev,
                    myMoves: [
                        ...prev.myMoves.slice(0, prev.myMoves.length - 1),
                        ...moves,
                    ],
                };

            return { ...prev, myMoves: [...prev.myMoves, ...moves] };
        });
    };

    const handleRemoveMyMove = (n: number) => {
        const moves: Move[] = myMoves.slice(-n);

        setRoom((prev) => ({ ...prev, myMoves: myMoves.slice(0, -n) }));

        return moves;
    };

    return { handleAddMyMove, handleRemoveMyMove, myMoves: myMoves };
};
