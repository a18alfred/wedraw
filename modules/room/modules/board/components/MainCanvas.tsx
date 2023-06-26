import { motion } from 'framer-motion';

import { CANVAS_SIZE } from '@/shared/constants/canvasSize';
import { useRefs } from '@/modules/room/hooks/useRefs';
import { useBoardPosition } from '@/modules/room/modules/board/hooks/useBoardPosition';
import { useControlZoom } from '@/shared/state/control';
import { useEffect } from 'react';
import { socket } from '@/shared/utils/socket';
import { useMainCtx } from '@/modules/room/modules/board/hooks/useMainCtx';

const MainCanvas = () => {
    const { mainCanvasRef } = useRefs();
    const { x, y } = useBoardPosition();
    const { zoom } = useControlZoom();
    const ctx = useMainCtx();


    useEffect(() => {
        if (ctx) socket.emit('joined_room');
    }, [ctx]);

    return (
        <>
            <motion.canvas
                ref={mainCanvasRef}
                width={CANVAS_SIZE.width}
                height={CANVAS_SIZE.height}
                className={'absolute left-0 top-0 z-canvas-main pointer-events-none'}
                style={{ x, y, scale: zoom }}
            />
        </>
    );
};

export default MainCanvas;
