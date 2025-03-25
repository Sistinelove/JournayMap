import {BarsDescendingAlignRight} from '@gravity-ui/icons';
import {Button, DropdownMenu, Modal, TextInput, Text as UIText} from '@gravity-ui/uikit';
import './ActionDropdown.scss';
import block from 'bem-cn-lite';
import {useAppContext} from '@/context/useContext';
import {Attraction} from '@/types/AttractionTypes';
import {useState} from 'react';

const b = block('actions-dropdown');

interface ActionsDropdownProps {
    item: Attraction;
    onDelete: (id: number) => void;
}

export const ActionsDropdown = ({item, onDelete}: ActionsDropdownProps) => {
    const {isAdmin} = useAppContext();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDeleteClick = () => setIsDeleteModalOpen(true);
    const handleConfirmDelete = () => {
        onDelete(item.id);
        setIsDeleteModalOpen(false);
    };
    const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

    const handleViewClick = () => setIsViewModalOpen(true);
    const handleCloseViewModal = () => setIsViewModalOpen(false);

    const handleEditClick = () => setIsEditModalOpen(true);
    const handleCloseEditModal = () => setIsEditModalOpen(false);

    const handleConfirmEdit = () => setIsEditModalOpen(true);

    return (
        <div className={b()}>
            {isAdmin && (
                <>
                    <DropdownMenu
                        renderSwitcher={(props) => (
                            <Button {...props} view="flat" className={b('main-button')}>
                                <BarsDescendingAlignRight />
                            </Button>
                        )}
                        items={[
                            {
                                text: 'Просмотр',
                                action: handleViewClick,
                                className: b('item1'),
                            },
                            {
                                text: 'Редактировать',
                                action: handleEditClick,
                                className: b('item2'),
                            },
                            {
                                text: 'Удалить',
                                action: handleDeleteClick,
                                className: b('item3'),
                                theme: 'danger',
                            },
                        ]}
                    />
                    <Modal open={isViewModalOpen}>
                        <div className={b('modal-content-view')}>
                            <UIText variant="header-2">Просмотр карточки</UIText>
                            <div className={b('modal-body-view')}>
                                <UIText>Название: {item.name}</UIText>
                                <UIText>Описание: {item.description}</UIText>
                                <UIText>Рейтинг: {item.rating}</UIText>
                                <UIText>Фото: {item.photo}</UIText>
                            </div>
                            <Button view="normal" onClick={handleCloseViewModal}>
                                Закрыть
                            </Button>
                        </div>
                    </Modal>
                    <Modal open={isDeleteModalOpen}>
                        <div className={b('modal-content-delete')}>
                            <UIText variant="header-2">Подтверждение удаления</UIText>
                            <UIText>Вы уверены, что хотите удалить "{item.name}"?</UIText>
                            <div className={b('modal-actions-delete')}>
                                <Button
                                    view="normal"
                                    onClick={handleCloseDeleteModal}
                                    className={b('modal-cancel-delete')}
                                >
                                    Отменить
                                </Button>
                                <Button
                                    view="action"
                                    onClick={handleConfirmDelete}
                                    className={b('modal-confirm')}
                                >
                                    Удалить
                                </Button>
                            </div>
                        </div>
                    </Modal>
                    <Modal open={isEditModalOpen}>
                        <div className={b('modal-content-edit')}>
                            <UIText variant="header-2">Редактирование карточки</UIText>
                            <div className={b('modal-body-edit')}>
                                <TextInput value={item.name} label="Название:" />
                                <TextInput value={item.description} label="Описание:" />
                                <TextInput value={String(item.rating)} label="Рейтинг:" />
                                <TextInput value={item.photo} label="Фото:" />
                            </div>
                            <div className={b('modal-actions-edit')}>
                                <Button view="normal" onClick={handleCloseEditModal}>
                                    Закрыть
                                </Button>
                                <Button view="action" onClick={handleConfirmEdit}>
                                    Сохранить изменения
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
};
