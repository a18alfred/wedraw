import { selector } from 'recoil';
import { roomAtom } from './room.atom';

export const roomIdSelector = selector({
    key: 'roomId',
    get: ({ get }) => {
        const room = get(roomAtom);
        return room.id;
    },
});

export const roomUsernameSelector = selector({
    key: 'roomUsername',
    get: ({ get }) => {
        const room = get(roomAtom);
        return room.username;
    },
});


export const roomMyMovesSelector = selector({
    key: 'roomMyMoves',
    get: ({ get }) => {
        const room = get(roomAtom);
        return room.myMoves;
    },
});

export const roomUsersSelector = selector({
    key: 'roomUsers',
    get: ({ get }) => {
        const room = get(roomAtom);
        return room.users;
    },
});