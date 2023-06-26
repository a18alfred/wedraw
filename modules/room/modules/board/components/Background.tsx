import { useEffect } from 'react';
import Head from 'next/head';

import { motion } from 'framer-motion';

import { CANVAS_SIZE } from '@/shared/constants/canvasSize';
import { useBackground } from '@/shared/state/background';

import { useBoardPosition } from '../hooks/useBoardPosition';
import { useRefs } from '@/modules/room/hooks/useRefs';
import { BG_COLORS, BG_COLORS_THEME, BG_LINE_COLORS } from '@/shared/constants/colors';
import { useControlZoom } from '@/shared/state/control';

const Background = () => {
    const { bgRef } = useRefs();
    const bg = useBackground();
    const { x, y } = useBoardPosition();
    const { zoom } = useControlZoom();

    useEffect(() => {
        const ctx = bgRef.current?.getContext('2d');

        if (ctx) {
            ctx.fillStyle = bg.mode === 'dark' ? BG_COLORS.dark : BG_COLORS.light;
            ctx.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

            document.body.style.backgroundColor =
                bg.mode === 'dark' ? '#000' : '#fff';

            if (bg.lines) {
                ctx.lineWidth = 1;
                ctx.strokeStyle = bg.mode === 'dark' ? BG_LINE_COLORS.dark : BG_LINE_COLORS.light;
                for (let i = 0; i < CANVAS_SIZE.height; i += 15) {
                    ctx.beginPath();
                    ctx.moveTo(0, i);
                    ctx.lineTo(ctx.canvas.width, i);
                    ctx.stroke();
                }

                for (let i = 0; i < CANVAS_SIZE.width; i += 15) {
                    ctx.beginPath();
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, ctx.canvas.height);
                    ctx.stroke();
                }
            }
        }
    }, [bgRef, bg]);

    return (
        <>
            <Head>
                <meta name='theme-color' content={BG_COLORS_THEME[bg.mode]} />
            </Head>
            <motion.canvas
                ref={bgRef}
                width={CANVAS_SIZE.width}
                height={CANVAS_SIZE.height}
                className='absolute top-0 z-0'
                style={{ x, y, scale: zoom }}
            />
        </>
    );
};

export default Background;
