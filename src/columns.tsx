import {Attraction} from '@/types/types';
import {Button} from '@gravity-ui/uikit';

interface TableColumns {
    id: string;
    name: string;
    template?: (item: Attraction) => JSX.Element | string;
    sticky?: 'start' | 'end';
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
        template: (item: Attraction) => (
            <Button href={getLinkMap(item.coordinates, 'google')}>Ссылка на google map</Button>
        ),
    },
    {
        id: 'status',
        name: 'Статус',
    },
];

const getLinkMap = (
    coordinates: Attraction['coordinates'],
    mapService: 'google' | 'yandex' = 'google',
): string => {
    if (mapService === 'google') {
        return `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
    } else if (mapService === 'yandex') {
        return `https://yandex.ru/maps/?pt=${coordinates.lng},${coordinates.lat}&z=12&l=map`;
    }
    return '';
};
