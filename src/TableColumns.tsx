import {useAppContext} from '@/context/useContext';
import {columns} from '../const';
import {ActionsDropdown} from '@/components/ListAction/ActionDropdown';
import {useMemo} from 'react';

export const useTableColumns = () => {
    const {isAdmin} = useAppContext();

    return useMemo(() => {
        const modifiedColumns = [...columns];

        if (isAdmin) {
            modifiedColumns.push({
                id: 'actions',
                name: 'Действия',
                sticky: 'right',
                template: () => <ActionsDropdown />,
            });
        }

        return modifiedColumns;
    }, [isAdmin]);
};
