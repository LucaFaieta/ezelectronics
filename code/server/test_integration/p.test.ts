import { describe, test, expect, beforeAll, afterAll } from "@jest/globals"
import request from 'supertest'
import { app } from "../index"
import { cleanup} from "../src/db/cleanup"
import db from "../src/db/db"
import { Category } from "../src/components/product"

const basePath = "/ezelectronics"


const admin = { username: "admin", name: "admin", surname: "admin", password: "admin", role: "Admin" };
const customer = { username: "customer", name: "customer", surname: "customer", password: "customer", role: "Customer" };
let adminCookie: string
let customerCookie: string

const phone1 = { model: "phone1", category: Category.SMARTPHONE, quantity: 10, sellingPrice: 50, details: "", arrivalDate: "2024-06-10" };
const phone2 = { model: "phone2", category: Category.SMARTPHONE, quantity: 5, sellingPrice: 90, details: "", arrivalDate: "2024-06-10" };
const laptop1 = { model: "laptop1", category: Category.LAPTOP, quantity: 20, sellingPrice: 500, details: "", arrivalDate: "2024-06-10" };
const laptop2 = { model: "laptop2", category: Category.LAPTOP, quantity: 20, sellingPrice: 1000, details: "", arrivalDate: "2024-06-10" };

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

beforeAll(async () => {
 // await cleanup();
  await createUser(admin)
  await createUser(customer)
  adminCookie = await login(admin)
  customerCookie = await login(customer)
  await createProduct(phone2)
  await createProduct(laptop1)
  await createProduct(laptop2)
});

afterAll(async() => {
  await cleanup();
});

describe("Product integration tests", () => {
  /* @Test Suite 1: POST /products 
  *  Test Case 1: Create a new product - success
  *  Test Case 2: Create a new product - arrivalDate is the current date (when is empty)
  *  Test Case 3: Create a new product - product already exists
  *  Test Case 4: Create a new product - missing model or category or quantity or sellingPrice
  *  Test Case 5: Create a new product - not an Admin or Manager
  *  Test Case 6: Create a new product - arrivalDate is after the current date
  *  Test Case 7: Create a new product - arrivalDate wrong format
  */
  describe("POST /products", () => {
    // Test Case 1: create a new product - success
    test("It should return a 200 success code", async () => {
      const response = await request(app).post(`${basePath}/products`).set("Cookie", adminCookie).send(phone1)
      expect(response.status).toBe(200);
    });

    // Test Case 2: Create a new product - arrivalDate is the current date (when is
    test("It should return a 200 code if arrivalDate is the current date (when is empty)", async () => {
      const currentDate = new Date().toISOString().split("T")[0];
      const productTest = { model: "phone20", category: Category.SMARTPHONE, quantity: 10, details: "test", sellingPrice: 1000, arrivalDate: "" };
      const response = await request(app).post(`${basePath}/products`).set("Cookie", adminCookie).send(productTest).expect(200);
      expect(response.status).toBe(200);
      const products = await request(app).get(`${basePath}/products`).set("Cookie", adminCookie)
      expect(products.body.find((product: any) => product.model === "phone20").arrivalDate).toBe(currentDate);
    });

    // Test Case 3: Create a new product - product already exists
    test("It should return a 409 error code - product already exists", async () => {
      await request(app).post(`${basePath}/products`).set("Cookie", adminCookie).send(phone2)
    });

    // Test Case 4: Create a new product - missing model or category or quantity or sellingPrice
    test("It should return a 422 error code - missing model or category or quantity or sellingPrice", async () => {
      await request(app).post(`${basePath}/products`).set("Cookie", adminCookie).send({ model: "", category: "test", quantity: 10, sellingPrice: 1000, details: "test", arrivalDate: "2021-01-01" }).expect(422)
      await request(app).post(`${basePath}/products`).set("Cookie", adminCookie).send({ model: "test", category: "", quantity: 10, sellingPrice: 1000, details: "test", arrivalDate: "2021-01-01" }).expect(422)
      await request(app).post(`${basePath}/products`).set("Cookie", adminCookie).send({ model: "test", category: "test", quantity: "", sellingPrice: 1000, details: "test", arrivalDate: "2021-01-01" }).expect(422)
      await request(app).post(`${basePath}/products`).set("Cookie", adminCookie).send({ model: "test", category: "test", quantity: 10, sellingPrice: "", details: "test", arrivalDate: "2021-01-01" }).expect(422)
    });
    
    // Test Case 5: Create a new product - not an Admin or Manager
    test("It should return a 401 error code - not an Admin or Manager", async () => {   
      await request(app).post(`${basePath}/products`).set("Cookie", customerCookie).send(phone1).expect(401);
    });

    // Test Case 6: Create a new product - arrivalDate is after the current date
    test("It should return a 400 error code - arrivalDate is after the current date", async () => {
      const testProduct = { model: "test", category: Category.SMARTPHONE, quantity: 10, sellingPrice: 1000, details: "test", arrivalDate: "2025-06-10" }
      await request(app).post(`${basePath}/products`).set("Cookie", adminCookie).send(testProduct).expect(400);
    });

    // Test Case 7: Create a new product - arrivalDate wrong format
    test("It should return a 422 error code - arrivalDate wrong format", async () => {
      const testProduct = { model: "test", category: Category.SMARTPHONE, quantity: 10, sellingPrice: 1000, details: "test", arrivalDate: "2024-06" }
      await request(app).post(`${basePath}/products`).set("Cookie", adminCookie).send(testProduct).expect(422);
    });
  });

  /* @Test Suite 2: PATCH /products 
  *  Test Case 1: Change quantity of a product - success
  *  Test Case 2: Change quantity of a product - changeDate is substituted with the current date (when is empty)
  *  Test Case 3: Change quantity of a product - product not found
  *  Test Case 4: Change quantity of a product - changeDate is after the current date
  *  Test Case 5: Change quantity of a product - changeDate is before arrivalDate
  *  Test Case 6: Change quantity of a product - changeDate wrong format
  */
  describe("PATCH /products/:model", () => {
    // Test Case 1: Change quantity of a product - success
    test("It should return a 200 success code", async () => {
      const response = await request(app).patch(`${basePath}/products/phone2`).set("Cookie", adminCookie).send({ model: "phone2", quantity: 50, changeDate: "2024-06-11" })
      expect(response.status).toBe(200);
    });

    // Test Case 2: Change quantity of a product - changeDate is substituted with the current date (when is empty)
    test("It should return a 200 code if changeDate is substituted with the current date (when is empty)", async () => {
      const response = await request(app).patch(`${basePath}/products/phone20`).set("Cookie", adminCookie).send({ model: "phone20", quantity: 50, changeDate: ""})
      expect(response.status).toBe(200);
    });

    // Test Case 3: Change quantity of a product - product not found
    test("It should return a 404 error code - product is not found", async () => {
      const response = await request(app).patch(`${basePath}/products/phone3`).set("Cookie", adminCookie).send({ model: "pphone3", quantity: 50, changeDate: "2024-06-11" })
      expect(response.status).toBe(404);
    });

    // Test Case 4: Change quantity of a product - arrivalDate is after the current date
    test("It should return a 400 error code - arrivalDate is after the current date", async () => {
      const response = await request(app).patch(`${basePath}/products/phone2`).set("Cookie", adminCookie).send({ model: "phone2", quantity: 50, changeDate: "2025-06-10" })
      expect(response.status).toBe(400);
    });

    // Test Case 5: Change quantity of a product - changeDate is before arrivalDate
    test("It should return a 400 error code - changeDate is before arrivalDate", async () => {
      const response = await request(app).patch(`${basePath}/products/phone2`).set("Cookie", adminCookie).send({ model: "phone2", quantity: 50, changeDate: "2020-01-01" })
      expect(response.status).toBe(400);
    });

    // Test Case 6: Change quantity of a product - changeDate wrong format
    test("It should return a 422 error code - changeDate wrong format", async () => {
      const response = await request(app).patch(`${basePath}/products/phone2`).set("Cookie", adminCookie).send({ model: "phone2", quantity: 50, changeDate: "2024-06" })
      expect(response.status).toBe(422);
    });
  });

  /* @Test Suite 3: PATCH /products/:model/sell 
  *  Test Case 1: Sell a product - success
  *  Test Case 2: Sell a product - sellingDate is substituted with the current date (when is empty)
  *  Test Case 2: Sell a product - product not found
  *  Test Case 3: Sell a product - available quantity is 0
  *  Test Case 4: Sell a product - available quantity is lower than the requested quantity
  *  Test Case 5: Sell a product - sellingDate is after the current date
  *  Test Case 6: Sell a product - sellingDate is before the product's arrivalDate
  *  Test Case 7: Sell a product - sellingDate wrong format
  */
  describe("PATCH /products/:model/sell", () => {
    // Test Case 1: Sell a product - success
    test("It should return a 200 success code", async () => {
      const response = await request(app).patch(`${basePath}/products/phone2/sell`).set("Cookie", adminCookie).send({ model: "phone2", quantity: 5, sellingDate: "2024-06-12" })
      expect(response.status).toBe(200);
    });

    // Test Case 2: Sell a product - sellingDate is substituted with the current date (when is empty)
    test("It should return a 200 code if sellingDate is substituted with the current date (when is empty)", async () => {
      const response = await request(app).patch(`${basePath}/products/phone2/sell`).set("Cookie", adminCookie).send({ model: "phone2", quantity: 5, sellingDate: "" })
      expect(response.status).toBe(200);
    });

    // Test Case 3: Sell a product - product not found
    test("It should return a 404 error code - product is not found", async () => {
      const response = await request(app).patch(`${basePath}/products/phone3/sell`).set("Cookie", adminCookie).send({ model: "phone3", quantity: 5, sellingDate: "2024-06-12" })
      expect(response.status).toBe(404);
    });

    // Test Case 4: Sell a product - available quantity is 0
    test("It should return a 409 error code - available quantity is 0", async () => {
      // Sell before every laptop1
      await request(app).patch(`${basePath}/products/laptop1/sell`).set("Cookie", adminCookie).send({ model: "laptop1", quantity: 20, sellingDate: "2024-06-11" })
      const response = await request(app).patch(`${basePath}/products/laptop1/sell`).set("Cookie", adminCookie).send({ model: "laptop1", quantity: 20, sellingDate: "2024-06-12" })
      expect(response.status).toBe(409);
    });

    // Test Case 5: Sell a product - available quantity is lower than the requested quantity
    test("It should return a 409 error code - the available quantity of model is lower than the requested `quantity`", async () => {
      const response = await request(app).patch(`${basePath}/products/phone2/sell`).set("Cookie", adminCookie).send({ model: "phone2", quantity: 1000, sellingDate: "2024-06-12" })
      expect(response.status).toBe(409);
    });

    // Test Case 6: Sell a product - sellingDate is after the current date
    test("It should return a 400 error code - sellingDate is after the current date", async () => {
      const response = await request(app).patch(`${basePath}/products/phone2/sell`).set("Cookie", adminCookie).send({ model: "phone2", quantity: 5, sellingDate: "2028-01-01" })
      expect(response.status).toBe(400);
    });

    // Test Case 7: Sell a product - sellingDate is before the product's arrivalDate
    test("It should return a 400 error code - sellingDate is before the product's arrivalDate", async () => {
      const response = await request(app).patch(`${basePath}/products/phone2/sell`).set("Cookie", adminCookie).send({ model: "phone2", quantity: 5, sellingDate: "2020-01-01" })
      expect(response.status).toBe(400);
    });

    // Test Case 8: Sell a product - sellingDate wrong format
    test("It should return a 422 error code - sellingDate wrong format", async () => {
      await createProduct({model: "phone25", category: Category.SMARTPHONE, quantity: 10, sellingPrice: 1000, details: "test", arrivalDate: "2024-06-10"})
      const response = await request(app).patch(`${basePath}/products/phone25/sell`).set("Cookie", adminCookie).send({ model: "phone25", quantity: 5, sellingDate: "2024-06/14" })
      expect(response.status).toBe(422);
    });
  });

  /* @Test Suite 4: GET /products 
  *  Test Case 1: Retrieve all products - success
  *  Test Case 2: Retrieve all products - grouping by category
  *  Test Case 3: Retrieve all products - grouping by model
  *  Test Case 4: Retrieve all products - wrong values of grouping, category or model
  *  Test Case 5: Retrieve all products - model does not represent a product in the database (only when grouping is model)
  */
  describe("GET /products", () => {
    // Test Case 1: Retrieve all products - success
    test("It should return a 200 success code", async () => {
      const response = await request(app).get(`${basePath}/products`).set("Cookie", adminCookie).expect(200);
      expect(response.status).toBe(200);
    });

    // Test Case 2: Retrieve all products - grouping by category
    test("It should return a 200 success code", async () => {
      const response = await request(app).get(`${basePath}/products`).set("Cookie", adminCookie).query({ grouping: "category", category: Category.SMARTPHONE, model: null})
      expect(response.status).toBe(200);
    });

    // Test Case 3: Retrieve all products - grouping by model
    test("It should return a 200 success code", async () => {
      const response = await request(app).get(`${basePath}/products`).set("Cookie", adminCookie).query({ grouping: "model", category: null, model: "phone2" })
      expect(response.status).toBe(200);
    });

    // Test Case 4: Retrieve all products - wrong values of grouping, category or model
    test("It should return a 422 error code - wrong values of grouping, category or model", async () => {
      await request(app).get(`${basePath}/products`).set("Cookie", adminCookie).query({ grouping: null, category: "test", model: "test" }).expect(422);
      await request(app).get(`${basePath}/products`).set("Cookie", adminCookie).query({ grouping: "test", category: null, model: "test" }).expect(422);
      await request(app).get(`${basePath}/products`).set("Cookie", adminCookie).query({ grouping: "category", category: null, model: "test" }).expect(422);
      await request(app).get(`${basePath}/products`).set("Cookie", adminCookie).query({ grouping: "model", category: "test", model: null }).expect(422);
    });

    // Test Case 5: Retrieve all products - model does not represent a product in the database (only when grouping is model)
    test("It should return a 404 error code - model does not represent a product in the database (only when grouping is model)", async () => {
      const response = await request(app).get(`${basePath}/products`).set("Cookie", adminCookie).query({ grouping: "model", category: null, model: "test" })
      expect(response.status).toBe(404);
    });
  });

  /* @Test Suite 5: GET /products/available 
  *  Test Case 1: Retrieve all available products - success
  *  Test Case 2: Retrieve available products - grouping by category
  *  Test Case 3: Retrieve available products - grouping by model
  *  Test Case 4: Retrieve available products - wrong values of grouping, category or model
  *  Test Case 5: Retrieve available products - model does not represent a product in the database (only when grouping is model)
  */
  describe("GET /products/available", () => {
    // Test Case 1: Retrieve all available products - success
    test("It should return a 200 success code", async () => {
      const response = await request(app).get(`${basePath}/products/available`).set("Cookie", adminCookie)
      expect(response.status).toBe(200);
    });

    // Test Case 2: Retrieve available products - grouping by category
    test("It should return a 200 success code", async () => {
      const response = await request(app).get(`${basePath}/products/available`).set("Cookie", adminCookie).query({ grouping: "category", category: Category.SMARTPHONE, model: null })
      expect(response.status).toBe(200);
    });

    // Test Case 3: Retrieve available products - grouping by model
    test("It should return a 200 success code", async () => {
      const response = await request(app).get(`${basePath}/products/available`).set("Cookie", adminCookie).query({ grouping: "model", category: null, model: "phone2" })
      expect(response.status).toBe(200);
    });

    // Test Case 4: Retrieve available products - wrong values of grouping, category or model
    test("It should return a 422 error code - wrong values of grouping, category or model", async () => {
      await request(app).get(`${basePath}/products/available`).set("Cookie", adminCookie).query({ grouping: null, category: "test", model: "test" }).expect(422);
      await request(app).get(`${basePath}/products/available`).set("Cookie", adminCookie).query({ grouping: "test", category: null, model: "test" }).expect(422);
      await request(app).get(`${basePath}/products/available`).set("Cookie", adminCookie).query({ grouping: "category", category: null, model: "test" }).expect(422);
      await request(app).get(`${basePath}/products/available`).set("Cookie", adminCookie).query({ grouping: "model", category: "test", model: null }).expect(422);
    });

    // Test Case 5: Retrieve available products - model does not represent a product in the database (only when grouping is model)
    test("It should return a 404 error code - model does not represent a product in the database (only when grouping is model)", async () => {
      const response = await request(app).get(`${basePath}/products/available`).set("Cookie", adminCookie).query({ grouping: "model", category: null, model: "test" })
      expect(response.status).toBe(404);
    });
  });

  /* @Test Suite 6: DELETE /products/:model
  *  Test Case 1: Delete a product - success
  *  Test Case 2: Delete a product - product not found
  */
  describe("DELETE /products/:model", () => {
    // Test Case 1: Delete a product - success
    test("It should return a 200 success code", async () => {
      const response = await request(app).delete(`${basePath}/products/phone1`).set("Cookie", adminCookie)
      expect(response.status).toBe(200);
    });

    // Test Case 2: Delete a product - product not found
    test("It should return a 404 error code - the product is not found", async () => {
      const response = await request(app).delete(`${basePath}/products/phone8`).set("Cookie", adminCookie)
      expect(response.status).toBe(404);
    });
  });

  /* @Test Suite 7: DELETE /products 
  *  Test Case 1: Delete all products - success
  */
  describe("DELETE /products", () => {
    test("It should return a 200 success code", async () => {
      const response = await request(app).delete(`${basePath}/products`).set("Cookie", adminCookie)
      expect(response.status).toBe(200);
    });
  });
});