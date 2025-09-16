const request = require('supertest');
const app = 'http://localhost:3000'; // Or require your Express app if available

beforeEach(async () => {
    // Reset the local airport to BRS before each test
    await request(app)
        .put('/airports/local')
        .send({ airport: { iataCode: 'BRS' } });
});

describe('GET /airports/local', () => {
    it('should return local airport details', async () => {
        await request(app)
            .get('/airports/local')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    name: "Bristol Airport",
                    city: "Bristol",
                    country: "United Kingdom",
                    iataCode: "BRS",
                    icaoCode: "EGGD"
                });
            });
    });
});

describe('PUT /airports/local', () => {
    it('should update what my local airport is', async () => {
        await request(app)
            .put('/airports/local')
            .send({ airport: { iataCode: 'LGW' } })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({ message: "Local airport updated" });
            });
        

        // Get the local airport to verify it was updated
        await request(app)
            .get('/airports/local')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    name: "London Gatwick Airport",
                    city: "London",
                    country: "United Kingdom",
                    iataCode: "LGW",
                    icaoCode: "EGKK"
                });
            });
    });
});