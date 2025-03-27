import {Attraction, CreateAttraction, UpdateAttraction} from '@/types/types';

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

export const editAttraction = async (updateAttraction: UpdateAttraction): Promise<void> => {
    const response = await fetch(`http://localhost:3001/attractions/${updateAttraction.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateAttraction),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
};

export const getAttachmentsCount = async (): Promise<number> => {
    const response = await fetch(`http://localhost:3001/attractions`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.length;
};

export const createAttraction = async (newAttraction: CreateAttraction): Promise<Attraction> => {
    const response = await fetch(`http://localhost:3001/attractions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...newAttraction,
            dateAdded: new Date().toISOString(),
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};
