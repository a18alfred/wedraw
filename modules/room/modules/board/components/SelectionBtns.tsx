import { useEffect, useRef } from 'react';

import { BsEraser } from 'react-icons/bs';
import { TiDownloadOutline } from 'react-icons/ti';
import { RxScissors } from 'react-icons/rx';
import { RiFileCopyLine } from 'react-icons/ri';
import { HiOutlineClipboardCopy } from 'react-icons/hi';

import { useOptionsValue } from '@/shared/state/options';

import { useRefs } from '../../../hooks/useRefs';
import { useBoardPosition } from '../hooks/useBoardPosition';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import { isMobile } from 'react-device-detect';
import { useControlZoom } from '@/shared/state/control';

const SelectionBtns = () => {
    const { selection } = useOptionsValue();
    const containerRef = useRef<HTMLDivElement>(null);
    const { selectionRefs } = useRefs();
    const boardPos = useBoardPosition();
    const { zoom, offsetX, offsetY } = useControlZoom();

    const handleChangeX = (newX: number) => {
        if (!containerRef.current) return;

        let left = -40;
        if (selection) {
            const { x, width } = selection;
            left = Math.min(x, x + width) * zoom + newX - 40 + offsetX;
            if (left <= 50) left += width * zoom + 50;
            containerRef.current.style.left = `${left}px`;
        }
    };

    const handleChangeY = (newY: number) => {
        if (!containerRef.current) return;

        let top = -40;
        if (selection) {
            const { y, height } = selection;
            top = Math.min(y, y + height) * zoom + newY + offsetY;
            containerRef.current.style.top = `${top}px`;
        }
    };

    useEffect(() => {
        const unsubscribeX = boardPos.x.onChange(handleChangeX);
        const unsubscribeY = boardPos.y.onChange(handleChangeY);

        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [boardPos, handleChangeX, handleChangeY]);

    useEffect(() => {
        if (selection) {
            handleChangeX(boardPos.x.get());
            handleChangeY(boardPos.y.get());
        }
    }, [selection, handleChangeX, handleChangeY]);

    if (!selection) return null;


    return (
        <div
            ref={containerRef}
            className='absolute z-selection flex flex-col items-center justify-center gap-2 text-white'
            style={{ top: -40, left: -40 }}
        >
            <BtnWithTooltip
                type='context'
                icon={<RxScissors />}
                tooltipText='Вырезать и переместить'
                tooltipPlace='top'
                uniqueId='selectionBtnScissors'
                ref={(ref) => {
                    if (ref && selectionRefs.current)
                        selectionRefs.current[0] = ref;
                }}
            />
            <BtnWithTooltip
                type='context'
                icon={<RiFileCopyLine />}
                tooltipText='Дублировать'
                tooltipPlace='top'
                uniqueId='selectionBtnDuplicate'
                ref={(ref) => {
                    if (ref && selectionRefs.current)
                        selectionRefs.current[1] = ref;
                }}
            />
            {
                !isMobile && navigator.clipboard &&
                <BtnWithTooltip
                    type='context'
                    icon={<HiOutlineClipboardCopy />}
                    tooltipText='Скопировать в буфер'
                    tooltipPlace='top'
                    uniqueId='selectionBtnClipboard'
                    ref={(ref) => {
                        if (ref && selectionRefs.current)
                            selectionRefs.current[2] = ref;
                    }}
                />
            }

            <BtnWithTooltip
                type='context'
                icon={<TiDownloadOutline />}
                tooltipText='Сохранить на диск'
                tooltipPlace='top'
                uniqueId='selectionBtnSave'
                ref={(ref) => {
                    if (ref && selectionRefs.current)
                        selectionRefs.current[3] = ref;
                }}
            />
            <BtnWithTooltip
                type='context'
                icon={<BsEraser />}
                tooltipText='Стереть выделенное'
                tooltipPlace='top'
                uniqueId='selectionBtnErase'
                ref={(ref) => {
                    if (ref && selectionRefs.current)
                        selectionRefs.current[4] = ref;
                }}
            />
        </div>
    );
};

export default SelectionBtns;
