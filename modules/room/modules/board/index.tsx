import ClientCanvas from './components/ClientCanvas';
import MousePosition from './components/MousePosition';
import ServerMouses from './components/ServerMouses';
import MoveImage from './components/MoveImage';
import SelectionBtns from './components/SelectionBtns';
import MiniMap from '@/modules/room/modules/board/components/Minimap';
import React from 'react';
import Background from '@/modules/room/modules/board/components/Background';
import CursorUpdater from '@/modules/room/modules/board/components/CursorUpdater';
import MainCanvas from '@/modules/room/modules/board/components/MainCanvas';
import { isMobile } from 'react-device-detect';
import CacheCanvas from '@/modules/room/modules/board/components/CacheCanvas';

const Board = () => (
    <>
        <Background />
        <MainCanvas />
        <CacheCanvas />
        <ClientCanvas />

        <MiniMap />
        {!isMobile &&
            <>
                <CursorUpdater />
                <MousePosition />
            </>
        }
        <ServerMouses />
        <MoveImage />
        <SelectionBtns />
    </>
);

export default Board;
