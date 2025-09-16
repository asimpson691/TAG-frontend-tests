import { faker } from '@faker-js/faker';

import { makeFetch } from './common.js';

let favouriteTrips = {}; // { uid: { name, from_airport, to_airport, distance, dates } }
let localAirportCode = 'BRS'; // Bristol Airport

export const getRecommendedTrip = async () => {
    const destination = faker.airline.airport();
    
    const { data } = await makeFetch(`https://airportgap.com/api/airports/distance?from=${localAirportCode}&to=${destination.iataCode}`, { method: 'POST'});
    if (!data || !data.attributes) {
        return res.status(500).json({ error: 'Request failed - please try again later' });
    }
    
    const { miles, to_airport } = data.attributes;
    return {
        from: `${localAirportCode}: Bristol Airport`,
        to: `${destination.iataCode}: ${destination.name} - ${to_airport.city}, ${to_airport.country}`,
        distance: `${Math.round(miles / 100) * 100} miles`,
    };
};

export const getFavouriteTrips = () => {
    const tripsArray = Object.entries(favouriteTrips).map(([uuid, trip]) => ({
      [uuid]: trip.name
    }));
    return tripsArray;
};

export const getFavouriteTrip = (uuid) => {
    return favouriteTrips[uuid];
};

export const addFavouriteTrip = (name, from_airport, to_airport, dates) => {
    const id = faker.number.int({ min: 1, max: 999 }).toString();
    favouriteTrips[id] = { name, from_airport, to_airport, dates };
    return id;
}