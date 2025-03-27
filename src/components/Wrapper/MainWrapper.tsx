import {useEffect, useState} from 'react';
import {Button, Pagination, Switch, Table, useToaster} from '@gravity-ui/uikit';
import './MainWrapper.scss';

import block from 'bem-cn-lite';
import {useAppContext} from '@/context/useContext';
import {useTableColumns} from '@/TableColumns';
import {
    createAttraction,
    deleteAttraction,
    getAttractions,
} from '@/controllers/AttractionController';
import {AppProps, Attraction, CreateAttraction} from '@/types/types';
import {CreateModal} from '@/components/Modal/ModalCreate';

const PAGE_SIZE = 20;
const b = block('wrapper');

export const MainWrapper: React.FC<AppProps> = ({title}) => {
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const {isAdmin, toggleAdmin, countAttachments} = useAppContext();
    const {add} = useToaster();

    useEffect(() => {
        fetchAttractions(currentPage);
    }, [currentPage]);

    const fetchAttractions = async (page: number) => {
        try {
            const {data, total} = await getAttractions(page, PAGE_SIZE);
            setAttractions(data);
            setTotalItems(total);
        } catch (error) {
            console.error('Ошибка получения данных:', error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteAttachment = async (id: number) => {
        try {
            await deleteAttraction(id);
            const {data, total} = await getAttractions(currentPage, PAGE_SIZE);
            setAttractions(data);
            setTotalItems(total);
        } catch (error) {
            add({
                name: 'edit-error',
                title: 'Ошибка',
                content: 'Ошибка удаления',
                theme: 'danger',
                autoHiding: 3000,
            });
        }
    };

    const handleCreateSuccess = async (newAttraction: CreateAttraction) => {
        try {
            await createAttraction(newAttraction);
            await fetchAttractions(currentPage);
            setIsCreateModalOpen(false);
        } catch (error) {
            add({
                name: 'create-error',
                title: 'Ошибка',
                content: 'Ошибка создания',
                theme: 'danger',
                autoHiding: 3000,
            });
        }
    };

    const handleEditSuccess = async () => {
        try {
            const {data, total} = await getAttractions(currentPage, PAGE_SIZE);
            setAttractions(data);
            setTotalItems(total);
        } catch (error) {
            add({
                name: 'edit-error',
                title: 'Ошибка',
                content: 'Ошибка обновления данных',
                theme: 'danger',
                autoHiding: 3000,
            });
        }
    };
    const tableColumns = useTableColumns({handleDeleteAttachment, handleEditSuccess});

    return (
        <div className={b()}>
            <div className={b('header')}>
                <h1 className={b('title')}>{title}</h1>

                <h3>Счетчик достопримечательностей: {countAttachments}</h3>
                <div className={b('actions')}>
                    <Button onClick={() => setIsCreateModalOpen(true)}>Создать заявку</Button>
                    <Switch checked={isAdmin} onChange={toggleAdmin}>
                        Режим администратора
                    </Switch>
                </div>
            </div>
            <div className={b('attractions-list')}>
                <Table data={attractions} columns={tableColumns} />
                {totalItems > PAGE_SIZE && (
                    <Pagination
                        page={currentPage}
                        pageSize={PAGE_SIZE}
                        total={totalItems}
                        onUpdate={handlePageChange}
                    />
                )}
            </div>
            <CreateModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onConfirm={handleCreateSuccess}
            />
        </div>
    );
};
