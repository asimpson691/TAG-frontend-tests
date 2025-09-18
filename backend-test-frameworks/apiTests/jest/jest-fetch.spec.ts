import { makeFetch } from "./common";

const baseURL = "http://localhost:3000";

beforeEach(() => {
	// Reset the local airport to BRS before each test
	return makeFetch(`${baseURL}/airports/local`, {
		method: "PUT",
		body: { airport: { iataCode: "BRS" } },
	});
});

describe("GET /airports/local", () => {
	it("should return local airport details", async () => {
		const res = await makeFetch(`${baseURL}/airports/local`);
		expect(res.status).toBe(200);
		expect(res.data).toEqual({
			name: "Bristol Airport",
			city: "Bristol",
			country: "United Kingdom",
			iataCode: "BRS",
			icaoCode: "EGGD",
		});
	});
});

describe("PUT /airports/local", () => {
	it("should update what my local airport is", async () => {
		const res = await makeFetch(`${baseURL}/airports/local`, {
			method: "PUT",
			body: { airport: { iataCode: "LGW" } },
		});
		expect(res.status).toBe(200);
		expect(res.data).toEqual({ message: "Local airport updated" });

		// Get the local airport to verify it was updated
		const { data } = await makeFetch(`${baseURL}/airports/local`);
		expect(data).toEqual({
			name: "London Gatwick Airport",
			city: "London",
			country: "United Kingdom",
			iataCode: "LGW",
			icaoCode: "EGKK",
		});
	});
});
