import React from 'react';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import { IoIosBrush } from 'react-icons/io';
import { useOptionsMode, useOptionsShape, useSetOptions } from '@/shared/state/options';
import useLocalDraw from '@/modules/room/hooks/useLocalDraw';
import HOTKEYS from '@/shared/constants/hotKeys';

const BrushBtn = () => {
    const { isDrawing } = useLocalDraw();
    const mode = useOptionsMode();
    const shape = useOptionsShape();
    const setOptions = useSetOptions();

    const onBrushMode = () => {
        if (isDrawing) return;
        if (mode !== 'draw' || shape !== 'line')
            setOptions((prev) => ({
                ...prev,
                mode: 'draw',
                shape: 'line',
            }));
    };

    return (
        <BtnWithTooltip
            type='tool'
            icon={<IoIosBrush />}
            tooltipText='Кисть (B)'
            tooltipPlace='right'
            isPushed={mode === 'draw' && shape === 'line'}
            uniqueId='toolBtnBrush'
            onClick={onBrushMode}
            hotKeys={HOTKEYS.brush}
        />
    );
};

export default BrushBtn;
