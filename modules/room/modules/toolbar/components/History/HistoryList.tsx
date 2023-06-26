import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useMyMoves } from '@/shared/state/room';
import { useSavedMoves } from '@/shared/state/savedMoves';
import { MdOutlineHistoryToggleOff } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import HistoryItem from '@/modules/room/modules/toolbar/components/History/HistoryItem';
import { FixedSizeList } from 'react-window';
import HistoryHint from '@/modules/room/modules/toolbar/components/History/HistoryHint';


interface HistoryListProps {
    setOpened: Dispatch<SetStateAction<boolean>>;
}

const HistoryList = ({ setOpened }: HistoryListProps) => {
    const historyRef = useRef<FixedSizeList>(null);
    const { myMoves } = useMyMoves();
    const savedMoves = useSavedMoves();

    useEffect(() => {
        if (historyRef.current)
            historyRef.current.scrollToItem(myMoves.length - 1);
    }, [myMoves, savedMoves]);

    return (
        <div className={'w-[280px]'}>
            <div className={'flex text-white py-2 px-4 items-center justify-between bg-tertiary text-base'}>
                <div className={'flex items-center gap-2'}>
                    <MdOutlineHistoryToggleOff />
                    <h4>История</h4>
                </div>
                <ImCross
                    className={'cursor-pointer'}
                    onClick={() => setOpened(false)}
                />
            </div>
            <FixedSizeList
                height={200}
                itemCount={myMoves.length + savedMoves.length}
                itemSize={50}
                width={'100%'}
                ref={historyRef}
                style={{ marginBottom: '0.5rem' }}
            >
                {({ index, style }) => {
                    if (index < myMoves.length) {
                        const reversedIndex = myMoves.length - index - 1;
                        const move = myMoves[index];
                        return <HistoryItem
                            key={move.timestamp}
                            move={move}
                            style={style}
                            index={reversedIndex}
                            historyLength={myMoves.length}
                        />;
                    } else {
                        const reversedIndex = index - myMoves.length + 1;
                        const move = savedMoves[index - myMoves.length];
                        return <HistoryItem
                            key={move.timestamp}
                            move={move}
                            isSaved={true}
                            style={style}
                            index={reversedIndex}
                            historyLength={myMoves.length}
                        />;
                    }
                }}
            </FixedSizeList>
            <HistoryHint movesLength={myMoves.length} savedLength={savedMoves.length} />
        </div>
    );
};

export default HistoryList;
