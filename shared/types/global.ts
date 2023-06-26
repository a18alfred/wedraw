import { RgbaColor } from 'react-colorful';

export type Shape = 'line' | 'circle' | 'rect' | 'image';
export type CtxMode = 'eraser' | 'draw' | 'select' | 'zoomIn' | 'zoomOut';

export interface Selection {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface CtxOptions {
    lineWidth: number;
    lineColor: RgbaColor;
    fillColor: RgbaColor;

    fillShape: boolean;
    eraserOpacity: number;
    pathSmoothness: number;
    shape: Shape;
    mode: CtxMode;
    selection: Selection | null;
}

export type PathPoint = [number, number]

export interface Move {
    circle: {
        cX: number;
        cY: number;
        radiusX: number;
        radiusY: number;
    };
    rect: {
        width: number;
        height: number;
    };
    img: {
        base64: string;
    };
    path: PathPoint[];
    options: CtxOptions;
    timestamp: number;
    id: string;
}

export type Room = {
    usersMoves: Map<string, Move[]>;
    users: Map<string, string>;
};

export interface User {
    name: string;
    color: string;
    displayMouse: boolean;
}

export interface ClientRoom {
    id: string;
    username: string;
    usersMoves: Map<string, Move[]>;
    myMoves: Move[];
    users: Map<string, User>;
}

export interface ClientControl {
    dragging: boolean;

    touchDragging: boolean;
    isMapOpen: boolean;
    isToolsOpen: boolean;
    isChatOpen: boolean;
    zoom: number;
    offsetX: number;
    offsetY: number;
}

export interface MessageType {
    userId: string;
    username: string;
    color: string;
    msg: string;
    id: number;
}

export type HistoryOptionsTranslation = {
    [key in CtxMode]: {
        [key in Shape]: string
    }
}

export interface ServerToClientEvents {
    room_exists: (exists: boolean) => void;
    joined: (roomId: string, username: string, failed?: boolean) => void;
    room: (usersMovesToParse: string, usersToParse: string) => void;
    created: (roomId: string, username: string) => void;
    your_move: (moves: Move[]) => void;
    user_draw: (moves: Move[], userId: string) => void;

    user_undo(userId: string, n: number): void;

    mouse_moved: (x: number, y: number, userId: string) => void;
    new_user: (userId: string, username: string) => void;
    user_disconnected: (userId: string) => void;
    new_msg: (userId: string, msg: string) => void;
}

export interface ClientToServerEvents {
    check_room: (roomId: string) => void;
    draw: (move: Move) => void;

    redraw: (moves: Move[]) => void;
    mouse_move: (x: number, y: number) => void;
    undo: (n: number) => void;
    create_room: (username: string) => void;
    join_room: (room: string, username: string, prevUserId?: string) => void;
    joined_room: () => void;
    leave_room: () => void;
    send_msg: (msg: string) => void;
}

export interface StoredKey {
    timestamp: number,
    id: string
}