import React, { useEffect, useRef } from 'react';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import { MdDoneOutline } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { getPos } from '@/shared/utils/getPos';
import { Move } from '@/shared/types/global';
import { DEFAULT_MOVE } from '@/shared/constants/defaultMove';
import { socket } from '@/shared/utils/socket';
import { useSetSavedMoves } from '@/shared/state/savedMoves';
import { useBoardPosition } from '@/modules/room/modules/board/hooks/useBoardPosition';
import { useMoveImage } from '@/modules/room/hooks/useMoveImage';
import { MotionValue } from 'framer-motion';
import { useControlZoom } from '@/shared/state/control';
import { halfIfZoomed } from '@/shared/utils/math';
import useLocalDraw from '@/modules/room/hooks/useLocalDraw';
import { v4 } from 'uuid';

interface ImageControlPanelProps {
    imageX: MotionValue<number>,
    imageY: MotionValue<number>
}

const ImageControlPanel = ({ imageX, imageY }: ImageControlPanelProps) => {
    const { moveImage, setMoveImage } = useMoveImage();
    const imageControlRef = useRef<HTMLDivElement>(null);
    const { x, y } = useBoardPosition();
    const { clearSavedMoves } = useSetSavedMoves();
    const { zoom, offsetX, offsetY } = useControlZoom();
    const handlePlaceImage = () => {
        const { width, height } = moveImage;

        const difX = halfIfZoomed(width, zoom);
        const difY = halfIfZoomed(height, zoom);

        const [finalX, finalY] = [
            getPos(imageX.get() + difX, x, offsetX, zoom),
            getPos(imageY.get() + difY, y, offsetY, zoom),
        ];

        const move: Move = {
            ...DEFAULT_MOVE,
            img: { base64: moveImage.base64 },
            id: v4(),
            path: [[finalX, finalY]],
            options: {
                ...DEFAULT_MOVE.options,
                selection: null,
                shape: 'image',
            },
        };

        socket.emit('draw', move);
        clearSavedMoves();
        setMoveImage({ base64: '', width: 0, height: 0, x: 0, y: 0, newInit: false });
        imageX.set(80);
        imageY.set(80);
    };

    useEffect(() => {
        const updateButtonPos = () => {
            if (imageControlRef.current) {
                const offsetW = (moveImage.width - moveImage.width / zoom) / 2 * zoom;
                const offsetH = (moveImage.height - moveImage.height / zoom) / 2 * zoom;
                if (imageX.get() < 90 + offsetW) {
                    imageControlRef.current.style.left = `unset`;
                    imageControlRef.current.style.right = `${-offsetW - 40}px`;
                } else {
                    imageControlRef.current.style.left = `${-offsetW - 40}px`;
                    imageControlRef.current.style.right = `unset`;
                }
                imageControlRef.current.style.top = `${-offsetH}px`;
            }
        };

        if (moveImage.base64) {
            updateButtonPos();
            const unsubscribeImageX = imageX.onChange(updateButtonPos);
            return () => {
                unsubscribeImageX();
            };
        }
    }, [moveImage, imageX, zoom]);

    return (
        <div
            ref={imageControlRef}
            className={`absolute flex gap-2 flex flex-col`}
        >
            <BtnWithTooltip
                type='context'
                icon={<MdDoneOutline />}
                onClick={handlePlaceImage}
                tooltipText='Вставить'
                tooltipPlace='top'
                uniqueId='moveImageBtnPaste'
            />
            <BtnWithTooltip
                type='context'
                icon={<AiOutlineDelete />}
                onClick={() => setMoveImage({ base64: '', height: 0, width: 0, x: 0, y: 0, newInit: false })}
                tooltipText='Удалить'
                tooltipPlace='top'
                uniqueId='moveImageBtnDelete'
            />
        </div>
    );
};

export default ImageControlPanel;
