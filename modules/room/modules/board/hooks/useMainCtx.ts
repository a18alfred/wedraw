import { useEffect, useState } from 'react';

import { useRefs } from '../../../hooks/useRefs';

export const useMainCtx = () => {
    const { mainCanvasRef } = useRefs();

    const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

    useEffect(() => {
        const newCtx = mainCanvasRef.current?.getContext('2d', { willReadFrequently: false });

        if (newCtx) {
            newCtx.lineJoin = 'round';
            newCtx.lineCap = 'round';
            setCtx(newCtx);
        }
    }, [mainCanvasRef]);

    return ctx;
};
