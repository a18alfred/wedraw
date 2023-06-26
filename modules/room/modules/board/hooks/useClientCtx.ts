import { useEffect, useState } from 'react';

import { useRefs } from '../../../hooks/useRefs';

export const useClientCtx = () => {
    const { clientCanvasRef } = useRefs();

    const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

    useEffect(() => {
        const newCtx = clientCanvasRef.current?.getContext('2d', { willReadFrequently: true });

        if (newCtx) {
            newCtx.lineJoin = 'round';
            newCtx.lineCap = 'round';
            setCtx(newCtx);
        }
    }, [clientCanvasRef]);

    return ctx;
};
