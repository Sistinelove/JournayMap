import {BarsDescendingAlignRight} from '@gravity-ui/icons';
import {Button, DropdownMenu, Modal} from '@gravity-ui/uikit';
import './ActionDropdown.scss';
import block from 'bem-cn-lite';
import {useAppContext} from '@/context/useContext';
import {Attraction} from '@/types/AttractionTypes';

const b = block('actions-dropdown');

interface ActionsDropdownProps {
    item: Attraction;
    onDelete: (id: number) => void;
}

export const ActionsDropdown = ({item, onDelete}: ActionsDropdownProps) => {
    const {isAdmin} = useAppContext();

    const handleDelete = () => {
        onDelete(item.id);
    };

    return (
        <div className={b()}>
            {isAdmin && (
                <DropdownMenu
                    renderSwitcher={(props) => (
                        <Button {...props} view="flat" className={b('main-button')}>
                            <BarsDescendingAlignRight />
                        </Button>
                    )}
                    items={[
                        {
                            text: 'Просмотр',
                            action: () => <Modal />,
                            className: b('item1'),
                        },
                        {
                            text: 'Редактировать',
                            action: () => console.log('Редактировать'),
                            className: b('item2'),
                        },
                        {
                            text: 'Удалить',
                            action: handleDelete,
                            className: b('item3'),
                            theme: 'danger',
                        },
                    ]}
                />
            )}
        </div>
    );
};
