import { useEffect, RefObject } from 'react';

type AnyEvent = MouseEvent | TouchEvent;

const useClickAway = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: () => void
) => {
    useEffect(() => {
        const listener = (event: AnyEvent) => {
            const el = ref?.current;

            if (!el || el.contains(event.target as Node)) {
                return;
            }

            handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};

export default useClickAway;
