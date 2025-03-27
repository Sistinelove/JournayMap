import {useAppContext} from '@/context/useContext';

import {ActionsDropdown} from '@/components/ListAction/ActionDropdown';
import {useMemo} from 'react';
import {Attraction} from '@/types/AttractionTypes';
import {columns} from '@/columns';

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
            sticky: 'end',
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
