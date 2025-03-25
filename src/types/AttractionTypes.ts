export interface Attraction {
    id: number;
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
