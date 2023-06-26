import {
    createContext,
    ReactNode,
    RefObject,
    useRef,
} from 'react';

type UndoRedoHandler = (n: number) => void
export const roomRefContext = createContext<{
    undoRef: RefObject<(n: number) => void>;
    redoRef: RefObject<(n: number) => void>;
    clientCanvasRef: RefObject<HTMLCanvasElement>;
    mainCanvasRef: RefObject<HTMLCanvasElement>;
    cacheCanvasRef: RefObject<HTMLCanvasElement>;
    bgRef: RefObject<HTMLCanvasElement>;
    imageRef: RefObject<HTMLDivElement>;
    selectionRefs: RefObject<HTMLButtonElement[]>;
    minimapRef: RefObject<HTMLCanvasElement>;
    setUndoRef: (handler: UndoRedoHandler) => void;
    setRedoRef: (handler: UndoRedoHandler) => void;
}>(null!);

const RoomRefContextProvider = ({ children }: { children: ReactNode }) => {
    const undoRef = useRef<UndoRedoHandler>(() => {
        // do something
    });
    const redoRef = useRef<UndoRedoHandler>(() => {
        // do something
    });
    const clientCanvasRef = useRef<HTMLCanvasElement>(null);
    const mainCanvasRef = useRef<HTMLCanvasElement>(null);
    const cacheCanvasRef = useRef<HTMLCanvasElement>(null);
    const bgRef = useRef<HTMLCanvasElement>(null);
    const minimapRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const selectionRefs = useRef<HTMLButtonElement[]>([]);

    const setUndoRef = (handler: UndoRedoHandler) => {
        undoRef.current = handler;
    };

    const setRedoRef = (handler: UndoRedoHandler) => {
        redoRef.current = handler;
    };

    return (
        <roomRefContext.Provider
            value={{
                bgRef,
                undoRef,
                redoRef,
                clientCanvasRef,
                mainCanvasRef,
                cacheCanvasRef,
                minimapRef,
                imageRef,
                selectionRefs,
                setUndoRef,
                setRedoRef,
            }}
        >
            {children}
        </roomRefContext.Provider>
    );
};

export default RoomRefContextProvider;
