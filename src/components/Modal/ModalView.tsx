import {Button, Modal, Text as UIText} from '@gravity-ui/uikit';

import block from 'bem-cn-lite';
import {EditModalProps} from '@/types/types';

const b = block('actions-dropdown');

export const ViewModal = ({open, onOpenChange, item}: EditModalProps) => (
    <Modal open={open}>
        <div className={b('modal-content-view')}>
            <UIText variant="header-2">Просмотр карточки</UIText>
            <div className={b('modal-body-view')}>
                <UIText>Название: {item.name}</UIText>
                <UIText>Описание: {item.description}</UIText>
                <UIText>Рейтинг: {item.rating}</UIText>
                <UIText>Фото: {item.photo}</UIText>
            </div>
            <Button view="normal" onClick={() => onOpenChange(false)}>
                Закрыть
            </Button>
        </div>
    </Modal>
);
