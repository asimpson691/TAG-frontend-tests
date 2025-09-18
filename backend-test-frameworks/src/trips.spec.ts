import { expect, jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

jest.mock("@faker-js/faker", () => {
	return {
		faker: {
			string: {
				uuid: jest.fn(() => undefined),
			},
			airline: {
				airport: jest.fn(() => undefined),
			},
		},
	};
});

import * as trips from "./trips";

beforeEach(async () => {
	//jest.resetModules();
});

describe("getFavouriteTrips", () => {
	it("should return an array of favourite trips", async () => {
		expect(faker.string.uuid()).toBe(undefined);
		trips.addFavouriteTrip("Trip1", "BRS", "CDG", ["2024-06-01"]);
		trips.addFavouriteTrip("Trip2", "BRS", "JFK", ["2024-07-01"]);

		const tripsArray = trips.getFavouriteTrips();
		expect(tripsArray).toEqual([
			{ "0000-0001": "Trip1" },
			{ "0000-0002": "Trip2" },
		]);
	});

	// it("should return an empty array if no trips", () => {
	// 	import("./trips").then((trips) => {
	// 		const tripsArray = trips.getFavouriteTrips();
	// 		expect(tripsArray).toEqual([]);
	// 	});
	// });
});

// describe('addFavouriteTrip', () => {
//     it('should add a trip and return its id', () => {
//         faker.number.int.mockReturnValue(123);
//         const name = 'Holiday';
//         const from_airport = 'BRS';
//         const to_airport = 'JFK';
//         const dates = ['2024-06-01', '2024-06-10'];
//         const id = trips.addFavouriteTrip(name, from_airport, to_airport, dates);

//         expect(id).toBe('123');
//         expect(trips.getFavouriteTrip('123')).toEqual({
//             name,
//             from_airport,
//             to_airport,
//             dates,
//         });
//     });
// });

// describe('getFavouriteTrip', () => {
//     it('should return the correct trip by id', () => {
//         faker.number.int.mockReturnValue(42);
//         trips.addFavouriteTrip('TestTrip', 'BRS', 'LHR', ['2024-08-01']);
//         expect(trips.getFavouriteTrip('42')).toEqual({
//             name: 'TestTrip',
//             from_airport: 'BRS',
//             to_airport: 'LHR',
//             dates: ['2024-08-01'],
//         });
//     });

//     it('should return undefined for non-existent id', () => {
//         expect(trips.getFavouriteTrip('999')).toBeUndefined();
//     });
// });

// describe('getRecommendedTrip', () => {
//     it('should return a recommended trip with correct formatting', async () => {
//         faker.airline.airport.mockReturnValue({
//             iataCode: 'JFK',
//             name: 'John F Kennedy Intl',
//         });
//         makeFetch.mockResolvedValue({
//             data: {
//                 attributes: {
//                     miles: 3456,
//                     to_airport: {
//                         city: 'New York',
//                         country: 'USA',
//                     },
//                 },
//             },
//         });

//         const result = await trips.getRecommendedTrip();
//         expect(result).toEqual({
//             from: 'BRS: Bristol Airport',
//             to: 'JFK: John F Kennedy Intl - New York, USA',
//             distance: '3500 miles',
//         });
//     });

//     it('should handle missing data gracefully', async () => {
//         faker.airline.airport.mockReturnValue({
//             iataCode: 'CDG',
//             name: 'Charles de Gaulle',
//         });
//         makeFetch.mockResolvedValue({ data: null });

//         // Since the code tries to use `res.status` which is not defined,
//         // we expect the function to throw or return undefined.
//         await expect(trips.getRecommendedTrip()).resolves.toBeUndefined();
//     });
// });
