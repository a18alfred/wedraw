import React, { useEffect } from 'react';
import { MdOutlineSelectAll } from 'react-icons/md';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import { useOptionsMode, useSetOptions, useSetSelection } from '@/shared/state/options';
import useLocalDraw from '@/modules/room/hooks/useLocalDraw';
import HOTKEYS from '@/shared/constants/hotKeys';

const SelectionBtn = () => {
    const { isDrawing } = useLocalDraw();
    const mode = useOptionsMode();
    const setOptions = useSetOptions();
    const { clearSelection } = useSetSelection();

    useEffect(() => {
        clearSelection();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    const onSelectionMode = () => {
        if (isDrawing) return;
        if (mode !== 'select')
            setOptions((prev) => ({
                ...prev,
                mode: 'select',
            }));
    };

    return (
        <BtnWithTooltip
            type='tool'
            icon={<MdOutlineSelectAll />}
            tooltipText='Инструмент для выделения (M)'
            tooltipPlace='right'
            isPushed={mode === 'select'}
            uniqueId='toolBtnSelector'
            onClick={onSelectionMode}
            hotKeys={HOTKEYS.selection}
        />
    );
};

export default SelectionBtn;
