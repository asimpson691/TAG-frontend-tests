import { makeFetch } from "./common";

let localAirportCode = "BRS"; // Bristol Airport

export const getLocalAirportDetails = async () => {
	const { data } = await makeFetch(
		`https://airportgap.com/api/airports/${localAirportCode}`,
	);
	return {
		name: data.attributes.name,
		city: data.attributes.city,
		country: data.attributes.country,
		iataCode: data.attributes.iata,
		icaoCode: data.attributes.icao,
	};
};

export const setLocalAirport = async (airport: Record<"iataCode", string>) => {
	localAirportCode = airport.iataCode;
};
