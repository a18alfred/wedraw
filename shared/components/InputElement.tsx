import React, { forwardRef } from 'react';
import { styles } from '@/shared/styles/custom';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const InputElement: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(({
                                                                                         label,
                                                                                         value,
                                                                                         onChange,
                                                                                         error,
                                                                                         ...rest
                                                                                     }, ref) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
    };

    return (
        <div className='relative w-full'>
            <input
                ref={ref}
                value={value}
                placeholder={label}
                onChange={handleInputChange}
                className={`${styles.inputStyle} ${
                    error ? 'border-red-500 border-2' : 'border-gray-100 border-2'
                }`}
                {...rest}
            />
            {error && (
                <p className='text-left text-red-500 text-base mt-1'>{`ⓘ ${error}`}</p>
            )}
        </div>
    );
});

InputElement.displayName = 'InputElement';

export default InputElement;