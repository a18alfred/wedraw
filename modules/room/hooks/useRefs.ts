import { useContext } from 'react';

import { roomRefContext } from '@/modules/room/context/reference/RoomRef.context';

export const useRefs = () => {
    const {
        undoRef,
        bgRef,
        clientCanvasRef,
        minimapRef,
        redoRef,
        selectionRefs,
        setUndoRef,
        setRedoRef,
        mainCanvasRef,
        cacheCanvasRef,
        imageRef,
    } =
        useContext(roomRefContext);

    return {
        undoRef,
        redoRef,
        bgRef,
        clientCanvasRef,
        minimapRef,
        selectionRefs,
        mainCanvasRef,
        cacheCanvasRef,
        setUndoRef,
        setRedoRef,
        imageRef,
    }
        ;
};
