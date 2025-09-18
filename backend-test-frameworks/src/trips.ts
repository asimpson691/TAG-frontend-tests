import { faker } from "@faker-js/faker";

import { makeFetch } from "./common";

interface Trip {
	name: string;
	from_airport: string;
	to_airport: string;
	dates: Record<"from" | "to", string>;
}

const favouriteTrips: Record<string, Trip> = {};
const localAirportCode = "BRS"; // Bristol Airport

export const getRecommendedTrip = async () => {
	const destination = faker.airline.airport();

	const { data } = await makeFetch(
		`https://airportgap.com/api/airports/distance?from=${localAirportCode}&to=${destination.iataCode}`,
		{ method: "POST" },
	);

	if (!data || !data.attributes) {
		throw new Error("Request failed - please try again later");
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
		[uuid]: trip.name,
	}));
	return tripsArray;
};

export const getFavouriteTrip = (uuid: string) => {
	return favouriteTrips[uuid];
};

export const addFavouriteTrip = (
	name: string,
	from_airport: string,
	to_airport: string,
	dates: Record<"from" | "to", string>,
) => {
	const id = faker.string.uuid();
	favouriteTrips[id] = { name, from_airport, to_airport, dates };
	return id;
};
