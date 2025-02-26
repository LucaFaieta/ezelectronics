import { describe, test, expect, beforeAll, afterAll } from "@jest/globals"
import request from 'supertest'
import { app } from "../index"
import { cleanup} from "../src/db/cleanup"
import db from "../src/db/db"
import { Product } from "../src/components/product"
import { Category } from "../src/components/product"
import { ProductInCart } from "../src/components/cart"

const basePath = "/ezelectronics"


const customer = { username: "customer", name: "customer", surname: "customer", password: "customer", role: "Customer" }
const admin = { username: "admin", name: "admin", surname: "admin", password: "admin", role: "Admin" }
const customer2 = { username: "customer2", name: "customer2", surname: "customer2", password: "customer2", role: "Customer" }
let customerCookie: string
let adminCookie: string

const laptop = { model: "laptop", category: Category.LAPTOP, quantity: 10, sellingPrice: 1000, details: "", arrivalDate:""}
const laptop2 = { model: "laptop2", category: Category.LAPTOP, quantity: 3, sellingPrice: 1000, details: "", arrivalDate:""}
const laptop3 = { model: "laptop3", category: Category.LAPTOP, quantity: 3, sellingPrice: 1000, details: "", arrivalDate:""}
const phone1 = { model: "phone1", category: Category.SMARTPHONE, quantity: 1, sellingPrice: 1000, details: "", arrivalDate:""}
const phone2 = { model: "phone2", category: Category.SMARTPHONE, quantity: 3, sellingPrice: 1000, details: "", arrivalDate:""}
const phone3 = { model: "phone3", category: Category.SMARTPHONE, quantity: 3, sellingPrice: 1000, details: "", arrivalDate:""}
const productModel = "laptop"

const productInCart={ model: laptop.model, quantity: laptop.quantity, category: laptop.category, price: laptop.sellingPrice}

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

// Function to add a product to the cart
const addProductToCart = async (product: any) => {
  if (product) {
    await request(app)
        .post(`${basePath}/carts`)
        .set('Cookie', customerCookie)
        .send(product)
        .expect(200);
    } else{
      throw new Error("Product not found")
    }
}

beforeAll(async () => {
  //await cleanup()
  await createUser(admin)
  await createUser(customer)
  await createUser(customer2)
  adminCookie = await login(admin)
  customerCookie = await login(customer)
  await createProduct(laptop)
  await createProduct(phone3)
  try{await addProductToCart(laptop)}catch(err){console.log(err)}
})

afterAll(async () => {
  await cleanup()
})

describe ("Cart integration tests", () => { 
    /* @Test Suite: GET /cart
    *   Test Case 1: Get the cart - success
    *   Test Case 2: Get the cart - success with other product
    *   Test Case 3: Get the cart - user is not logged in
    */
    describe("GET /cart", () => {
      // Test Case 1: Get the cart - success
        test("It should return a 200 success code", async () => {
          const res = await request(app)
            .get(`${basePath}/carts`)
            .set('Cookie', customerCookie)
            .expect(200)
          expect(res.body).toHaveProperty("products")
          })

        // Test Case 2: Get the cart - success with other product
        test("It should return a 200 success code - succes with other product", async () => {
            await request(app)
                .post(`${basePath}/products`)
                .set('Cookie', adminCookie)
                .send(laptop2)
                .expect(200)
            await request(app)
                .post(`${basePath}/carts`)
                .set('Cookie', customerCookie)
                .send(laptop2)
                .expect(200)
            const res = await request(app)
                .get(`${basePath}/carts`)
                .set('Cookie', customerCookie)
                .expect(200)
            expect(res.body).toHaveProperty("products")
          })

        // Test Case 3: Get the cart - user is not logged in
        test("It should return a 401 error code - user is not logged in", async () => {
            await request(app)
                .get(`${basePath}/carts`)
                .expect(401)
      })
    })
   
    /* @Test Suite: POST /cart
    *   Test Case 1: Add a product to the cart - success
    *   Test Case 2: Add a product to the cart - model is missing
    *   Test Case 3: Add a product to the cart - product is finished
    */
    describe("POST /cart", () => {
      // Test Case 1: Add a product to the cart - success
      test("It should return a 200 success code", async () => {
        await request(app)
            .post(`${basePath}/carts`)
            .set('Cookie', customerCookie)
            .send({model: productModel})
            .expect(200)
      })

      // Test Case 2: Add a product to the cart - model is missing
      test("It should return a 422 error code - model is missing", async () => {
        await request(app)
            .post(`${basePath}/carts`)
            .set('Cookie', customerCookie)
            .send({model: ""})
            .expect(422)
      })
      
      // Test Case 3: Add a product to the cart - product is finished
      test("It should return a 409 error code - product is finished", async () => {
        await request(app)
            .post(`${basePath}/products`)
            .set('Cookie', adminCookie)
            .send(phone1)
            .expect(200)
        await request(app)
            .post(`${basePath}/carts`)
            .set('Cookie', customerCookie)
            .send({model: "phone1"})
            .expect(200)
        await request(app)
            .patch(`${basePath}/carts`)
            .set('Cookie', customerCookie)
            .expect(200)

        let Customer2Cookie = await login(customer2)
        await request(app)
            .post(`${basePath}/carts`)
            .set('Cookie', Customer2Cookie)
            .send({model: "phone1"})
            .expect(409)
      })
    })

    /* @Test Suite: PATCH /cart
    *   Test Case 1: Checkout the cart - success
    *   Test Case 2: Checkout the cart - cart is not found
    *   Test Case 3: Checkout the cart - cart is empty
    *   Test Case 4: Checkout the cart - product is not in stock
    *   Test Case 5: Checkout the cart - user is not logged in
    */
    describe("PATCH /cart", () => {
      // Test Case 1: Checkout the cart - success
      test("It should return a 200 success code", async () => {
        await request(app)
            .post(`${basePath}/carts`)
            .set('Cookie', customerCookie)
            .send({model: "laptop2"})
            .expect(200)
        await request(app)
            .patch(`${basePath}/carts`)
            .set('Cookie', customerCookie)
            .expect(200)
      })

      // Test Case 5: Checkout the cart - user is not logged in
      test("It should return a 401 error code - user is not logged in", async () => {
        await request(app)
        .patch(`${basePath}/carts`)
        .expect(401)
      })
    })

    /* @Test Suite: GET /cart/history
    *   Test Case 1: Get the history of the carts - success
    */
    describe("GET /cart/history", () => {
      // Test Case 1: Get the history of the carts - success
      test(" It should return a 200 success code", async () => {
        await request(app)
            .get(`${basePath}/carts/history`)
            .set('Cookie', customerCookie)
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeInstanceOf(Array)
            })
      })
    })

    /* @Test Suite: DELETE /cart/products/:model
    *   Test Case 1: Remove a product from the cart - success
    *   Test Case 2: Remove a product from the cart - cart is not found
    *   Test Case 3: Remove a product from the cart - model is not found
    *   Test Case 4: Delete a quantity of a product from the cart - success
    *   Test Case 5: Delete a quantity of a product from the cart - product not in cart
    *   Test Case 6: Delete a quantity of a product from the cart - model is not found
    */ 
    describe("DELETE /cart/products/:model", () => {
      // Test Case 1: Remove a product from the cart - success
      test("It should return a 200 success code", async () => {
        let customer2Cookie = await login(customer);
        await request(app)
            .post(`${basePath}/carts`)
            .set('Cookie', customer2Cookie)
            .send({model: productModel})
            .expect(200)
        await request(app)
            .delete(`${basePath}/carts/products/${productModel}`)
            .set('Cookie', customer2Cookie)
            .send({model: "laptop"})
            .expect(200)
      })

      // Test Case 2: Remove a product from the cart - cart is not found
      test("It should return a 404 error code - the cart is not found", async () => {
        let customer6Cookie = await login(customer);
        await request(app)
            .post(`${basePath}/carts`)
            .set('Cookie', customer6Cookie)
            .send({model: "phone3"})
            .expect(200)
        await request(app).get('/ezelectronics/carts').set('Cookie', customer6Cookie).expect(200)
        await request(app)
            .delete(`${basePath}/carts/products/phone3`)  
            .set('Cookie', customer6Cookie)
            .send({model: "phone3"})
            .expect(200)
        await request(app).get('/ezelectronics/carts').set('Cookie', customer6Cookie).expect(200)
        
        await request(app)
            .delete(`${basePath}/carts/products/phone3`)  
            .set('Cookie', customer6Cookie)
            .send({model: "phone3"})
            .expect(404)
      })

      // Test Case 3: Remove a product from the cart - model is not found
      test("It should return 404 error - the model is not found", async () => {
        await request(app)
            .delete(`${basePath}/carts/products`)
            .set('Cookie', customerCookie)
            .send({model: "laptopp"})
            .expect(404)
      })

      // Test Case 4: Delete a quantity of a product from the cart - success
      test("It should return a 200 success code - delete a quantity", async () => {
        let customer2Cookie = await login(customer);
        await request(app)
            .post(`${basePath}/products`)
            .set('Cookie', adminCookie)
            .send(phone2)
            .expect(200)
        
        await request(app)
            .post(`${basePath}/carts`)
            .set('Cookie', customer2Cookie)
            .send({model: "phone2"})
            .expect(200)
        await request(app).get('/ezelectronics/carts').set('Cookie', customer2Cookie).expect(200)
        await request(app)
            .post(`${basePath}/carts`)
            .set('Cookie', customer2Cookie)
            .send({model: "phone2"})
            .expect(200)
        await request(app)
            .delete(`${basePath}/carts/products/phone2`)
            .set('Cookie', customer2Cookie)
            .send({model: "phone2"})
            .expect(200)
      })
      
      // Test Case 5: Delete a quantity of a product from the cart - product not in cart
      test("It should return a 404 error code - product non in the cart", async () => {
        let customer2Cookie = await login(customer);
        await request(app)
            .post(`${basePath}/carts`)
            .set('Cookie', customer2Cookie)
            .send({model: "laptop"})
            .expect(200)
        
        
        await request(app)
            .delete(`${basePath}/carts/current/products`)  
            .set('Cookie', customer2Cookie)
            .send({model: "prodotto2"})
            .expect(404)
      })

      // Test Case 6: Delete a quantity of a product from the cart - model is not found
      test("It should return a 404 error code - the model is not found",async () => {
        await request(app)
            .delete(`${basePath}/carts/products`)
            .set('Cookie', customerCookie)
            .send({model: ""})
            .expect(404)
      })
    })

    /* @Test Suite: DELETE /cart/current
    *   Test Case 1: Delete the current cart - success
    *   Test Case 2: Delete the current cart - cart is not found
    */
    describe("DELETE /cart/current", () => {
        // Test Case 1: Delete the current cart - success
        test("It should return a 200 success code", async () => {
            await request(app)
                .delete(`${basePath}/carts/current`)
                .set('Cookie', customerCookie)
                .expect(200)
        // Verify that the cart is empty
        const res = await request(app)
            .get(`${basePath}/carts`)
            .set('Cookie', customerCookie)
            .expect(200);
        expect(res.body.products).toHaveLength(0);
        });

        // Test Case 2: Delete the current cart - cart is not found
        test("It should return a 404 error code - the cart is not found", async () => {
        let customer2Cookie=await login(customer)
        await request(app)
            .post(`${basePath}/carts`)
            .set('Cookie', customer2Cookie)
            .send({model: "laptop"})
            .expect(200)
        await request(app)
            .patch(`${basePath}/carts`)
            .set('Cookie', customer2Cookie)
            .expect(200)
        await request(app)
            .delete(`${basePath}/carts/current`)
            .set('Cookie', customer2Cookie)
            .expect(404)
        })
    })

    /* @Test Suite: GET /cart/all
    *   Test Case 1: Get all carts - success
    *   Test Case 2: Get all carts - user is not an admin or manager
    */
    describe("GET /cart/all", () => {
        // Test Case 1: Get all carts - success
        test("IT should return a 200 success code", async () => {
          await request(app)
              .post(`${basePath}/products`)
              .set('Cookie', adminCookie)
              .send(laptop3)
              .expect(200)
          await request(app)
              .post(`${basePath}/carts`)
              .set('Cookie', customerCookie)
              .send(laptop3)
              .expect(200)
          await request(app)
              .get(`${basePath}/carts/all`)
              .set('Cookie', adminCookie)
              .expect(200)
              .expect((res) => {
                  expect(res.body).toBeInstanceOf(Array)
              })
        })
  
        // Test Case 2: Get all carts - user is not an admin or manager
        test("It should return a 401 error code - user is not an admin or manager", async () => {
          await request(app)
              .get(`${basePath}/carts/all`)
              .set('Cookie', customerCookie)
              .expect(401)
        })
      })

    /* @Test Suite: DELETE /cart
    *   Test Case 1: Delete all carts - success
    *   Test Case 2: Delete all carts - user is not logged in
    */
    describe("DELETE /cart", () => {
      // Test Case 1: Delete all carts - success
      test("It should return a 200 success code", async () => {
        await request(app)
            .delete(`${basePath}/carts`)
            .set('Cookie', adminCookie)
            .expect(200)
      })

      // Test Case 2: Delete all carts - user is not logged in
      test("It should return a 401 error code - user is not an admin or manager", async () => {
        await request(app)
            .delete(`${basePath}/carts`)
            .set('Cookie', customerCookie)
            .expect(401)
      })
    })
})