import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { socket } from '@/shared/utils/socket';
import { useSetRoomJoin } from '@/shared/state/room';
import { useModal } from '@/modules/modal';

import NotFoundModal from '../modals/NotFound';
import { styles } from '@/shared/styles/custom';
import CreateRoom from '@/modules/home/modals/CreateRoom';
import ActionButton from '@/modules/home/components/ActionButton';
import EnterRoom from '@/modules/home/modals/EnterRoom';

const Home = () => {
    const { openModal } = useModal();
    const { joinRoom, resetRoom } = useSetRoomJoin();
    const router = useRouter();

    useEffect(() => {
        socket.on('created', (roomIdFromServer, username) => {
            joinRoom(roomIdFromServer, username);
            router.push(roomIdFromServer);
        });

        const handleJoinedRoom = (
            roomIdFromServer: string,
            username: string,
            failed?: boolean,
        ) => {
            if (!failed) {
                joinRoom(roomIdFromServer, username);
                router.push(roomIdFromServer);
            } else {
                openModal(<NotFoundModal />);
            }
        };

        socket.on('joined', handleJoinedRoom);

        return () => {
            socket.off('created');
            socket.off('joined', handleJoinedRoom);
        };
    }, [openModal, router, joinRoom]);

    useEffect(() => {
        socket.emit('leave_room');
        resetRoom();
    }, [resetRoom]);

    const handleCreateRoom = (e: React.MouseEvent) => {
        e.preventDefault();
        openModal(<CreateRoom />);
    };

    const handleJoinRoom = (e: React.MouseEvent) => {
        e.preventDefault();
        openModal(<EnterRoom />);
    };

    return (
        <section className={'bg-hero-pattern bg-cover bg-no-repeat bg-center'}>
            <div className={` w-full min-h-[94vh] mx-auto ${styles.paddingX} max-w-7xl flex flex-col gap-16`}>
                <div className={'flex justify-start items-center gap-4'}>
                    <Image
                        src={'/assets/images/logo.webp'}
                        width={35}
                        height={35}
                        alt='Octopus'
                        priority={true}
                        className={'object-contain'}
                    />
                    <p className='text-2xl font-extrabold leading-tight text-white py-4'>
                        Порисуем.рф
                    </p>
                </div>
                <div className='flex flex-row items-start  justify-center gap-5'>
                    <div className='flex flex-col justify-center items-center mt-5'>
                        <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
                        <div className='w-1 sm:h-60 h-40 violet-gradient' />
                    </div>
                    <div>
                        <h2 className={`${styles.heroHeadText} `}>
                            Доска для <span className='text-violet-500 font-black'>рисования</span>
                        </h2>
                        <p className={`${styles.heroSubText} mt-2`}>
                            Создавайте комнаты и рисуйте в режиме реального времени с друзьями. Получите удовольствие от
                            коллективного творчества с помощью этого интерактивного приложения!
                        </p>
                    </div>
                </div>

                <div className={'flex flex-col sm:flex-row gap-8 mb-8'}>
                    <ActionButton
                        onClick={handleCreateRoom}
                        buttonText={'Создать комнату'}
                    />

                    <ActionButton
                        onClick={handleJoinRoom}
                        buttonText={'Подключиться к комнате'}
                    />
                </div>

                <motion.div
                    animate={{
                        x: [-5, 5, -5],
                        y: [-5, 5, -5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'loop',
                    }}
                >
                    <Image
                        src={'/assets/svg/octopus.svg'}
                        width={600}
                        height={600}
                        alt='Octopus'
                        priority={true}
                        className={'mx-auto object-contain w-full h-auto max-w-xl'}
                    />
                </motion.div>
            </div>
        </section>

    );
};

export default Home;
