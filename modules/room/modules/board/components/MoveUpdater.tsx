import { useMoveHandler } from '@/modules/room/hooks/useMoveHandler';
import { useEffect } from 'react';
import { useRefs } from '@/modules/room/hooks/useRefs';

interface MoveUpdaterProps {
    clearOnYourMove: () => void;
}

const MoveUpdater = ({ clearOnYourMove }: MoveUpdaterProps) => {
    const { handleUndo, handleRedo } = useMoveHandler(clearOnYourMove);
    const { setRedoRef, setUndoRef } = useRefs();

    useEffect(() => {
        setRedoRef(handleRedo);
        setUndoRef(handleUndo);
    }, [handleRedo, handleUndo, setRedoRef, setUndoRef]);

    return null;
};

export default MoveUpdater;
