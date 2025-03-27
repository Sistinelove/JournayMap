import {useAppContext} from '@/context/useContext';

import {ActionsDropdown} from '@/components/ListAction/ActionDropdown';
import {useMemo} from 'react';
import {Attraction} from '@/types/AttractionTypes';
import {columns} from '@/columns';
import {TableColumnProps} from '@/types/types';

export const useTableColumns = ({handleDeleteAttachment, handleEditSuccess}: TableColumnProps) => {
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
