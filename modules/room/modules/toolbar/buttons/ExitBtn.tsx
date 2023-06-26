import React from 'react';
import { ImExit } from 'react-icons/im';
import { useRouter } from 'next/router';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import { isInstalled } from '@/shared/utils/isInstalled';

const ExitBt = () => {
    const router = useRouter();
    const handleExit = () => {
        router.push('/');
    };
    const mb = isInstalled() ? 'mb-5' : 'mb-0';

    return (
        <div className={`flex-1 flex items-end ${mb}`}>
            <BtnWithTooltip
                type='tool'
                icon={<ImExit />}
                onClick={handleExit}
                tooltipText='Выйти'
                tooltipPlace='right'
                uniqueId='toolBtnExit'
            />
        </div>
    );
};

export default ExitBt;
