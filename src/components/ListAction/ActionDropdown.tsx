import {BarsDescendingAlignRight} from '@gravity-ui/icons';
import {Button, DropdownMenu, useToaster} from '@gravity-ui/uikit';
import './ActionDropdown.scss';
import block from 'bem-cn-lite';
import {useAppContext} from '@/context/useContext';
import {useState} from 'react';
import {ViewModal} from '@/components/Modal/ModalView';
import {EditModal} from '@/components/Modal/ModalEdit';
import {DeleteModal} from '@/components/Modal/ModalDelete';
import {ActionsDropdownProps, UpdateAttraction} from '@/types/types';
import {editAttraction} from '@/controllers/AttractionController';

const b = block('actions-dropdown');

export const ActionsDropdown = ({
    item,
    onDelete,
    onEditSuccess,
    onViewSuccess,
}: ActionsDropdownProps) => {
    const {isAdmin} = useAppContext();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const {add} = useToaster();

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

    const handleConfirmEdit = async (updateAttraction: UpdateAttraction) => {
        try {
            await editAttraction(updateAttraction);
            onEditSuccess();
            setIsEditModalOpen(false);
        } catch (error) {
            add({
                name: 'edit-error',
                title: 'Ошибка',
                content: 'Ошибка редактирования',
                theme: 'danger',
                autoHiding: 3000,
            });
        }
    };

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
                    <ViewModal
                        open={isViewModalOpen}
                        onOpenChange={handleCloseViewModal}
                        item={item}
                        onViewSuccess={onViewSuccess}
                    />
                    <DeleteModal
                        open={isDeleteModalOpen}
                        onOpenChange={handleCloseDeleteModal}
                        onConfirm={handleConfirmDelete}
                        item={item}
                    />
                    <EditModal
                        open={isEditModalOpen}
                        onOpenChange={handleCloseEditModal}
                        onConfirm={handleConfirmEdit}
                        item={item}
                    />
                </>
            )}
        </div>
    );
};
