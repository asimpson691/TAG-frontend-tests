import { beforeEach, describe, expect, test, vi } from "vitest";
import nock from "nock";
import type * as TripsModule from "../../src/trips";

let trips: typeof TripsModule;

const mockFakerStringUUId = vi.fn();
const mockFakerAirlineAirport = vi.fn();

vi.mock("@faker-js/faker", () => {
	return {
		faker: {
			string: {
				uuid: mockFakerStringUUId,
			},
			airline: {
				airport: mockFakerAirlineAirport,
			},
		},
	};
});

beforeEach(async () => {
	vi.resetModules();
	vi.resetAllMocks();

	trips = await import("../../src/trips"); // need to re-import for each test due to the favouriteTrips state stored in that module
});

describe("getFavouriteTrips", () => {
	test("should return an array of favourite trips", async () => {
		mockFakerStringUUId
			.mockReturnValueOnce("0000-0001")
			.mockReturnValueOnce("0000-0002");

		trips.addFavouriteTrip("Trip1", "BRS", "CDG", {
			from: "2024-06-01",
			to: "2024-06-08",
		});
		trips.addFavouriteTrip("Trip2", "BRS", "JFK", {
			from: "2024-07-01",
			to: "2024-07-08",
		});

		const tripsArray = trips.getFavouriteTrips();
		expect(tripsArray).toEqual([
			{ "0000-0001": "Trip1" },
			{ "0000-0002": "Trip2" },
		]);
	});

	test("should return an empty array if no trips", () => {
		const tripsArray = trips.getFavouriteTrips();
		expect(tripsArray).toEqual([]);
	});
});

describe("getFavouriteTrip", () => {
	test("should return the correct trip by id", () => {
		mockFakerStringUUId
			.mockReturnValueOnce("0000-0001")
			.mockReturnValueOnce("0000-0002")
			.mockReturnValueOnce("0000-0003");

		trips.addFavouriteTrip("Trip 1", "BRS", "LHR", {
			from: "2024-08-01",
			to: "2024-08-08",
		});
		trips.addFavouriteTrip("Trip 2", "BRS", "MDR", {
			from: "2024-09-01",
			to: "2024-09-08",
		});
		trips.addFavouriteTrip("Trip 3", "BRS", "SOL", {
			from: "2024-10-01",
			to: "2024-10-08",
		});
		expect(trips.getFavouriteTrip("0000-0002")).toEqual({
			name: "Trip 2",
			from_airport: "BRS",
			to_airport: "MDR",
			dates: { from: "2024-09-01", to: "2024-09-08" },
		});
	});
});

describe("addFavouriteTrip", () => {
	test("should add a trip and return its id", () => {
		mockFakerStringUUId.mockReturnValueOnce("0000-7891");

		const id = trips.addFavouriteTrip("Holiday", "BRS", "JFK", {
			from: "2024-06-01",
			to: "2024-06-08",
		});

		expect(id).toBe("0000-7891");
		expect(trips.getFavouriteTrip("0000-7891")).toEqual({
			name: "Holiday",
			from_airport: "BRS",
			to_airport: "JFK",
			dates: { from: "2024-06-01", to: "2024-06-08" },
		});
	});
});

describe("getRecommendedTrip", () => {
	test("should return a recommended trip with correct formatting", async () => {
		mockFakerAirlineAirport.mockReturnValueOnce({
			iataCode: "JFK",
			name: "John F Kennedy Intl",
		});

		nock("https://airportgap.com")
			.post("/api/airports/distance?from=BRS&to=JFK")
			.reply(200, {
				attributes: {
					to_airport: {
						id: 2983,
						name: "John F Kennedy International Airport",
						city: "New York",
						country: "United States",
						iata: "JFK",
						icao: "KJFK",
						latitude: "40.639801",
						longitude: "-73.7789",
						altitude: 13,
						timezone: "America/New_York",
					},
					kilometers: 1111.12345,
					miles: 22222.12345,
				},
			});

		const result = await trips.getRecommendedTrip();
		expect(result).toEqual({
			from: "BRS: Bristol Airport",
			to: "JFK: John F Kennedy Intl - New York, United States",
			distance: "22200 miles",
		});
	});
});
