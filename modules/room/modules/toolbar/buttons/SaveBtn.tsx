import React from 'react';
import { TiDownload } from 'react-icons/ti';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import useDownload from '@/modules/room/hooks/useDownload';

const SaveBtn = () => {
    const { downloadRoom } = useDownload();

    return (
        <BtnWithTooltip
            type='tool'
            icon={<TiDownload />}
            onClick={downloadRoom}
            tooltipText='Сохранить'
            tooltipPlace='right'
            uniqueId='toolBtnSave'
        />
    );
};

export default SaveBtn;
