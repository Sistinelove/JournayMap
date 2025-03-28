import React, {useEffect, useState} from 'react';
import {Button, Modal, Text as UIText, useToaster} from '@gravity-ui/uikit';
import {ViewModalProps} from '@/types/types';
import {editAttraction} from '@/controllers/AttractionController';
import block from 'bem-cn-lite';

const b = block('actions-dropdown');

export const ViewModal: React.FC<ViewModalProps> = ({open, onOpenChange, item, onViewSuccess}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {add} = useToaster();

    useEffect(() => {
        if (open) {
            handleStatusChange();
        }
    }, [open]);

    const handleStatusChange = async () => {
        setIsLoading(true);
        try {
            const updatedItem = {...item, status: 'Просмотрено'};
            await editAttraction(updatedItem);

            add({
                name: 'status-update-success',
                title: 'Успех',
                content: 'Статус успешно обновлен',
                theme: 'success',
                autoHiding: 3000,
            });

            onViewSuccess();
        } catch (error) {
            add({
                name: 'status-update-error',
                title: 'Ошибка',
                content: 'Не удалось обновить статус',
                theme: 'danger',
                autoHiding: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal open={open} onOpenChange={() => onOpenChange(false)}>
            <div className={b('modal-content-view')}>
                <UIText variant="header-2">Просмотр карточки</UIText>
                <div className={b('modal-body-view')}>
                    <UIText>Название: {item.name}</UIText>
                    <UIText>Описание: {item.description}</UIText>
                    <UIText>Рейтинг: {item.rating}</UIText>
                    <UIText>Фото: {item.photo}</UIText>
                </div>
                <Button view="normal" onClick={() => onOpenChange(false)} disabled={isLoading}>
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};
