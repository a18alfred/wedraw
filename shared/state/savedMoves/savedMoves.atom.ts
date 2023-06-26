import { atom } from 'recoil';

import { Move } from '@/shared/types/global';

export const savedMovesAtom = atom<Move[]>({
    key: 'saved_moves',
    default: [],
});
