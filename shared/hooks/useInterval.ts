import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number): void => {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            if (savedCallback.current) {
                savedCallback.current();
            }
        };
        const intervalId = setInterval(tick, delay);
        return () => clearInterval(intervalId);
    }, [delay]);
};

export default useInterval;
