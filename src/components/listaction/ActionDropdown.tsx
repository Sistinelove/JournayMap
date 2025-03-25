import {BarsDescendingAlignRight} from '@gravity-ui/icons';
import {Button, DropdownMenu, Modal} from '@gravity-ui/uikit';
import './ActionDropdown.scss';
import block from 'bem-cn-lite';
import {useAppContext} from '@/context/useContext';

const b = block('actions-dropdown');

export const ActionsDropdown = () => {
    const {isAdmin} = useAppContext();

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
                            action: () => console.log('Удалить'),
                            className: b('item3'),
                            theme: 'danger',
                        },
                    ]}
                />
            )}
        </div>
    );
};
