import { FormEvent, useMemo, useState } from 'react';

import { AiOutlineArrowUp } from 'react-icons/ai';

import { socket } from '@/shared/utils/socket';
import InputElement from '@/shared/components/InputElement';

const ChatInput = () => {
    const [msg, setMsg] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (msg.length === 0) return;
        socket.emit('send_msg', msg);
        setMsg('');
    };

    const btnStyle = useMemo<string>(() => {
        if (msg.length === 0) return 'pointer-events-none opacity-50';
        return 'hover:scale-110 pointer-events-auto';
    }, [msg]);

    return (
        <form
            className='flex w-full items-center gap-2 py-2 px-4'
            onSubmit={handleSubmit}
        >
            <InputElement
                label='Сообщение'
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                maxLength={1000}
            />
            <button
                className={`
                    w-9
                    h-9
                    bg-violet-500 
                    text-white
                    text-xl
                    flex
                    items-center
                    justify-center
                    rounded-full
                    flex-shrink-0
                    transition
                    ${btnStyle}
                    `}
                type='submit'>
                <AiOutlineArrowUp />
            </button>
        </form>
    );
};

export default ChatInput;
