import {
    createContext, Dispatch,
    ReactNode, SetStateAction, useRef, useState,
} from 'react';
import { Move } from '@/shared/types/global';
import { drawMove } from '@/shared/utils/drawMove';
import { CANVAS_SIZE } from '@/shared/constants/canvasSize';
import { useCacheCtx } from '@/modules/room/modules/board/hooks/useCacheCtx';


export const drawContext = createContext<{
    addToDrawCache: (move: Move) => void
    removeFromDrawCache: (id: string) => void
    isDrawing: boolean
    setIsDrawing: Dispatch<SetStateAction<boolean>>
    movesToDrawLater: Map<string, Move[]>,
    clearMovesToDrawLater: () => void,
    addToMovesToDrawLater: (userID: string, moves: Move[]) => void
}>(null!);

const DrawContextProvider = ({ children }: { children: ReactNode }) => {
    const drawCache = useRef<Move[]>([]);
    const ctx = useCacheCtx();
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [movesToDrawLater, setMovesToDrawLater] = useState<Map<string, Move[]>>(new Map());

    const addToDrawCache = (move: Move) => {
        if (!ctx) return;
        drawCache.current.push(move);
        drawMove(ctx, move);
    };

    const removeFromDrawCache = (id: string) => {
        drawCache.current = drawCache.current.filter(move => move.id !== id);
        ctx?.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
        drawCacheAll();
    };

    const drawCacheAll = () => {
        if (!ctx || drawCache.current.length === 0) return;
        drawCache.current.forEach((move) => {
            drawMove(ctx, move);
        });
    };

    const addToMovesToDrawLater = (userId: string, moves: Move[]) => {
        if (movesToDrawLater.has(userId)) {
            setMovesToDrawLater(prevMovesToDrawLater => {
                const updatedMoves = prevMovesToDrawLater.get(userId)?.concat(moves) || moves;
                return new Map(prevMovesToDrawLater).set(userId, updatedMoves);
            });
        } else {
            setMovesToDrawLater(prevMovesToDrawLater => new Map(prevMovesToDrawLater).set(userId, moves));
        }
    };
    const clearMovesToDrawLater = () => {
        setMovesToDrawLater(new Map());
    };

    return (
        <drawContext.Provider
            value={{
                addToDrawCache,
                removeFromDrawCache,
                isDrawing,
                setIsDrawing,
                addToMovesToDrawLater,
                clearMovesToDrawLater,
                movesToDrawLater,
            }}
        >
            {children}
        </drawContext.Provider>
    );
};

export default DrawContextProvider;
