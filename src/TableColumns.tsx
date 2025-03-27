import {useAppContext} from '@/context/useContext';
import {columns} from '../const';
import {ActionsDropdown} from '@/components/ListAction/ActionDropdown';
import {useMemo} from 'react';
import {Attraction} from '@/types/AttractionTypes';

interface TableColumn {
    handleDeleteAttachment: (id: number) => void;
    handleEditSuccess: () => void;
}

export const useTableColumns = ({handleDeleteAttachment, handleEditSuccess}: TableColumn) => {
    const {isAdmin} = useAppContext();

    return useMemo(() => {
        const modifiedColumns = [...columns];

        if (!isAdmin) {
            return modifiedColumns;
        }
        modifiedColumns.push({
            id: 'actions',
            name: 'Действия',
            sticky: 'right',
            template: (item: Attraction) => (
                <ActionsDropdown
                    item={item}
                    onDelete={handleDeleteAttachment}
                    onEditSuccess={handleEditSuccess}
                />
            ),
        });

        return modifiedColumns;
    }, [isAdmin, handleEditSuccess]);
};
