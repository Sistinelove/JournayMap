import React, {useState} from 'react';
import {Button, Modal, TextInput, Text as UIText, useToaster} from '@gravity-ui/uikit';
import {CreateAttraction, CreateModalProps} from '@/types/types';
import block from 'bem-cn-lite';

const b = block('create-modal');

export const CreateModal: React.FC<CreateModalProps> = ({open, onOpenChange, onConfirm}) => {
    const [newItem, setNewItem] = useState<CreateAttraction>({
        name: '',
        description: '',
        rating: 0,
        photo: '',
        location: '',
        coordinates: {lat: 0, lng: 0},
        status: 'В планах',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const {add} = useToaster();

    const handleInputChange = (field: string, value: string) => {
        setNewItem((prev) => ({
            ...prev,
            [field]: field === 'rating' ? Number(value) : value,
        }));
        setErrors((prev) => ({...prev, [field]: ''}));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!newItem.name.trim()) newErrors.name = 'Название обязательно';
        if (newItem.rating < 0 || newItem.rating > 5)
            newErrors.rating = 'Рейтинг должен быть от 0 до 5';
        return newErrors;
    };

    const handleCreate = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsLoading(true);
        try {
            await onConfirm(newItem);
            onOpenChange(false);
            add({
                name: 'create-success',
                title: 'Успех',
                content: 'Достопримечательность успешно создана',
                theme: 'success',
                autoHiding: 3000,
            });
            setNewItem({
                name: '',
                description: '',
                rating: 0,
                photo: '',
                location: '',
                coordinates: {lat: 0, lng: 0},
                status: 'В планах',
            });
        } catch (error) {
            add({
                name: 'create-error',
                title: 'Ошибка',
                content: 'Ошибка при создании',
                theme: 'danger',
                autoHiding: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal open={open} onOpenChange={onOpenChange}>
            <div className={b()}>
                <UIText variant="header-2">Создание новой достопримечательности</UIText>
                <div className={b('body')}>
                    <TextInput
                        value={newItem.name}
                        label="Название:"
                        error={errors.name}
                        validationState={errors.name ? 'invalid' : undefined}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <TextInput
                        value={newItem.description}
                        label="Описание:"
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    <TextInput
                        value={String(newItem.rating)}
                        type="number"
                        label="Рейтинг:"
                        error={errors.rating}
                        validationState={errors.rating ? 'invalid' : undefined}
                        onChange={(e) => handleInputChange('rating', e.target.value)}
                    />
                    <TextInput
                        value={newItem.photo}
                        label="Ссылка на фото:"
                        onChange={(e) => handleInputChange('photo', e.target.value)}
                    />
                    <TextInput
                        value={newItem.location}
                        label="Местоположение:"
                        onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                </div>
                <div className={b('footer')}>
                    <Button view="outlined" onClick={() => onOpenChange(false)}>
                        Отмена
                    </Button>
                    <Button
                        view="action"
                        onClick={handleCreate}
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        Создать
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
