import React from 'react';
import { CgDarkMode } from 'react-icons/cg';
import BackgroundModal from '@/modules/room/modules/toolbar/modals/BackgroundModal';
import { useModal } from '@/modules/modal';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';

const BackgroundBtn = () => {
    const { openModal } = useModal();

    return (
        <BtnWithTooltip
            type='tool'
            icon={<CgDarkMode />}
            onClick={() => openModal(<BackgroundModal />)}
            tooltipText='Выбрать фон'
            tooltipPlace='right'
            uniqueId='toolBtnBackground'
        />
    );
};

export default BackgroundBtn;
