import { useMemo, useRef, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { BiRectangle } from 'react-icons/bi';
import { BiCircle } from 'react-icons/bi';

import { useOptionsMode, useOptionsShape, useSetOptions } from '@/shared/state/options';
import { Shape } from '@/shared/types/global';

import { EntryAnimation } from '../animations/Entry.animations';
import useClickAway from '@/shared/hooks/useClickAway';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import ShapeSelector from '@/modules/room/modules/toolbar/components/ShapeSelector/ShapeSelector';
import useLocalDraw from '@/modules/room/hooks/useLocalDraw';
import HOTKEYS from '@/shared/constants/hotKeys';

const ShapeBtn = () => {
        const { isDrawing } = useLocalDraw();
        const [opened, setOpened] = useState(false);
        const mode = useOptionsMode();
        const shape = useOptionsShape();
        const setOptions = useSetOptions();
        const [lastSelected, setLastSelected] = useState<Shape>('rect');
        const ref = useRef<HTMLDivElement>(null);
        useClickAway(ref, () => setOpened(false));

        const icon = lastSelected === 'circle' ? <BiCircle /> : <BiRectangle />;
        const isActive = useMemo(() => {
            if (mode !== 'draw') return false;
            return shape === 'circle' || shape === 'rect';

        }, [mode, shape]);

        const handleShapeChange = (newShape: Shape) => {
            setOptions((prev) => ({
                ...prev,
                mode: 'draw',
                shape: newShape,
            }));

            if (newShape !== lastSelected) {
                setLastSelected(newShape);
                setOpened(false);
            }
        };

        const handleBtnClick = () => {
            if (isDrawing) return;
            if (mode !== 'draw' || shape !== lastSelected)
                handleShapeChange(lastSelected);
            if (opened) setOpened(false);
        };

        return (
            <div className='relative flex items-center' ref={ref}>
                <BtnWithTooltip
                    type='tool'
                    icon={icon}
                    onClick={handleBtnClick}
                    onDoubleClick={() => setOpened(true)}
                    tooltipText='Фигуры (U)'
                    tooltipPlace='right'
                    isPushed={isActive}
                    disabledTip={opened}
                    uniqueId='toolBtnShape'
                    hotKeys={HOTKEYS.shape}
                />

                <AnimatePresence>
                    {opened && (
                        <motion.div
                            className={'absolute top-0 left-14 z-selection-shape flex flex-col gap-4 bg-tertiary shadow-card py-2 px-4'}
                            variants={EntryAnimation}
                            initial='from'
                            animate='to'
                            exit='from'
                        >
                            <ShapeSelector
                                handleShapeChange={handleShapeChange}
                                selected={lastSelected}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
;

export default ShapeBtn;
