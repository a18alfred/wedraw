import React from 'react';
import { Move } from '@/shared/types/global';
import { historyOptionsRu } from '@/shared/constants/ruOptions';
import { useRefs } from '@/modules/room/hooks/useRefs';

interface HistoryItemProps {
    move: Move;
    isSaved?: boolean;
    style: React.CSSProperties;
    index: number;
    historyLength: number;
}

const HistoryItem = ({ move, isSaved, style, index, historyLength }: HistoryItemProps) => {
    const { redoRef, undoRef } = useRefs();
    const moveText = historyOptionsRu[move.options.mode][move.options.shape];

    const date = new Date(move.timestamp);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();
    const formattedTime = hours + ':' + minutes.slice(-2) + ':' + seconds.slice(-2);

    const handleClick = () => {
        if (isSaved) {
            if (redoRef.current)
                redoRef.current(index);
        } else {
            if (undoRef.current)
                undoRef.current(historyLength === 1 ? index + 1 : index);
        }
    };

    return (
        <div className={'px-2 pt-2'}
             style={style}
        >
            <p
                onClick={handleClick}
                className=
                    {`${isSaved ? 'text-secondary' : 'text-black '}
                    text-sm 
                    text-center 
                    text-black 
                    p-2
                    w-full
                    border-2 
                    cursor-pointer
                    flex
                    justify-between
                    `
                    }
            >
                <span>{moveText}</span>
                <span className={'text-secondary'}>{formattedTime}</span>
            </p>
        </div>
    );
};

export default HistoryItem;
