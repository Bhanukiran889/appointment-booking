const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

afterAll(async () => {
    await mongoose.connection.close();
});


describe("Hospita API",()=>{
    // Test GET /api/doctors
    it("Health Api should return status code 200", async () => {
        const res = await request(app).get("/health/");
        expect(res.statusCode).toBe(200);

    });

    it("GET api method should return doctors", async () => {
        const res = await request(app).get("/api/doctors/")
        // console.log(res.body)
        expect(res.statusCode).toBe(200)
        expect(res.body[0]).toHaveProperty("name")
    }, 10000);
});