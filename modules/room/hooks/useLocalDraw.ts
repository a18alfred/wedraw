import { useContext } from 'react';
import { drawContext } from '@/modules/room/context/draw/Draw.context';

const useLocalDraw = () => {
    const {
        addToDrawCache,
        removeFromDrawCache,
        isDrawing,
        setIsDrawing,
        movesToDrawLater,
        addToMovesToDrawLater,
        clearMovesToDrawLater,
    } =
        useContext(drawContext);

    return {
        addToDrawCache,
        removeFromDrawCache,
        isDrawing,
        setIsDrawing,
        movesToDrawLater,
        addToMovesToDrawLater,
        clearMovesToDrawLater,
    };
};

export default useLocalDraw;