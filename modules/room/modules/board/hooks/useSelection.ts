import { useEffect, useMemo } from 'react';

import { toast } from 'react-toastify';

import { DEFAULT_MOVE } from '@/shared/constants/defaultMove';
import { socket } from '@/shared/utils/socket';
import { useOptionsValue, useSetSelection } from '@/shared/state/options';
import { Move } from '@/shared/types/global';

import { useMoveImage } from '../../../hooks/useMoveImage';
import { useRefs } from '../../../hooks/useRefs';
import { useClientCtx } from './useClientCtx';
import { useMainCtx } from '@/modules/room/modules/board/hooks/useMainCtx';
import useDownload from '@/modules/room/hooks/useDownload';
import { fixSelectionDimensions } from '@/shared/utils/selectionChecker';
import { v4 } from 'uuid';
import HOTKEYS from '@/shared/constants/hotKeys';

let tempSelection = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};

export const useSelection = () => {
    const clientCtx = useClientCtx();
    const ctx = useMainCtx();
    const options = useOptionsValue();
    const { selection } = options;
    const { bgRef, selectionRefs } = useRefs();
    const { setMoveImage } = useMoveImage();
    const { clearSelection } = useSetSelection();
    const { downloadSelection } = useDownload();

    useEffect(() => {
        const callback = async () => {

            if (clientCtx && selection) {
                setTimeout(() => {
                    const { x, y, width, height } = selection;

                    clientCtx.lineWidth = 2;
                    clientCtx.strokeStyle = 'rgb(74,54,182)';
                    clientCtx.setLineDash([5, 10]);
                    clientCtx.globalCompositeOperation = 'source-over';

                    clientCtx.beginPath();
                    clientCtx.rect(x, y, width, height);
                    clientCtx.stroke();
                    clientCtx.closePath();

                    clientCtx.setLineDash([]);
                }, 10);
            }
        };

        if (
            tempSelection.width !== selection?.width ||
            tempSelection.height !== selection?.height ||
            tempSelection.x !== selection?.x ||
            tempSelection.y !== selection?.y
        ) {
            clientCtx?.clearRect(0, 0, clientCtx.canvas.width, clientCtx.canvas.height);
            callback();
        }

        return () => {
            if (selection) tempSelection = selection;
        };

    }, [selection, clientCtx]);

    const dimension = useMemo(() => {
        if (selection) {
            return fixSelectionDimensions(selection);
        }

        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
        };
    }, [selection]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const makeBlob = async (withBg?: boolean) => {
        if (!selection) return null;

        const { x, y, width, height } = dimension;

        const imageData = ctx?.getImageData(x, y, width, height);

        if (imageData) {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width;
            tempCanvas.height = height;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const tempCtx = canvas.getContext('2d');

            if (tempCtx && bgRef.current) {
                const bgImage = bgRef.current
                    .getContext('2d')
                    ?.getImageData(x, y, width, height);

                if (bgImage && withBg) tempCtx.putImageData(bgImage, 0, 0);

                const sTempCtx = tempCanvas.getContext('2d');
                sTempCtx?.putImageData(imageData, 0, 0);

                tempCtx.drawImage(tempCanvas, 0, 0);

                const blob: Blob = await new Promise((resolve) => {
                    canvas.toBlob((blobGenerated) => {
                        if (blobGenerated) resolve(blobGenerated);
                    });
                });

                return blob;
            }
        }

        return null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const emitEraseMove = () => {
        if (!selection) return null;

        const { x, y, width, height } = fixSelectionDimensions(dimension);

        const move: Move = {
            ...DEFAULT_MOVE,
            rect: {
                width,
                height,
            },
            id: v4(),
            path: [[x, y]],
            options: {
                ...options,
                lineWidth: 1,
                shape: 'rect',
                mode: 'eraser',
                fillColor: { r: 0, g: 0, b: 0, a: 1 },
            },
        };

        socket.emit('draw', move);

        return move;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleCopy = async () => {
        const blob = await makeBlob(true);

        if (blob)
            navigator.clipboard
                .write([
                    new ClipboardItem({
                        'image/png': blob,
                    }),
                ])
                .then(() => {
                    toast('Сохранено в буфер', {
                        position: 'top-center',
                        theme: 'colored',
                        className: 'custom-toast-content',
                    });
                });
    };

    useEffect(() => {
        const handleSelection = async (e: KeyboardEvent) => {
            if (HOTKEYS.copy.includes(e.key) && e.ctrlKey) handleCopy();
            if (HOTKEYS.delete.includes(e.key) && selection) emitEraseMove();
        };

        document.addEventListener('keydown', handleSelection);

        return () => {
            document.removeEventListener('keydown', handleSelection);
        };
    }, [
        bgRef,
        emitEraseMove,
        ctx,
        handleCopy,
        makeBlob,
        options,
        selection,
    ]);

    useEffect(() => {
        const handleScissorsMove = async (cutOriginal: boolean) => {
            if (selection) {
                const blob = await makeBlob();
                if (!blob) return;

                const { x, y, width, height } = dimension;

                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.addEventListener('loadend', () => {
                    const base64 = reader.result?.toString();

                    if (base64) {
                        setMoveImage({
                            base64,
                            x: Math.min(x, x + width),
                            y: Math.min(y, y + height),
                            height: height,
                            width: width,
                            newInit: true,
                        });
                        if (cutOriginal) emitEraseMove();
                        else clearSelection();
                    }

                });
            }
        };

        if (selection && selectionRefs.current) {
            const scissorsBtn = selectionRefs.current[0];
            const duplicateBtn = selectionRefs.current[1];
            const clipboardBtn = selectionRefs.current[2];
            const saveToDiskBtn = selectionRefs.current[3];
            const eraseBtn = selectionRefs.current[4];

            scissorsBtn?.addEventListener('click', () => handleScissorsMove(true));
            duplicateBtn?.addEventListener('click', () => handleScissorsMove(false));
            clipboardBtn?.addEventListener('click', handleCopy);
            saveToDiskBtn?.addEventListener('click', downloadSelection);
            eraseBtn?.addEventListener('click', emitEraseMove);

            return () => {
                scissorsBtn?.removeEventListener('click', () => handleScissorsMove(true));
                duplicateBtn?.removeEventListener('click', () => handleScissorsMove(false));
                clipboardBtn?.removeEventListener('click', handleCopy);
                saveToDiskBtn?.removeEventListener('click', downloadSelection);
                eraseBtn?.removeEventListener('click', emitEraseMove);
            };
        }
    }, [
        clearSelection,
        emitEraseMove,
        dimension,
        handleCopy,
        makeBlob,
        downloadSelection,
        selection,
        selectionRefs,
        setMoveImage,
    ]);
};
