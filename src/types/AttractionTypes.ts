export interface Attraction {
    id: string;
    name: string;
    description: string;
    rating: number;
    photo: string;
    location: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    status: 'planned' | 'visited';
    dateAdded: string;
}
