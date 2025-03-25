import {faker} from '@faker-js/faker';
import fs from 'fs';

const generateAttractions = (count = 50) => {
    return Array.from({length: count}, (_, id) => ({
        id: id + 1,
        name: faker.location.city(),
        description: faker.lorem.sentence(),
        dateAdded: faker.date.past().toISOString(),
        rating: faker.number.int({min: 1, max: 5}),
        photo: faker.image.urlPicsumPhotos(),
        location: faker.location.streetAddress(),
        coordinates: {
            lat: faker.location.latitude(),
            lng: faker.location.longitude(),
        },
        status: Math.random() > 0.5 ? 'в планах' : 'осмотрена',
    }));
};

const data = {attractions: generateAttractions(1000)};

fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
