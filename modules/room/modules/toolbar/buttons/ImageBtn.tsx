import { useCallback, useEffect } from 'react';

import { RiImageAddLine } from 'react-icons/ri';

import { optimizeImage } from '@/shared/utils/optimizeImage';

import { useMoveImage } from '../../../hooks/useMoveImage';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import { getImageDimensions } from '@/shared/utils/getImageDimensions';
import { useBoardPosition } from '@/modules/room/modules/board/hooks/useBoardPosition';
import { useControlZoom } from '@/shared/state/control';

const ImageBtn = () => {
    const { setMoveImage } = useMoveImage();
    const { x, y } = useBoardPosition();
    const { zoom, offsetX, offsetY } = useControlZoom();

    const optimizeAndSave = useCallback((file: File) => {

        optimizeImage(file, (uri) =>
            getImageDimensions(uri).then((dimensions) => {
                const posX = 100 - (x.get() + offsetX) / zoom;
                const posY = 80 - (y.get() + offsetY) / zoom;

                setMoveImage({
                    base64: uri,
                    width: dimensions.width,
                    height: dimensions.height,
                    x: posX,
                    y: posY,
                    newInit: true,
                });
            }),
        );
    }, [setMoveImage, zoom, offsetX, offsetY]);

    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (items) {
                // eslint-disable-next-line no-restricted-syntax
                for (const item of items) {
                    if (item.type.includes('image')) {
                        const file = item.getAsFile();
                        if (file)
                            optimizeAndSave(file);
                    }
                }
            }
        };

        document.addEventListener('paste', handlePaste);

        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, [optimizeAndSave]);

    const handleImageInput = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.click();

        fileInput.addEventListener('change', () => {
            if (fileInput && fileInput.files) {
                const file = fileInput.files[0];
                optimizeAndSave(file);
            }
        });
    };

    return (
        <BtnWithTooltip
            type='tool'
            icon={<RiImageAddLine />}
            onClick={handleImageInput}
            tooltipText='Вставить изображение'
            tooltipPlace='right'
            uniqueId='toolBtnImage'
        />
    );
};

export default ImageBtn;
