import { useRefs } from '@/modules/room/hooks/useRefs';
import { CANVAS_SIZE } from '@/shared/constants/canvasSize';
import { useRoomId } from '@/shared/state/room/room.hooks';
import { useOptionsSelection } from '@/shared/state/options';

const useDownload = () => {
    const roomId = useRoomId();
    const { mainCanvasRef, bgRef } = useRefs();
    const selection = useOptionsSelection();

    const downloadRoom = () => {
        const canvas = document.createElement('canvas');
        canvas.width = CANVAS_SIZE.width;
        canvas.height = CANVAS_SIZE.height;

        const tempCtx = canvas.getContext('2d');

        if (tempCtx && mainCanvasRef.current && bgRef.current) {
            tempCtx.drawImage(bgRef.current, 0, 0);
            tempCtx.drawImage(mainCanvasRef.current, 0, 0);
        }

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${roomId}.png`;
        link.click();
    };

    const downloadSelection = () => {
        if (!selection) return;

        const canvas = document.createElement('canvas');
        canvas.width = selection.width;
        canvas.height = selection.height;

        const tempCtx = canvas.getContext('2d');

        if (tempCtx && mainCanvasRef.current && bgRef.current) {
            tempCtx.drawImage(bgRef.current, selection.x, selection.y, selection.width, selection.height, 0, 0, selection.width, selection.height);
            tempCtx.drawImage(mainCanvasRef.current, selection.x, selection.y, selection.width, selection.height, 0, 0, selection.width, selection.height);
        }

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${roomId}.png`;
        link.click();
    };

    return {
        downloadRoom,
        downloadSelection,
    };
};

export default useDownload;
