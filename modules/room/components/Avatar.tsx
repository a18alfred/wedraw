import React from 'react';
import { User } from '@/shared/types/global';
import { isMobile } from 'react-device-detect';
import { useUserMouseToggle } from '@/shared/state/room';
import { Tooltip } from 'react-tooltip';
import { styles } from '@/shared/styles/custom';

interface AvatarProps {
    userId: string;
    user: User;
}

const Avatar = ({ userId, user }: AvatarProps) => {
    const toggleMouse = useUserMouseToggle();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        toggleMouse(userId);
    };

    const extraStyle = user.displayMouse ? 'text-white' : 'text-black';
    const tooltipText = user.displayMouse ? 'Скрыть курсор' : 'Отобразить курсор';

    return (
        <>
            <div
                id={`cursor-${userId}`}
                onClick={handleClick}
                className={`${styles.avatar} ${extraStyle}`}
                style={{
                    backgroundColor: user.color || 'black',
                    marginTop: '-1.3rem',
                }}
            >
                {user.name.split('')[0] || 'A'}
            </div>
            {!isMobile && <Tooltip
                style={{ opacity: 1, zIndex: '45' }}
                anchorSelect={`#${`cursor-${userId}`}`}
                content={tooltipText}
                place={'left'}
            />}
        </>
    );
};

Avatar.displayName = 'Avatar';
export default Avatar;
