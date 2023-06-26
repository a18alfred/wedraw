import { Move } from '@/shared/types/global';
import { getStringFromRgba } from '@/shared/utils/rgba';

export const drawMove = (ctx: CanvasRenderingContext2D, move: Move, image?: HTMLImageElement) => {
    const { path } = move;

    if (!ctx || !path.length) return;
    const moveOptions = move.options;
    if (moveOptions.mode === 'select') return;

    ctx.lineWidth = moveOptions.lineWidth;
    ctx.strokeStyle = getStringFromRgba(moveOptions.lineColor);
    ctx.fillStyle = getStringFromRgba(
        moveOptions.fillShape ? moveOptions.fillColor : { r: 0, g: 0, b: 0, a: 0 },
    );

    if (moveOptions.mode === 'eraser') {
        if (moveOptions.shape !== 'line') ctx.fillStyle = getStringFromRgba({ r: 0, g: 0, b: 0, a: 1 });
        ctx.globalCompositeOperation = 'destination-out';
    } else ctx.globalCompositeOperation = 'source-over';

    if (moveOptions.shape === 'image' && image)
        ctx.drawImage(image, path[0][0], path[0][1]);

    switch (moveOptions.shape) {
        case 'line': {
            ctx.beginPath();
            path.forEach(([x, y]) => {
                ctx.lineTo(x, y);
            });
            ctx.stroke();
            ctx.closePath();
            break;
        }

        case 'circle': {
            const { cX, cY, radiusX, radiusY } = move.circle;

            ctx.beginPath();
            ctx.ellipse(cX, cY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
            break;
        }

        case 'rect': {
            const { width, height } = move.rect;

            ctx.beginPath();

            ctx.rect(path[0][0], path[0][1], width, height);
            ctx.stroke();
            ctx.fill();

            ctx.closePath();
            break;
        }

        default:
            break;
    }
};