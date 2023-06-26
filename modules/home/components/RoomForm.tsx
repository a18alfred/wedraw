import React, { useState } from 'react';
import InputElement from '@/shared/components/InputElement';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Loader from '@/shared/components/Loader';

const nameSchema = z.object({
    name: z.string().min(1, 'Введите имя').max(50),
    roomId: z.string().min(4, 'Введите ID комнаты').max(100),
});
type NameType = z.infer<typeof nameSchema>;

interface RoomFormProps {
    onFormSubmit: (roomId: string, username: string) => void;
}

const RoomForm = ({ onFormSubmit }: RoomFormProps) => {
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
        onFormSubmit(data.roomId, data.name);
    };

    const btnStyle = `btn ${isLoading} ? pointer-events-none: pointer-events-auto`;

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} className={'w-full flex flex-col gap-4'}>
                <p className='text-lg font-bold text-primary'>
                    Введите ваше имя
                </p>
                <InputElement
                    id={'name'}
                    {...register('name')}
                    label='Имя'
                    error={errors.name?.message}
                    maxLength={50}
                />

                <p className='text-lg font-bold text-primary'>
                    Введите ID комнаты
                </p>
                <InputElement
                    id={'roomId'}
                    {...register('roomId')}
                    label='ID'
                    error={errors.roomId?.message}
                    maxLength={100}
                />

                <button type={'submit'} className={btnStyle}>
                    {
                        isLoading
                            ? <Loader />
                            : <span>Войти</span>
                    }
                </button>
            </form>
        </>
    );
};

export default RoomForm;
