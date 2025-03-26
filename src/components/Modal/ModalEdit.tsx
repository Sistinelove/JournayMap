import {Button, Modal, TextInput, Text as UIText} from '@gravity-ui/uikit';
import {CustomModalProps} from '@/types/types';
import block from 'bem-cn-lite';

const b = block('actions-dropdown');

export const EditModal = ({
    open,
    onOpenChange,
    onConfirm,
    item,
}: CustomModalProps & {onConfirm: () => void}) => (
    <Modal open={open}>
        <div className={b('modal-content-edit')}>
            <UIText variant="header-2">Редактирование карточки</UIText>
            <div className={b('modal-body-edit')}>
                <TextInput value={item.name} label="Название:" />
                <TextInput value={item.description} label="Описание:" />
                <TextInput value={String(item.rating)} label="Рейтинг:" />
                <TextInput value={item.photo} label="Фото:" />
            </div>
            <div className={b('modal-actions-edit')}>
                <Button view="normal" onClick={() => onOpenChange}>
                    Закрыть
                </Button>
                <Button view="outlined-success" onClick={onConfirm}>
                    Сохранить изменения
                </Button>
            </div>
        </div>
    </Modal>
);
