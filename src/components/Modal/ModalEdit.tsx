import React, {useEffect, useState} from 'react';
import {Button, Modal, TextInput, Text as UIText, useToaster} from '@gravity-ui/uikit';
import {EditModalProps, UpdateAttraction} from '@/types/types';
import block from 'bem-cn-lite';

const b = block('actions-dropdown');

export const EditModal = ({open, onOpenChange, onConfirm, item}: EditModalProps) => {
    const [editedItem, setEditedItem] = useState<UpdateAttraction>(item);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const {add} = useToaster();

    useEffect(() => {
        setEditedItem(item);
    }, [item]);

    const handleInputChange = (field: string, value: string) => {
        setEditedItem((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => ({...prev, [field]: ''}));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!editedItem.name?.trim()) newErrors.name = 'Название обязательно';
        if (editedItem.rating < 0 || editedItem.rating > 5) newErrors.rating = 'Рейтинг 0-5';
        return newErrors;
    };

    const handleConfirmEdit = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsLoading(true);
        try {
            await onConfirm(editedItem);
            onOpenChange(false);
            add({
                name: 'edit-success',
                title: 'Успех',
                content: 'Изменения успешно сохранены',
                theme: 'success',
                autoHiding: 3000,
            });
        } catch (error) {
            add({
                name: 'edit-error',
                title: 'Ошибка',
                content: 'Не удалось сохранить изменения',
                theme: 'danger',
                autoHiding: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal open={open} onOpenChange={() => onOpenChange(false)}>
            <div className={b('modal-content-edit')}>
                <UIText variant="header-2">Редактирование карточки</UIText>
                <div className={b('modal-body-edit')}>
                    <TextInput
                        value={editedItem.name}
                        label="Название:"
                        error={errors.name}
                        validationState={errors.name ? 'invalid' : undefined}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <TextInput
                        value={editedItem.description}
                        label="Описание:"
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    <TextInput
                        value={String(editedItem.rating)}
                        type="number"
                        label="Рейтинг:"
                        error={errors.rating}
                        validationState={errors.rating ? 'invalid' : undefined}
                        onChange={(e) => handleInputChange('rating', e.target.value)}
                    />
                    <TextInput
                        value={editedItem.photo}
                        label="Фото:"
                        onChange={(e) => handleInputChange('photo', e.target.value)}
                    />
                </div>
                <div className={b('modal-actions-edit')}>
                    <Button view="outlined" onClick={() => onOpenChange(false)}>
                        Отмена
                    </Button>
                    <Button
                        view="action"
                        onClick={handleConfirmEdit}
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
