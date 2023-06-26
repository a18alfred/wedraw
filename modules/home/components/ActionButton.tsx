import React from 'react';

export interface Props extends React.ComponentPropsWithoutRef<'button'> {
    buttonText: string;
}

const ActionButton = ({
                          buttonText,
                          ...rest
                      }: Props): JSX.Element => {
    return (
        <button
            {...rest}
            className='w-full green-pink-gradient p-[1px] rounded-[20px] cursor-pointer'
        >
            <div
                className='
                bg-tertiary
                rounded-[20px]
                py-5
                px-12
                min-h-[100px]
                flex justify-evenly
                items-center
                flex-col
                hover:opacity-90 transition
                '
            >
                <h3 className='text-white text-[20px] font-bold text-center'>
                    {buttonText}
                </h3>
            </div>
        </button>
    );
};

export default ActionButton;