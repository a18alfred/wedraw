import { atom } from 'recoil';

import { ClientRoom } from '@/shared/types/global';

export const DEFAULT_ROOM = {
    id: '',
    username: '',
    users: new Map(),
    usersMoves: new Map(),
    myMoves: [],
};

export const roomAtom = atom<ClientRoom>({
    key: 'room',
    default: DEFAULT_ROOM,
});
