import express from "express";

import { getLocalAirportDetails, setLocalAirport } from "./src/airports.js";
import {
	getRecommendedTrip,
	getFavouriteTrip,
	getFavouriteTrips,
	addFavouriteTrip,
} from "./src/trips.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.get("/airports/local", async (_req, res) => {
	const localAirportDetails = await getLocalAirportDetails();
	res.status(200).json(localAirportDetails);
});

app.put("/airports/local", (req, res) => {
	const { airport } = req.body;

	if (!airport || !airport.iataCode) {
		return res.status(400).json({ error: "Invalid airport data" });
	}

	setLocalAirport(airport);
	return res.status(200).json({ message: "Local airport updated" });
});

app.get("/trips/recommend", async (_req, res) => {
	try {
		const recommendedTrip = await getRecommendedTrip();
		return res.status(200).json(recommendedTrip);
	} catch (error) {
		return res.status(404).json({ error: error.message });
	}
});

app.get("/trips/favourites", async (_req, res) => {
	const trips = getFavouriteTrips();
	res.status(200).json(trips);
});

app.get("/trips/favourites/:uuid", async (req, res) => {
	if (!req.params.uuid) {
		return res.status(400).json({ error: "Missing uuid query parameter" });
	}
	const trip = getFavouriteTrip(req.params.uuid);
	if (!trip) {
		return res.status(404).json({ error: "Favourite trip not found" });
	}
	return res.status(200).json(trip);
});

app.post("/trips/favourites", async (req, res) => {
	const { name, from_airport, to_airport, dates } = req.body;
	if (!name || !from_airport || !to_airport || !dates) {
		return res.status(400).json({ error: "Missing required trip data" });
	}
	const id = addFavouriteTrip(name, from_airport, to_airport, dates);
	res.status(201).json({ id, message: "Favourite trip added successfully" });
});
