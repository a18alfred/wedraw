import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { socket } from '@/shared/utils/socket';
import { useSetRoomJoin } from '@/shared/state/room';
import { useModal } from '@/modules/modal';
import { styles } from '@/shared/styles/custom';
import NameForm from '@/shared/components/NameForm';
import Loader from '@/shared/components/Loader';
import { ImCross } from 'react-icons/im';
import useRoomConnect from '@/modules/home/hooks/useRoomConnect';

const NameInput = () => {
    const { connectToRoom } = useRoomConnect();
    const { joinRoom } = useSetRoomJoin();
    const { openModal } = useModal();
    const [roomStatus, setRoomStatus] = useState({
        loading: true,
        exist: false,
    });

    const router = useRouter();
    const roomId = (router.query.roomId || '').toString();

    useEffect(() => {
        if (!roomId) return;

        socket.emit('check_room', roomId);

        socket.on('room_exists', (exists) => {
            if (exists) {
                setRoomStatus({
                    loading: false,
                    exist: true,
                });
                return;
            }
            setRoomStatus({
                loading: false,
                exist: false,
            });
        });

        // eslint-disable-next-line consistent-return
        return () => {
            socket.off('room_exists');
        };
    }, [roomId, router]);

    useEffect(() => {
        const handleJoined = (roomIdFromServer: string, username: string, failed?: boolean) => {
            if (failed) {
                setRoomStatus({
                    loading: false,
                    exist: false,
                });
            } else joinRoom(roomIdFromServer, username);
        };

        socket.on('joined', handleJoined);

        return () => {
            socket.off('joined', handleJoined);
        };
    }, [openModal, router, joinRoom]);

    const handleJoinRoom = (username: string) => {
        connectToRoom(roomId, username);
    };

    const handleHome = () => {
        router.push('/');
    };

    return (
        <section className={'bg-hero-pattern bg-cover bg-no-repeat bg-center'}>
            <div
                className={` w-full min-h-[94vh] mx-auto ${styles.paddingX} max-w-7xl flex flex-col gap-4 items-center justify-center`}>
                <p
                    onClick={handleHome}
                    className='text-4xl font-extrabold leading-tight text-white py-4 cursor-pointer hover:scale-105 transition'
                >
                    Порисуем.рф
                </p>
                {
                    roomStatus.loading
                        ? <div className={'text-white text-xs'}><Loader /></div>
                        : <div
                            className={'p-5 sm:min-w-[480px] min-w-full bg-white rounded-md text-center flex flex-col gap-4'}>
                            {
                                roomStatus.exist
                                    ? <NameForm
                                        submitText='Войти в комнату'
                                        onFormSubmit={handleJoinRoom}
                                    />
                                    : <>
                                        <div className={'flex justify-end'}>
                                            <button onClick={handleHome} className='text-primary'>
                                                <ImCross />
                                            </button>
                                        </div>
                                        <h2 className='text-lg font-bold'>
                                            Комната не существует или переполнена!
                                        </h2>
                                        <h3 className='mb-4'>Попробуйте зайти позже.</h3>
                                    </>
                            }
                        </div>
                }
            </div>
        </section>
    );
};

export default NameInput;
