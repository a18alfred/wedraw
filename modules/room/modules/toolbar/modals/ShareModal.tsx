import React from 'react';

import CopyText from '@/modules/room/modules/toolbar/components/CopyText/CopyText';
import { useRoomId } from '@/shared/state/room/room.hooks';

const ShareModal = () => {
    const id = useRoomId();

    return (
        <>
            <h2 className='text-lg font-bold text-primary '>
                Пригласи друзей
            </h2>
            <h4> ID комнаты </h4>
            <CopyText text={id} uniqueId='toolbarShareId' />
            <h4> или поделись ссылкой </h4>
            <CopyText text={`https://порисуем.рф/${id}`} uniqueId='toolbarShareLink' />
        </>
    );
};

export default ShareModal;
