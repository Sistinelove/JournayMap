import {useEffect, useState} from 'react';
import {Pagination, Switch, Table} from '@gravity-ui/uikit';
import './MainWrapper.scss';

import block from 'bem-cn-lite';
import {useAppContext} from '@/context/useContext';
import {useTableColumns} from '@/TableColumns';
import {deleteAttraction, getAttractions} from '@/controllers/AttractionController';
import {Attraction} from '@/types/types';

const PAGE_SIZE = 20;
const b = block('wrapper');

export type AppProps = {
    title?: string;
    children?: React.ReactNode;
};

export const MainWrapper: React.FC<AppProps> = ({title}) => {
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const {isAdmin, toggleAdmin} = useAppContext();

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
            console.error('Ошибка удаления:', error);
        }
    };

    const tableColumns = useTableColumns({handleDeleteAttachment});

    return (
        <div className={b()}>
            <div className={b('header')}>
                <h1 className={b('title')}>{title}</h1>
                <Switch checked={isAdmin} onChange={toggleAdmin}>
                    Режим администратора
                </Switch>
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
        </div>
    );
};
