import React, { ReactNode, useCallback, useState } from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { FiCopy } from 'react-icons/fi';
import { BsCheckLg } from 'react-icons/bs';
import { styles } from '@/shared/styles/custom';
import { isMobile } from 'react-device-detect';
import { Tooltip } from 'react-tooltip';

interface CopyTextProps {
    text: string;
    uniqueId: string;
}

const CopyText = ({ text, uniqueId }: CopyTextProps) => {
    const clipboard = useClipboard();
    const [copied, setCopied] = useState(false);

    const onCopy = useCallback(() => {
            clipboard.copy(text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        },
        [clipboard.copy, text],
    );

    return (
        <div className={styles.highlightedText}>
                <span className={'overflow-hidden whitespace-nowrap text-ellipsis select-text max-w-[300px]'}>
                    {text}
                </span>
            <button
                id={uniqueId}
                className={`
                rounded-[50%]
                h-9
                w-9
                flex
                items-center
                justify-center
                text-xl
                bg-gray-100
                text-black
                `}
                onClick={onCopy}
            >
                {
                    copied ? <BsCheckLg />
                        : <FiCopy />
                }
            </button>
            {!isMobile && <Tooltip
                style={{ opacity: 1 }}
                anchorSelect={`#${uniqueId}`}
                content={'Копировать'}
                place='right'
            />}
        </div>
    );
};

export default CopyText;
