import React, { useState } from 'react';
import InputElement from '@/shared/components/InputElement';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Loader from '@/shared/components/Loader';

const nameSchema = z.object({
    name: z.string().min(1, 'Введите имя').max(50),
});
type NameType = z.infer<typeof nameSchema>;

interface NameFormProps {
    onFormSubmit: (username: string) => void;
    submitText: string;
}

const NameForm = ({ onFormSubmit, submitText }: NameFormProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm<NameType>({
        resolver: zodResolver(nameSchema),
    });

    const onSubmit = (data: NameType) => {
        setIsLoading(true);
        onFormSubmit(data.name);
    };

    const btnStyle = `btn ${isLoading} ? pointer-events-none: pointer-events-auto mt-2`;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={'w-full flex flex-col gap-4'}>
                <h2 className='text-lg font-bold text-primary'>
                    Введите ваше имя
                </h2>
                <InputElement
                    id={'name'}
                    {...register('name')}
                    label='Имя'
                    error={errors.name?.message}
                    maxLength={50}
                />
                <button type={'submit'} className={btnStyle}>
                    {
                        isLoading
                            ? <Loader />
                            : <span>{submitText}</span>
                    }
                </button>
            </form>
        </>
    );
};

export default NameForm;
