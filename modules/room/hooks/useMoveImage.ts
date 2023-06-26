import { useContext } from 'react';

import { roomImageContext } from '../context/image/RoomImageContext';

export const useMoveImage = () => {
    const { moveImage, setMoveImage } = useContext(roomImageContext);

    return { moveImage, setMoveImage };
};
