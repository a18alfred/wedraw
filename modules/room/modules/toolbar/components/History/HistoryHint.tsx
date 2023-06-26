import React from 'react';
import { isMobile } from 'react-device-detect';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useRefs } from '@/modules/room/hooks/useRefs';

interface HistoryHintProps {
    movesLength: number;
    savedLength: number;
}

const HistoryHint = ({ movesLength, savedLength }: HistoryHintProps) => {
    const { redoRef, undoRef } = useRefs();

    const backStyle = `flex items-center gap-1 cursor-pointer ${movesLength ? 'text-white' : 'text-secondary'}`;
    const forwardStyle = `flex items-center gap-1 cursor-pointer ${savedLength ? 'text-white' : 'text-secondary'}`;

    const handeUndo = () => {
        if (undoRef.current)
            undoRef.current(1);
    };

    const handeRedo = () => {
        if (redoRef.current)
            redoRef.current(1);
    };

    return (
        <>
            {
                !isMobile
                    ? <div
                        className={'flex text-white py-2 px-4 items-center justify-between border-t text-[10px] bg-tertiary'}>
                        <button
                            className={`${!movesLength && 'text-secondary'}`}
                            onClick={handeUndo}
                            disabled={!movesLength}
                        >
                            Отменить Ctrl + Z
                        </button>
                        <button
                            className={`${!savedLength && 'text-secondary'}`}
                            onClick={handeRedo}
                            disabled={!savedLength}
                        >
                            Повторить Ctrl + Y
                        </button>
                    </div>
                    : <div
                        className={'flex text-white py-2 px-2 items-center justify-between border-t text-[12px] bg-tertiary'}>
                        <div
                            className={backStyle}
                            onClick={handeUndo}
                        >
                            <button
                                className='text-lg'
                                disabled={!movesLength}
                            >
                                <IoIosArrowBack />
                            </button>
                            <span>Отменить</span>
                        </div>
                        <div
                            className={forwardStyle}
                            onClick={handeRedo}
                        >
                            <span>Повторить</span>
                            <button
                                className='text-lg'
                                disabled={!savedLength}
                            >
                                <IoIosArrowForward />
                            </button>
                        </div>
                    </div>

            }
        </>
    );
};

export default HistoryHint;
