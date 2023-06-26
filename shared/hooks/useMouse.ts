import React, { useState, useEffect } from 'react';

interface MousePosition {
    docX: number;
    docY: number;
}

const useMouse = (): MousePosition => {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        docX: 0,
        docY: 0,
    });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({
                docX: event.pageX,
                docY: event.pageY,
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return mousePosition;
};

export default useMouse;
