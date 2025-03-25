import {Attraction} from '@/types/AttractionTypes';

export const getAttractions = async (
    page: number,
    limit: number,
): Promise<{data: Attraction[]; total: number}> => {
    const response = await fetch(`http://localhost:3001/attractions?_page=${page}&_limit=${limit}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const total = Number(response.headers.get('X-Total-Count')) || 0;
    const data = await response.json();

    return {data, total};
};

export const deleteAttraction = async (id: number): Promise<void> => {
    const response = await fetch(`http://localhost:3001/attractions/${id}`, {method: 'DELETE'});

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
};
