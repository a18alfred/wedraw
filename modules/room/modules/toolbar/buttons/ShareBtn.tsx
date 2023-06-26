import React from 'react';
import { HiUserAdd } from 'react-icons/hi';
import ShareModal from '@/modules/room/modules/toolbar/modals/ShareModal';
import { useModal } from '@/modules/modal';
import { useShare } from '@/shared/hooks/useShare';
import { isMobile } from 'react-device-detect';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';

const ShareBtn = () => {
    const { openModal } = useModal();
    const { canShare, onShare } = useShare();
    const handleShare = () => {
        if (isMobile && canShare) {
            onShare({ title: 'Заходи в мою комнату!' });
            return;
        }
        openModal(<ShareModal />);
    };

    return (
        <BtnWithTooltip
            type='tool'
            icon={<HiUserAdd />}
            onClick={handleShare}
            tooltipText='Пригласить'
            tooltipPlace='right'
            uniqueId='toolBtnShare'
        />
    );
};

export default ShareBtn;
