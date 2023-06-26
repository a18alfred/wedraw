import RoomImageContextProvider from '../context/image/RoomImageContext';
import Board from '../modules/board';
import Chat from '../modules/chat';
import ToolBar from '../modules/toolbar';
import NameInput from './NameInput';
import UserList from '../modules/controlbar/components/UserList';
import { useModal } from '@/modules/modal';
import React, { useEffect } from 'react';
import useLockedBody from '@/shared/hooks/useLockedBody';
import RoomRefContextProvider from '@/modules/room/context/reference/RoomRef.context';
import RoomPosContextProvider from '@/modules/room/context/position/RoomPos.context';
import { useRoomId } from '@/shared/state/room/room.hooks';
import ControlBar from '@/modules/room/modules/controlbar';
import RoomUpdater from './RoomUpdater';
import Head from 'next/head';
import DrawContextProvider from '@/modules/room/context/draw/Draw.context';

const Room = () => {
    const { closeModal } = useModal();
    const roomId = useRoomId();
    useLockedBody(true, 'root');

    useEffect(() => {
        closeModal();
    }, [closeModal]);

    if (!roomId) return <NameInput />;

    return (
        <>
            <Head>
                <title>Порисуем.рф | Групповая комната</title>
            </Head>
            <RoomRefContextProvider>
                <RoomPosContextProvider>
                    <RoomImageContextProvider>
                        <DrawContextProvider>
                            <RoomUpdater />
                            <div
                                className='relative h-full w-full overflow-hidden'
                            >
                                <UserList />
                                <ToolBar />
                                <Board />
                                <Chat />
                                <ControlBar />
                            </div>
                        </DrawContextProvider>
                    </RoomImageContextProvider>
                </RoomPosContextProvider>
            </RoomRefContextProvider>
        </>
    );
};

export default Room;
