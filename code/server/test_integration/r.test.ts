import { describe, test, beforeAll, afterAll, expect } from "@jest/globals"
import request from 'supertest'
import { app } from "../index"
import { Category } from "../src/components/product"
import db from "../src/db/db"
import { cleanup } from '../src/db/cleanup'

const basePath = "/ezelectronics" 


const admin = { username: "admin", name: "admin", surname: "admin", password: "admin", role: "Admin" };
const customer = { username: "customer", name: "customer", surname: "customer", password: "customer", role: "Customer" };
const customer1 = { username: "customer1", name: "customer1", surname: "customer1", password: "customer1", role: "Customer" };
const customer2 = { username: "customer2", name: "customer2", surname: "customer2", password: "customer2", role: "Customer" };
let adminCookie: string
let customerCookie: string
let customerCookie1: string
let customerCookie2: string

const phone1 = { model: "phone1", category: Category.SMARTPHONE, quantity: 10, sellingPrice: 50, details: "", arrivalDate: "2024-06-12" };
const phone2 = { model: "phone2", category: Category.SMARTPHONE, quantity: 5, sellingPrice: 90, details: "", arrivalDate: "2024-06-12" };
const review1 = { model: "phone1", score: 3, comment: "nuovo commento 1"};
const review2 = { model: "phone2", score: 4, comment: "nuovo commento 2"};
const review3 = { model: "phone1", score: 20, comment: "nuovo commento 3"};
const review4 = { model: "phone1", score: 5, comment: "nuovo commento 4"};

// Function to create a user in the database
const createUser = async (user: any) => {
    await request(app).post(`${basePath}/users`).send(user).expect(200)
}
  
// Function to login a user and get the cookie
const login = async (user: any) => {
    return new Promise<string>((resolve, reject) => {
      request(app)
        .post(`${basePath}/sessions`)
        .send(user)
        .expect(200)
        .end((err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res.header["set-cookie"][0])
        })
    })
  }

// Function to create a product in the database
const createProduct = async (product: any) => {
    await request(app).post(`${basePath}/products`).set("Cookie", adminCookie).send(product).expect(200);
  };

beforeAll( async () => {
   // await cleanup();
    await createUser(admin);
    await createUser(customer);
    await createUser(customer1);
    await createUser(customer2);
    adminCookie = await login(admin);
    customerCookie = await login(customer);
    customerCookie1 = await login(customer1);
    customerCookie2 = await login(customer2);
    await createProduct(phone1);
});

afterAll( async () => {
    await cleanup();
});

describe("Review integration tests", () => {

    /* @Test Suite 1: Post /reviews/:model 
    *   Test Case 1: Register a new review - success
    *   Test Case 2: Register a new review - already exists
    *   Test Case 3: Register a new review - product doesn't exist
    *   Test Case 4: Register a new review - user is not a customer
    *   Test Case 5: Register a new review - at least one request body parameter is empty/wrong
    */
    describe("POST /reviews/:model", () => {
        // Test Case 1: Register a new review - success
        test("It should return a 200 success code", async () => {
           await request(app).post(`${basePath}/reviews/` + review1.model).set("Cookie", customerCookie).send(review1).expect(200);
        })

        // Test Case 2: Register a new review - already exists
        test("It should return a 409 error code - the review already exists", async () => {
            await request(app)
                .post(`${basePath}/reviews/phone1`)
                .set("Cookie", customerCookie)
                .send(review1)
                .expect(409);
        })

        // Test Case 3: Register a new review - product doesn't exist
        test("It should return a 404 error - the product doesn't exist", async () => {
            await request(app)
                .post(`${basePath}/reviews/phone2`)
                .set("Cookie", customerCookie1)
                .send(review2)
                .expect(404);
        })

        // Test Case 4: Register a new review - user is not a customer
        test("It should return a 401 error - the user is not a customer", async () => {
            await request(app)
                .post(`${basePath}/reviews/phone1`)
                .set("Cookie", adminCookie)
                .send(review1)
                .expect(401);
        })

        // Test Case 5: Register a new review - at least one request body parameter is empty/wrong
        test("It should return a 422 error code - at least one request body parameter is empty/wrong", async () => {
            await request(app)
                .post(`${basePath}/reviews/phone1`)
                .set("Cookie", customerCookie)
                .send(review3)
                .expect(422);
        })
    })

    /* @Test Suite 2: Get /reviews/:model
        *   Test Case 1: Retrieve all the reviews for the product selected - success
        *   Test Case 2: Retrieve all the reviews for the product selected - user is not authenticated
    */    
    describe("GET /reviews/:model", () => {
        // Test Case 1: Retrieve all the reviews for the product selected - success
        test("It should return a 200 success code", async () => {
            await request(app)
                .post(`${basePath}/reviews/` + review4.model)
                .set("Cookie", customerCookie1)
                .send(review4)
                .expect(200);
            const review = await request(app)
                .get(`${basePath}/reviews/` + review1.model)
                .set("Cookie", customerCookie)
                .expect(200);
            expect(review.body).toHaveLength(2);
        })

        test("It should return a 401 error - user is not authenticated", async () => {
            await request(app)
                .get(`${basePath}/reviews/` + review1.model)
                .expect(401);
        })
    })

    /* @Test Suite 3: Delete /reviews/:model
    *   Test Case 1: Delete the review for the product selected - success
    *   Test Case 2: Delete the review for the product selected - user is not authenticated
    *   Test Case 3: Delete the review for the product selected - the product of the review doesn't exist
    *   Test Case 4: Delete the review for the product selected - the product doesn't have a review of the logged user
    */
    describe("DELETE /reviews/:model", () => {
        // Test Case 1: Delete the review for the product selected - success
        test("It should return a 200 success code", async () => {
            await request(app)
                .delete(`${basePath}/reviews/` + review1.model)
                .set("Cookie", customerCookie)
                .expect(200);
            const review = await request(app)
                .get(`${basePath}/reviews/` + review1.model)
                .set("Cookie", customerCookie)
                .expect(200);
            expect(review.body).toHaveLength(1);
        })

        // Test Case 2: Delete the review for the product selected - user is not authenticated
        test("It should return a 401 error - user is not authenticated", async () => {
            await request(app)
                .delete(`${basePath}/reviews/` + review1.model)
                .expect(401);
        })

        // Test Case 3: Delete the review for the product selected - the product of the review doesn't exist
        test("It should return a 404 error - the product of the review doesn't exist", async () => {
            await request(app)
                .delete(`${basePath}/reviews/` + review2.model)
                .set("Cookie", customerCookie)
                .expect(404);
        })

        // Test Case 4: Delete the review for the product selected - the product doesn't have a review of the logged user
        test("It should return a 404 error - the product doesn't have a review of the logged user", async () => {
            await request(app)
                .delete(`${basePath}/reviews/` + review1.model)
                .set("Cookie", customerCookie2)
                .expect(404);
        })
    })

    /* @Test Suite 4: Delete /reviews/:model/all
    *   Test Case 1: Delete all the review for the product selected - success
    *   Test Case 2: Delete all the review for the product selected - user is not ad admin
    *   Test Case 3: Delete all the review for the product selected - the product of the review doesn't exist
    */
    describe("DELETE /reviews/:model/all", () => {
        // Test Case 1: Delete all the review for the product selected - success
        test("It should return a 200 success code", async () => {
            await request(app)
                .post(`${basePath}/reviews/` + review4.model)
                .set("Cookie", customerCookie2)
                .send(review4)
                .expect(200);
            await request(app)
                .delete(`${basePath}/reviews/` + review1.model + "/all")
                .set("Cookie", adminCookie)
                .expect(200);
            const review = await request(app)
                .get(`${basePath}/reviews/` + review1.model)
                .set("Cookie", customerCookie)
                .expect(200);
            expect(review.body).toHaveLength(0);
        })

        // Test Case 2: Delete all the review for the product selected - user is not ad admin
        test("It should return a 401 error - the user is not ad admin", async () => {
            await request(app)
                .post(`${basePath}/reviews/` + review1.model)
                .set("Cookie", customerCookie)
                .send(review1)
                .expect(200);
            await request(app)
                .post(`${basePath}/reviews/` + review4.model)
                .set("Cookie", customerCookie2)
                .send(review4)
                .expect(200);
            await request(app)
                .delete(`${basePath}/reviews/` + review1.model + "/all")
                .set("Cookie", customerCookie)
                .expect(401);
        })

        // Test Case 3: Delete all the review for the product selected - the product of the review doesn't exist
        test("It should return a 404 error - the product of the review doesn't exist", async () => {
            await request(app)
                .delete(`${basePath}/reviews/` + "notexist" + "/all")
                .set("Cookie", adminCookie)
                .expect(404);
        })
    })

    /* @Test Suite 5: Delete /reviews
    *   Test Case 1: Delete all the review - success
    *   Test Case 2: Delete all the review - user is not an admin
    */
    describe("DELETE /reviews", () => {
        // Test Case 1: Delete all the review - success
        test("It should return a 200 success code", async () => {
            await createProduct(phone2);
            await request(app)
                .post(`${basePath}/reviews/` + review2.model)
                .set("Cookie", customerCookie1)
                .send(review2)
                .expect(200);
            await request(app)
                .delete(`${basePath}/reviews/`)
                .set("Cookie", adminCookie)
                .expect(200);
            const r = await request(app)
                .get(`${basePath}/reviews/` + review1.model)
                .set("Cookie", customerCookie)
                .expect(200);
            expect(r.body).toHaveLength(0);
            const r1 = await request(app)
                .get(`${basePath}/reviews/` + review2.model)
                .set("Cookie", customerCookie)
                .expect(200);
            expect(r1.body).toHaveLength(0);
        })

        // Test Case 2: Delete all the review - user is not ad admin
        test("It should return a 401 error - the user is not an admin", async () => {
            await request(app)
                .post(`${basePath}/reviews/` + review2.model)
                .set("Cookie", customerCookie1)
                .send(review2)
                .expect(200);
            await request(app)
                .post(`${basePath}/reviews/` + review1.model)
                .set("Cookie", customerCookie)
                .send(review1)
                .expect(200);
            await request(app)
                .post(`${basePath}/reviews/` + review4.model)
                .set("Cookie", customerCookie2)
                .send(review4)
                .expect(200);
            await request(app)
                .delete(`${basePath}/reviews/`)
                .set("Cookie", customerCookie)
                .expect(401);
        })
    })
})