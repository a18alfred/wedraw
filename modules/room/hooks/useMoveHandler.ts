import { useEffect, useMemo } from 'react';

import { socket } from '@/shared/utils/socket';
import { useBackground } from '@/shared/state/background';
import { useSetSelection } from '@/shared/state/options';
import { useMyMoves, useRoom, useSetUsers } from '@/shared/state/room';
import { useSetSavedMoves } from '@/shared/state/savedMoves';

import { useRefs } from './useRefs';
import { useSelection } from '../modules/board/hooks/useSelection';
import { useMainCtx } from '@/modules/room/modules/board/hooks/useMainCtx';
import { drawMove } from '@/shared/utils/drawMove';
import useLocalDraw from '@/modules/room/hooks/useLocalDraw';
import HOTKEYS from '@/shared/constants/hotKeys';

let prevMovesLength = 0;

export const useMoveHandler = (clearOnYourMove: () => void) => {
    const { mainCanvasRef, minimapRef, bgRef } = useRefs();
    const room = useRoom();
    const { handleAddMyMove, handleRemoveMyMove } = useMyMoves();
    const { addSavedMove, removeSavedMove } = useSetSavedMoves();
    const ctx = useMainCtx();
    const bg = useBackground();
    const { clearSelection } = useSetSelection();
    const { removeFromDrawCache, clearMovesToDrawLater, movesToDrawLater } = useLocalDraw();
    const { handleAddMoveToUser } = useSetUsers();
    useSelection();

    const sortedMoves = useMemo(() => {
        const { usersMoves, myMoves } = room;

        const moves = [...myMoves];

        usersMoves.forEach((userMoves) => moves.push(...userMoves));

        moves.sort((a, b) => a.timestamp - b.timestamp);

        return moves;
    }, [room]);

    const copyCanvasToSmall = () => {
        if (mainCanvasRef.current && minimapRef.current && bgRef.current) {
            const smallCtx = minimapRef.current.getContext('2d');
            if (smallCtx && ctx) {
                smallCtx.clearRect(
                    0,
                    0,
                    smallCtx.canvas.width,
                    smallCtx.canvas.height,
                );
                smallCtx.drawImage(
                    bgRef.current,
                    0,
                    0,
                    smallCtx.canvas.width,
                    smallCtx.canvas.height,
                );
                smallCtx.drawImage(
                    mainCanvasRef.current,
                    0,
                    0,
                    smallCtx.canvas.width,
                    smallCtx.canvas.height,
                );
            }
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => copyCanvasToSmall(), [bg]);

    const drawAllMoves = async () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const images = await Promise.all(
            sortedMoves
                .filter((move) => move.options.shape === 'image')
                .map((move) => {
                    return new Promise<HTMLImageElement>((resolve) => {
                        const img = new Image();
                        img.src = move.img.base64;
                        img.id = move.id;
                        img.addEventListener('load', () => resolve(img));
                    });
                }),
        );

        sortedMoves.forEach((move) => {
            if (move.options.shape === 'image') {
                const img = images.find((image) => image.id === move.id);
                if (img) drawMove(ctx, move, img);
            } else drawMove(ctx, move);
        });

        copyCanvasToSmall();
    };

    useEffect(() => {
        socket.on('your_move', (moves) => {
            clearOnYourMove();

            for (const [userId, moves] of movesToDrawLater.entries()) {
                handleAddMoveToUser(userId, moves);
            }
            clearMovesToDrawLater();

            handleAddMyMove(moves);
            clearSelection();

            moves.forEach((move) => {
                removeFromDrawCache(move.id);
            });
        });

        return () => {
            socket.off('your_move');
        };
    }, [clearOnYourMove, clearSelection, handleAddMyMove, movesToDrawLater, clearMovesToDrawLater]);

    useEffect(() => {
        const checkMoves = () => {
            if (!ctx) return;
            if (prevMovesLength >= sortedMoves.length || !prevMovesLength) {
                drawAllMoves();
            } else {
                for (let i = prevMovesLength; i < sortedMoves.length; i++) {
                    const lastMove = sortedMoves[i];

                    if (lastMove.options.shape === 'image') {
                        const img = new Image();
                        img.src = lastMove.img.base64;
                        img.addEventListener('load', () => {
                            drawMove(ctx, lastMove, img);
                            copyCanvasToSmall();
                        });
                    } else {
                        drawMove(ctx, lastMove);
                        copyCanvasToSmall();
                    }
                }
            }
        };

        checkMoves();

        return () => {
            prevMovesLength = sortedMoves.length;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortedMoves, ctx]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleUndo = (n: number) => {
        if (n === 0) return;
        if (ctx) {
            const moves = handleRemoveMyMove(n);

            if (moves.length > 0) {
                addSavedMove(moves);
                socket.emit('undo', n);
            }
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleRedo = (n: number) => {
        if (n === 0) return;
        if (ctx) {
            const moves = removeSavedMove(n);
            if (moves.length > 0) {
                socket.emit('redraw', moves);
            }
        }
    };

    useEffect(() => {
        const handleUndoRedoKeyboard = (e: KeyboardEvent) => {
            if (e.repeat) return;
            if ((HOTKEYS.undo.includes(e.key) && e.ctrlKey) || (HOTKEYS.undo.includes(e.key) && e.metaKey)) {
                handleUndo(1);
            } else if ((HOTKEYS.redo.includes(e.key) && e.ctrlKey) || (HOTKEYS.redo.includes(e.key) && e.metaKey)) {
                handleRedo(1);
            }
        };

        document.addEventListener('keydown', handleUndoRedoKeyboard);

        return () => {
            document.removeEventListener('keydown', handleUndoRedoKeyboard);
        };
    }, [handleUndo, handleRedo]);

    return { handleUndo, handleRedo };
};
