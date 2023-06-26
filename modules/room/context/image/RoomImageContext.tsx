import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from 'react';

export const roomImageContext = createContext<{
    moveImage: { base64: string; x: number; y: number, width: number, height: number, newInit: boolean };
    setMoveImage: Dispatch<SetStateAction<{
        base64: string;
        width: number;
        height: number
        x: number;
        y: number;
        newInit: boolean;
    }>>;
}>(null!);

const RoomImageContextProvider = ({ children }: { children: ReactNode }) => {
    const [moveImage, setMoveImage] = useState<{
        base64: string;
        x: number;
        y: number;
        width: number;
        height: number;
        newInit: boolean;
    }>({ base64: '', width: 0, height: 0, x: 0, y: 0, newInit: false });

    return (
        <roomImageContext.Provider
            value={{
                setMoveImage,
                moveImage,
            }}
        >
            {children}
        </roomImageContext.Provider>
    );
};

export default RoomImageContextProvider;
