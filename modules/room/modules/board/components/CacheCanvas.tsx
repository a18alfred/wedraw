import { motion } from 'framer-motion';

import { CANVAS_SIZE } from '@/shared/constants/canvasSize';
import { useRefs } from '@/modules/room/hooks/useRefs';
import { useBoardPosition } from '@/modules/room/modules/board/hooks/useBoardPosition';
import { useControlZoom } from '@/shared/state/control';

const CacheCanvas = () => {
    const { cacheCanvasRef } = useRefs();
    const { x, y } = useBoardPosition();
    const { zoom } = useControlZoom();
    return (
        <>
            <motion.canvas
                ref={cacheCanvasRef}
                width={CANVAS_SIZE.width}
                height={CANVAS_SIZE.height}
                className={'absolute left-0 top-0 z-canvas-cache pointer-events-none'}
                style={{ x, y, scale: zoom }}
            />
        </>
    );
};

export default CacheCanvas;
