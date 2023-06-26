import React, { ReactNode, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { isMobile } from 'react-device-detect';
import { styles } from '@/shared/styles/custom';

const LONG_PRESS_TIMEOUT = 500; // adjust as needed
interface ControlBtnProps {
    type: 'control' | 'tool' | 'context';
    icon: ReactNode;
    onClick?: () => void;
    onDoubleClick?: () => void;
    isPushed?: boolean;
    disabledTip?: boolean;
    tooltipText: string;
    tooltipPlace: 'top' | 'right' | 'bottom' | 'left';
    uniqueId: string;
    hotKeys?: string[];
}


const BtnWithTooltip = React.forwardRef<HTMLButtonElement, ControlBtnProps>(({
                                                                                 type,
                                                                                 icon,
                                                                                 onClick,
                                                                                 onDoubleClick,
                                                                                 isPushed,
                                                                                 disabledTip,
                                                                                 tooltipText,
                                                                                 tooltipPlace,
                                                                                 uniqueId,
                                                                                 hotKeys,
                                                                             }, ref) => {

    const btnStyle = styles.tooltipButton[type];

    useEffect(() => {
        if (hotKeys && onClick) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.repeat) return;
                if (hotKeys.includes(event.key) && !event.ctrlKey && !event.altKey) {
                    onClick();
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [hotKeys, onClick]);

    function handleMouseDown() {
        if (onClick) onClick();
        if (onDoubleClick) {
            const timeoutId = setTimeout(onDoubleClick, LONG_PRESS_TIMEOUT);

            function handleMouseUp() {
                clearTimeout(timeoutId);
                window.removeEventListener('mouseup', handleMouseUp);
                window.removeEventListener('touchend', handleMouseUp);
            }

            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleMouseUp);
        }
    }

    return (
        <>
            <button
                ref={ref}
                id={uniqueId}
                className={`
                ${btnStyle}
                ${isPushed ? 'text-violet-500' : 'text-white'}`}
                onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onDoubleClick) onDoubleClick();
                }}
                onClick={() => {
                    if (!onDoubleClick && onClick) onClick();
                }}
                onDoubleClick={onDoubleClick}
                onMouseDown={() => {
                    if (onDoubleClick) handleMouseDown();
                }}
                onTouchStart={() => {
                    if (onDoubleClick) handleMouseDown();
                }}
            >
                {icon}
            </button>
            {!isMobile && !disabledTip && <Tooltip
                style={{ opacity: 1, zIndex: '45' }}
                anchorSelect={`#${uniqueId}`}
                content={tooltipText}
                place={tooltipPlace}
            />}
        </>
    );
});

BtnWithTooltip.displayName = 'BtnWithTooltip';

export default BtnWithTooltip;