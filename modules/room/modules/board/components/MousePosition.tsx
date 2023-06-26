import { useRef } from 'react';

import { getPos } from '@/shared/utils/getPos';
import { socket } from '@/shared/utils/socket';

import { useBoardPosition } from '../hooks/useBoardPosition';
import useMouse from '@/shared/hooks/useMouse';
import useInterval from '@/shared/hooks/useInterval';
import { useControlZoom } from '@/shared/state/control';

const MousePosition = () => {
    const { x, y } = useBoardPosition();
    const { zoom, offsetX, offsetY } = useControlZoom();
    const prevPosition = useRef({ x: 0, y: 0 });
    const { docX, docY } = useMouse();

    const touchDevice = window.matchMedia('(pointer: coarse)').matches;

    useInterval(() => {
        if (
            (prevPosition.current.x !== docX ||
                prevPosition.current.y !== docY) &&
            !touchDevice
        ) {
            socket.emit('mouse_move', getPos(docX, x, offsetX, zoom), getPos(docY, y, offsetY, zoom));
            prevPosition.current = { x: docX, y: docY };
        }
    }, 150);

    return null;
};

export default MousePosition;
