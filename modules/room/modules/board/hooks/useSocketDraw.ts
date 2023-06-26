import { useEffect } from 'react';

import { socket } from '@/shared/utils/socket';
import { useSetUsers } from '@/shared/state/room';
import useLocalDraw from '@/modules/room/hooks/useLocalDraw';
import { useOptionsMode } from '@/shared/state/options';

export const useSocketDraw = () => {
    const { isDrawing, addToMovesToDrawLater } = useLocalDraw();
    const { handleAddMoveToUser, handleRemoveMoveFromUser } = useSetUsers();
    const mode = useOptionsMode();

    useEffect(() => {
        socket.on('user_draw', (moves, userId) => {
            if (isDrawing && mode === 'eraser') {
                addToMovesToDrawLater(userId, moves);
            } else {
                handleAddMoveToUser(userId, moves);
            }
        });
        return () => {
            socket.off('user_draw');
        };
    }, [handleAddMoveToUser, isDrawing, addToMovesToDrawLater]);

    useEffect(() => {
        socket.on('user_undo', (userId, n) => {
            handleRemoveMoveFromUser(userId, n);
        });

        return () => {
            socket.off('user_undo');
        };
    }, [handleRemoveMoveFromUser]);
};
