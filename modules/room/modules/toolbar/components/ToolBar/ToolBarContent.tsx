import React, { memo } from 'react';
import HistoryBtn from '@/modules/room/modules/toolbar/buttons/HistoryBtn';
import ShapeBtn from '@/modules/room/modules/toolbar/buttons/ShapeBtn';
import ColorBtn from '@/modules/room/modules/toolbar/buttons/ColorBtn';
import WidthBtn from '@/modules/room/modules/toolbar/buttons/WidthBtn';
import EraserBtn from '@/modules/room/modules/toolbar/buttons/EraserBtn';
import ImageBtn from '@/modules/room/modules/toolbar/buttons/ImageBtn';
import SaveBtn from '@/modules/room/modules/toolbar/buttons/SaveBtn';
import ExitBt from '@/modules/room/modules/toolbar/buttons/ExitBtn';
import ShareBtn from '@/modules/room/modules/toolbar/buttons/ShareBtn';
import BackgroundBtn from '@/modules/room/modules/toolbar/buttons/BackgroundBtn';
import SelectionBtn from '@/modules/room/modules/toolbar/buttons/SelectionBtn';
import BrushBtn from '@/modules/room/modules/toolbar/buttons/BrushBtn';
import ScaleBtn from '@/modules/room/modules/toolbar/buttons/ScaleBtn';

const ToolBarContent = memo(() => {
    return (
        <>
            <HistoryBtn />

            <div className='h-[1px] w-full bg-white opacity-30' />

            <SelectionBtn />
            <BrushBtn />
            <EraserBtn />
            <ShapeBtn />

            <div className='h-[1px] w-full bg-white opacity-30' />

            <WidthBtn />
            <ColorBtn />
            <ScaleBtn />

            <div className='h-[1px] w-full bg-white opacity-30' />

            <ImageBtn />
            <BackgroundBtn />
            <ShareBtn />
            <SaveBtn />

            <ExitBt />
        </>
    );
});

ToolBarContent.displayName = 'ToolBarContent';
export default ToolBarContent;
