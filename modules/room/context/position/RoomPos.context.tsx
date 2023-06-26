import {
    createContext,
    ReactNode,
} from 'react';

import { MotionValue, useMotionValue } from 'framer-motion';

export const roomPosContext = createContext<{
    x: MotionValue<number>;
    y: MotionValue<number>;
}>(null!);

const RoomPosContextProvider = ({ children }: { children: ReactNode }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    return (
        <roomPosContext.Provider
            value={{
                x,
                y,
            }}
        >
            {children}
        </roomPosContext.Provider>
    );
};

export default RoomPosContextProvider;
