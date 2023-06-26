import { MotionValue } from 'framer-motion';

export const getPos = (pos: number, motionValue: MotionValue, offset: number, zoom: number) => {
    return Math.floor(((pos - motionValue.get()) - offset) / zoom);
};

