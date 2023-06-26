import { useEffect, useRef } from 'react';

import { motion, useMotionValue } from 'framer-motion';

import { useMoveImage } from '../../../hooks/useMoveImage';
import { useBoardPosition } from '../hooks/useBoardPosition';
import { useRefs } from '@/modules/room/hooks/useRefs';
import ImageControlPanel from '@/modules/room/modules/board/components/ImageControlPanel';
import { useControlZoom } from '@/shared/state/control';
import { halfIfZoomed } from '@/shared/utils/math';

const MoveImage = () => {
        const { imageRef } = useRefs();
        const { x, y } = useBoardPosition();
        const { moveImage, setMoveImage } = useMoveImage();
        const { zoom, offsetX, offsetY } = useControlZoom();

        const imageX = useMotionValue(0);
        const imageY = useMotionValue(0);

        useEffect(() => {
            if (moveImage.newInit) {
                const { width, height, x: moveImageX, y: moveImageY } = moveImage;

                const difX = halfIfZoomed(width, zoom);
                const difY = halfIfZoomed(height, zoom);

                imageX.set(moveImageX * zoom + x.get() + offsetX - difX);
                imageY.set(moveImageY * zoom + y.get() + offsetY - difY);

                setMoveImage(prev => ({ ...prev, newInit: false }));
            }
            
        }, [imageX, imageY, moveImage, x, y, zoom, offsetX, offsetY]);

        if (!moveImage.base64) return null;

        return (
            <motion.div
                ref={imageRef}
                drag
                dragElastic={0}
                dragTransition={{ power: 0.03, timeConstant: 50 }}
                className={'absolute top-0 z-image cursor-grab move-image'}
                style={{ x: imageX, y: imageY }}
            >
                <motion.div style={{ scale: zoom, height: moveImage.height, width: moveImage.width }}>
                    <img
                        className='pointer-events-none border-2 border-selection border-dashed object-contain'
                        alt='image to place'
                        src={moveImage.base64}
                    />
                </motion.div>
                <ImageControlPanel imageX={imageX} imageY={imageY} />
            </motion.div>
        );
    }
;

export default MoveImage;
