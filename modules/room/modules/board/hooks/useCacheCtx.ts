import { useEffect, useState } from 'react';

import { useRefs } from '../../../hooks/useRefs';

export const useCacheCtx = () => {
    const { cacheCanvasRef } = useRefs();

    const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

    useEffect(() => {
        const newCtx = cacheCanvasRef.current?.getContext('2d', { willReadFrequently: false });

        if (newCtx) {
            newCtx.lineJoin = 'round';
            newCtx.lineCap = 'round';
            setCtx(newCtx);
        }
    }, [cacheCanvasRef]);

    return ctx;
};
