import {BarsDescendingAlignRight} from '@gravity-ui/icons';
import {Button, DropdownMenu} from '@gravity-ui/uikit';
import './ActionDropdown.scss';
import block from 'bem-cn-lite';
import {useAppContext} from '@/context/useContext';
import {useState} from 'react';
import {ViewModal} from '@/components/Modal/ModalView';
import {EditModal} from '@/components/Modal/ModalEdit';
import {DeleteModal} from '@/components/Modal/ModalDelete';
import {Attraction} from '@/types/types';

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
                    <ViewModal
                        open={isViewModalOpen}
                        onOpenChange={handleCloseViewModal}
                        item={item}
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
