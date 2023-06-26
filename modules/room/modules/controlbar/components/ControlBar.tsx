import React from 'react';
import { BsArrowsMove } from 'react-icons/bs';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { BiMapPin } from 'react-icons/bi';
import { TbTools } from 'react-icons/tb';
import { useControl, useControlState } from '@/shared/state/control';
import UserList from '@/modules/room/modules/controlbar/components/UserList';
import BtnWithTooltip from '@/shared/components/BtnWithTooltip';
import { isMobile } from 'react-device-detect';
import { isInstalled } from '@/shared/utils/isInstalled';

const ControlBar = () => {
    const { dragging, touchDragging, isToolsOpen, isMapOpen, isChatOpen } = useControlState();
    const { toggleDragging, toggleMap, toggleTools, toggleChat } = useControl();
    const bottom = isInstalled() ? 'bottom-8' : 'bottom-2';

    return (
        <div
            className={`absolute right-2 ${bottom} sm:right-4 sm:bottom-4 z-control flex flex-col-reverse items-center gap-2 sm:gap-4`}>
            {
                !isMobile &&
                <BtnWithTooltip
                    type='control'
                    icon={<BsArrowsMove />}
                    onClick={toggleDragging}
                    isPushed={dragging || touchDragging}
                    tooltipText='Перемещение'
                    tooltipPlace='left'
                    uniqueId='ControlBtnDrag'
                />
            }

            <BtnWithTooltip
                type='control'
                icon={<IoChatbubbleEllipsesOutline />}
                onClick={toggleChat}
                isPushed={isChatOpen}
                tooltipText='Чат'
                tooltipPlace='left'
                uniqueId='ControlBtnChat'
            />
            <BtnWithTooltip
                type='control'
                icon={<BiMapPin />}
                onClick={toggleMap}
                isPushed={isMapOpen}
                tooltipText='Карта'
                tooltipPlace='left'
                uniqueId='ControlBtnMap'
            />
            <BtnWithTooltip
                type='control'
                icon={<TbTools />}
                onClick={toggleTools}
                isPushed={isToolsOpen}
                tooltipText='Инструменты'
                tooltipPlace='left'
                uniqueId='ControlBtnTools'
            />
            <UserList />
        </div>
    );
};

export default ControlBar;
