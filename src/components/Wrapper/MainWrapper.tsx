import React, {useEffect, useState} from 'react';
import {Pagination, Switch, Table} from '@gravity-ui/uikit';
import './MainWrapper.scss';
import {getAttractions} from '@/controllers/getAttractions';
import {Attraction} from '@/types/AttractionTypes';

import block from 'bem-cn-lite';
import {useAppContext} from '@/context/useContext';
import {useTableColumns} from '@/TableColumns';

const PAGE_SIZE = 20;
const b = block('wrapper');
export type AppProps = {
    title?: string;
    children?: React.ReactNode;
};

export const MainWrapper: React.FC<AppProps> = ({title}) => {
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const {isAdmin, toggleAdmin} = useAppContext();

    useEffect(() => {
        fetchAttractions(currentPage);
    }, [currentPage]);

    const fetchAttractions = async (page: number) => {
        const {data, total} = await getAttractions(page, PAGE_SIZE);
        setAttractions(data);
        setTotalPages(Math.ceil(total / PAGE_SIZE));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className={b()}>
                <div className={b('header')}>
                    <h1 className={b('title')}>{title}</h1>
                    <Switch checked={isAdmin} onChange={toggleAdmin}>
                        Режим администратора
                    </Switch>
                </div>
                <div className={b('attractions-list')}>
                    <Table data={attractions} columns={useTableColumns()} />
                    <Pagination
                        page={currentPage}
                        pageSize={totalPages}
                        total={50}
                        onUpdate={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
};
