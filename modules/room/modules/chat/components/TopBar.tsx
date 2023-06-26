import React from 'react';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';
import { useControl } from '@/shared/state/control';

const TopBar = React.memo(() => {
    const { toggleChat } = useControl();

    return (
        <button
            className='flex w-full cursor-pointer items-center justify-between bg-tertiary py-2 px-4 text-white'
            onClick={(e) => {
                e.preventDefault();
                toggleChat();
            }}
        >
            <div className='flex items-center gap-2'>
                <BsFillChatDotsFill className='mt-[-2px]' />
                Чат
            </div>
            <FaChevronDown />
        </button>
    );
});

TopBar.displayName = 'TopBar';

export default TopBar;
