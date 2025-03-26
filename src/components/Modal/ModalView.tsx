import {Button, Modal, Text as UIText} from '@gravity-ui/uikit';
import {CustomModalProps} from '@/types/types';
import block from 'bem-cn-lite';

const b = block('actions-dropdown');

export const ViewModal = ({open, onOpenChange, item}: CustomModalProps) => (
    <Modal open={open}>
        <div className={b('modal-content-view')}>
            <UIText variant="header-2">Просмотр карточки</UIText>
            <div className={b('modal-body-view')}>
                <UIText>Название: {item.name}</UIText>
                <UIText>Описание: {item.description}</UIText>
                <UIText>Рейтинг: {item.rating}</UIText>
                <UIText>Фото: {item.photo}</UIText>
            </div>
            <Button view="normal" onClick={() => onOpenChange}>
                Закрыть
            </Button>
        </div>
    </Modal>
);
