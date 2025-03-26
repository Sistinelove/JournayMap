import {Button, Modal, Text as UIText} from '@gravity-ui/uikit';
import {CustomModalProps} from '@/types/types';
import block from 'bem-cn-lite';

const b = block('actions-dropdown');

export const DeleteModal = ({
    open,
    onOpenChange,
    onConfirm,
    item,
}: CustomModalProps & {onConfirm: () => void}) => (
    <Modal open={open}>
        <div className={b('modal-content-delete')}>
            <UIText variant="header-2">Подтверждение удаления</UIText>
            <UIText>Вы уверены, что хотите удалить "{item.name}"?</UIText>
            <div className={b('modal-actions-delete')}>
                <Button
                    view="normal"
                    onClick={() => onOpenChange}
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
