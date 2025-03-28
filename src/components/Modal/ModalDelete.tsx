import {Button, Modal, Text as UIText} from '@gravity-ui/uikit';

import block from 'bem-cn-lite';
import {CustomDeleteProps} from '@/types/types';

const b = block('actions-dropdown');

export const DeleteModal = ({
    open,
    onOpenChange,
    onConfirm,
    item,
}: CustomDeleteProps & {onConfirm: () => void}) => (
    <Modal open={open}>
        <div className={b('modal-content-delete')}>
            <UIText variant="header-2">Подтверждение удаления</UIText>
            <UIText>Вы уверены, что хотите удалить "{item.name}"?</UIText>
            <div className={b('modal-actions-delete')}>
                <Button
                    view="normal"
                    onClick={() => onOpenChange(false)}
                    className={b('modal-cancel-delete')}
                >
                    Отменить
                </Button>
                <Button view="outlined-danger" onClick={onConfirm} className={b('modal-confirm')}>
                    Удалить
                </Button>
            </div>
        </div>
    </Modal>
);
