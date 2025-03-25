import {Attraction} from '@/types/AttractionTypes';

interface TableColumns {
    id: string;
    name: string;
    template?: (item: Attraction) => JSX.Element | string;
    sticky?: 'left' | 'right';
}

export const columns: TableColumns[] = [
    {
        id: 'id',
        name: 'ID',
    },
    {
        id: 'name',
        name: 'Название',
    },
    {
        id: 'description',
        name: 'Описание',
    },
    {
        id: 'dateAdded',
        name: 'Дата добавления',
        template: (item: Attraction) => new Date(item.dateAdded).toLocaleDateString(),
    },
    {
        id: 'rating',
        name: 'Рейтинг',
    },
    {
        id: 'photo',
        name: 'Фото',
        template: (item: Attraction) => (
            <img
                alt={item.name}
                src={item.photo}
                style={{width: '150px', height: '150px', objectFit: 'cover'}}
            />
        ),
    },
    {
        id: 'location',
        name: 'Местоположение',
    },
    {
        id: 'coordinates',
        name: 'Координаты',
        template: (item: Attraction) => `${item.coordinates.lat}, ${item.coordinates.lng}`,
    },
    {
        id: 'mapLink',
        name: 'Ссылка на достопримечательность',
        template: (item: Attraction) =>
            `https://www.google.com/maps/search/?api=1&query=${item.coordinates.lat},${item.coordinates.lng}`,
    },
    {
        id: 'status',
        name: 'Статус',
    },
];
