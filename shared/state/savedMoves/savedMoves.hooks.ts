import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Move } from '@/shared/types/global';

import { savedMovesAtom } from './savedMoves.atom';

export const useSetSavedMoves = () => {
    const setSavedMoves = useSetRecoilState(savedMovesAtom);

    const addSavedMove = (moves: Move[]) => {
        setSavedMoves((prevMoves) => [...moves, ...prevMoves]);
    };

    const removeSavedMove = (n: number): Move[] => {
        let moves: Move[] = [];

        setSavedMoves((prevMoves) => {
            moves = prevMoves.slice(0, n);

            return prevMoves.slice(n);
        });

        return moves;
    };

    const clearSavedMoves = () => {
        setSavedMoves([]);
    };

    return { addSavedMove, removeSavedMove, clearSavedMoves };
};

export const useSavedMoves = () => {
    const savedMoves = useRecoilValue(savedMovesAtom);

    return savedMoves;
};
