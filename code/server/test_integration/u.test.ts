import { describe, test, expect, beforeAll, afterAll } from "@jest/globals"
import request from 'supertest'
import { app } from "../index"
import db from "../src/db/db"
import { cleanup } from "../src/db/cleanup"

const basePath = "/ezelectronics"

const admin = {username: "admin", name: "admin", surname: "admin", password: "admin", role: "Admin"}
const admin2 = {username: "admin2", name: "admin2", surname: "admin2", password: "admin2", role: "Admin"}
const customer = {username: "customer", name: "customer", surname: "customer", password: "customer", role: "Customer"}
const customer2 = {username: "customer2", name: "customer2", surname: "customer2", password: "customer2", role: "Customer"}
const customer3 = {username: "customer3", name: "customer3", surname: "customer3", password: "customer3", role: "Customer"}
let customerCookie: string
let adminCookie: string
let admin2Cookie: string
let customer3Cookie: string
let customer2Cookie: string

// Function to create a user in the database
const createUser= async (user: any) => {
  await request(app).post(`${basePath}/users`).send(user)
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

beforeAll(async () => {
  //await cleanup()
  await createUser(admin)
  await createUser(customer)
  await createUser(admin2)
  adminCookie = await login(admin)
  admin2Cookie = await login(admin2)
})

afterAll(async () => {
  await cleanup()
})

describe("User integration tests", () => {
  
    /* @Test Suite 1 - POST for creating a new user
    *   Test Case 1: Create a new user - success
    *   Test Case 2: Create a new user - Empty value
    *   Test Case 3: Create a new user - user already exists
    */
    describe("POST /users", () => {
      // Test Case 1: Create a new user - success
      test("It should returno a 200 success code", async () => {
        const res = await request(app).post(`${basePath}/users`).send(customer2)
        expect(res.status).toBe(200)
        const users = await request(app).get(`${basePath}/users`).set('Cookie', adminCookie).expect(200)
        expect(users.body).toHaveLength(4)
        expect(users.body[3].username).toBe(customer2.username)
        expect(users.body[3].name).toBe(customer2.name)
        expect(users.body[3].surname).toBe(customer2.surname)
        expect(users.body[3].role).toBe(customer2.role)
      })

      // Test Case 2: Create a new user - Empty value
      test("It should return a 422 error code - empty value", async () => {
        const res = await request(app).post(`${basePath}/users`).send({username: "", name: "user", surname: "user", password: "user", role: "Customer"})
        expect(res.status).toBe(422)
        await request(app).post(`${basePath}/users`).send({username: "user", name: "", surname: "user", password: "user", role: "Customer"}).expect(422)
        await request(app).post(`${basePath}/users`).send({username: "user", name: "user", surname: "", password: "user", role: "Customer"}).expect(422)
        await request(app).post(`${basePath}/users`).send({username: "user", name: "user", surname: "user", password: "", role: "Customer"}).expect(422)
        await request(app).post(`${basePath}/users`).send({username: "user", name: "user", surname: "user", password: "user", role: ""}).expect(422)
      })

      // Test Case 3: Create a new user - user already exists
      test("It should return a 409 error code - user already exists", async () => {
        const res = await request(app).post(`${basePath}/users`).send(customer)
        expect(res.status).toBe(409)
      })
    })

    /* @Test Suite 2 - GET for getting all users
    *   Test Case 1: Get all users - success
    *   Test Case 2: Get all users - not Admin
    *   Test Case 3: Get all users - not authenticated
    */
    describe("GET /users", () => {
      // Test Case 1: Get all users - success
      test("It should return a 200 success code", async () => {
        const res = await request(app).get(`${basePath}/users`).set('Cookie', adminCookie)
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(4)
        expect(res.body[0].username).toBe(admin.username)
        expect(res.body[0].name).toBe(admin.name)
        expect(res.body[0].surname).toBe(admin.surname)
        expect(res.body[0].role).toBe(admin.role)
        expect(res.body[1].username).toBe(customer.username)
        expect(res.body[1].name).toBe(customer.name)
        expect(res.body[1].surname).toBe(customer.surname)
        expect(res.body[1].role).toBe(customer.role)
        expect(res.body[2].username).toBe(admin2.username)
        expect(res.body[2].name).toBe(admin2.name)
        expect(res.body[2].surname).toBe(admin2.surname)
        expect(res.body[2].role).toBe(admin2.role)
        expect(res.body[3].username).toBe(customer2.username)
        expect(res.body[3].name).toBe(customer2.name)
        expect(res.body[3].surname).toBe(customer2.surname)
        expect(res.body[3].role).toBe(customer2.role)
      })

      // Test Case 2: Get all users - not Admin
      test("It should return a 401 error code - user not Admin", async () => {
        customerCookie = await login(customer)
        const res = await request(app).get(`${basePath}/users`).set('Cookie', customerCookie)
        expect(res.status).toBe(401)
      })

      // Test Case 3: Get all users - not authenticated
      test("It should return a 401 error code - user not authenticated", async () => {
        const res = await request(app).get(`${basePath}/users`)
        expect(res.status).toBe(401)
      })
    })

    /* @Test Suite 3 - GET for getting a user by role
    *   Test Case 1: Get all users by role - success
    *   Test Case 2: Get all users by role - role not found
    *   Test Case 3: Get all users by role - not Admin
    */
    describe("GET /users/:role", () => {
      // Test Case 1: Get all users by role - success 
      test("It should return a 200 success code", async () => {
        const res = await request(app).get(`${basePath}/users/roles/${customer.role}`).set('Cookie', adminCookie)
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(2)
        expect(res.body[0].username).toBe(customer.username)
        expect(res.body[0].name).toBe(customer.name)
        expect(res.body[0].surname).toBe(customer.surname)
        expect(res.body[0].role).toBe(customer.role)
        expect(res.body[1].username).toBe(customer2.username)
        expect(res.body[1].name).toBe(customer2.name)
        expect(res.body[1].surname).toBe(customer2.surname)
        expect(res.body[1].role).toBe(customer2.role)
      })

      // Test Case 2: Get all users by role - role not found
      test("It should return a 422 error code - role not found", async () => {
        const res = await request(app).get(`${basePath}/users/roles/role`).set('Cookie', adminCookie)
        expect(res.status).toBe(422)
      })

      // Test Case 3: Get all users by role - not Admin
      test("It should return a 401 error code - user not Admin", async () => {
        const res = await request(app).get(`${basePath}/users/roles/${customer.role}`).set('Cookie', customerCookie)
        expect(res.status).toBe(401)
      })
    })

    /* @Test Suite 4 - GET for getting a user by username
    *   Test Case 1: Get a user by username - success
    *   Test Case 2: Get a user by username - user himself
    *   Test Case 3: Get a user by username - user not found
    *   Test Case 4: Get a user by username - user not authorized
    */
    describe("GET /users/:username", () => {
      // Test Case 1: Get a user by username - success
      test("It should return a 200 success code", async () => {
        const res = await request(app).get(`${basePath}/users/${customer.username}`).set('Cookie', adminCookie)
        expect(res.status).toBe(200)
        expect(res.body.username).toBe(customer.username)
        expect(res.body.name).toBe(customer.name)
        expect(res.body.surname).toBe(customer.surname)
        expect(res.body.role).toBe(customer.role)
      })

      // Test Case 2: Get a user by username - user himself
      test("It should return a 200 success code", async () => {
        const res = await request(app).get(`${basePath}/users/${customer.username}`).set('Cookie', customerCookie)
        expect(res.status).toBe(200)
        expect(res.body.username).toBe(customer.username)
        expect(res.body.name).toBe(customer.name)
        expect(res.body.surname).toBe(customer.surname)
        expect(res.body.role).toBe(customer.role)
      })

      // Test Case 3: Get a user by username - user not found
      test("It should return a 404 error code - user not found", async () => {
        const res = await request(app).get(`${basePath}/users/user`).set('Cookie', adminCookie)
        expect(res.status).toBe(404)
      })

      // Test Case 4: Get a user by username - user not authorized
      test("It should return a 401 error code - user not authorized", async () => {
        const res = await request(app).get(`${basePath}/users/${customer2.username}`).set('Cookie', customerCookie)
        expect(res.status).toBe(401)
      })
    })

    /* @Test Suite 5 - PATCH for updating a user by username
    *   Test Case 1: Update a user by username - success
    *   Test Case 2: Update a user by username - admin himself
    *   Test Case 3: Update a user by username - customer himself
    *   Test Case 4: Update a user by username - user not found
    *   Test Case 5: Update a user by username - user not authorized
    *   Test Case 6: Update a user by username - user not Admin
    *   Test Case 7: Update a user by username - wrong format birthdate
    *   Test Case 8: Update a user by username - birthdate after currentDate
    *   Test Case 9: Update a user by username - admin try to update other admin
    */
    describe("PATCH /users/:username", () => {
        // Test Case 1: Update a user by username - success
        test("It should return a 200 success code", async () => {
          const res = await request(app).patch(`${basePath}/users/${customer.username}`).send({name: "newName", surname: "customer", address: "indirizzo", birthdate: "2001-04-04"}).set('Cookie', adminCookie)
          expect(res.status).toBe(200)
          const user = await request(app).get(`${basePath}/users/${customer.username}`).set('Cookie', adminCookie)
          expect(user.body.username).toBe(customer.username)
          expect(user.body.name).toBe("newName")
          expect(user.body.surname).toBe(customer.surname)
          expect(user.body.role).toBe(customer.role)
        })
  
        // Test Case 2: Update a user by username - admin himself
        test("It should return a 200 success code", async () => {
          const res = await request(app).patch(`${basePath}/users/${admin.username}`).send({name: "newName", surname: "admin", address: "indirizzo", birthdate: "2001-04-04"}).set('Cookie', adminCookie)
          expect(res.status).toBe(200)
          const user = await request(app).get(`${basePath}/users/${admin.username}`).set('Cookie', adminCookie)
          expect(user.body.username).toBe(admin.username)
          expect(user.body.name).toBe("newName")
          expect(user.body.surname).toBe(admin.surname)
          expect(user.body.role).toBe(admin.role)
        })

        // Test Case 3: Update a user by username - customer himself
        test("It should return a 200 success code", async () => {
          const res = await request(app).patch(`${basePath}/users/${customer.username}`).send({name: "newName2", surname: "customer", address: "indirizzo", birthdate: "2001-04-04"}).set('Cookie', customerCookie)
          expect(res.status).toBe(200)
          const user = await request(app).get(`${basePath}/users/${customer.username}`).set('Cookie', customerCookie)
          expect(user.body.username).toBe(customer.username)
          expect(user.body.name).toBe("newName2")
          expect(user.body.surname).toBe(customer.surname)
          expect(user.body.role).toBe(customer.role)
        })

        // Test Case 4: Update a user by username - user not found
        test("It should return a 404 error code - user not found", async () => {
          const res = await request(app).patch(`${basePath}/users/user`).send({name: "newName", surname: "customer", address: "indirizzo", birthdate: "2001-04-04"}).set('Cookie', adminCookie)
          expect(res.status).toBe(404)
        })
  
        // Test Case 5: Update a user by username - user not authorized
        test("It should return a 401 error code - user not authorized", async () => {
          const res = await request(app).patch(`${basePath}/users/${customer2.username}`).send({name: "newName", surname: "customer2", address: "indirizzo", birthdate: "2001-04-04"}).set('Cookie', customerCookie)
          expect(res.status).toBe(401)
        })
  
        // Test Case 6: Update a user by username - user not Admin
        test("It should return a 401 error code - user not Admin", async () => {
          const res = await request(app).patch(`${basePath}/users/${admin.username}`).send({name: "newName", surname: "admin", address: "indirizzo", birthdate: "2001-04-04"}).set('Cookie', customerCookie)
          expect(res.status).toBe(401)
        })
  
        // Test Case 7: Update a user by username - wrong format birthdate
        test("It should return a 422 error code - wrong birthdate", async () => {
          const res = await request(app).patch(`${basePath}/users/${customer.username}`).send({name: "newName", surname: "customer", address: "indirizzo", birthdate: "wrong"}).set('Cookie', adminCookie)
          expect(res.status).toBe(422)
        })

        // Test Case 8: Update a user by username - birthdate after currentDate
        test("It should return a 400 error code - birthdate after currentDate", async () => {
          const res = await request(app).patch(`${basePath}/users/${customer.username}`).send({name: "newName", surname: "customer", address: "indirizzo", birthdate: "2024-10-10"}).set('Cookie', adminCookie)
          expect(res.status).toBe(400)
        })

        // Test Case 9: Update a user by username - admin try to update other admin
        test("It should return a 401 error code - admin try to update other admin", async () => {
          const res = await request(app).patch(`${basePath}/users/${admin2.username}`).send({name: "newName", surname: "admin2", address: "indirizzo", birthdate: "2001-04-04"}).set('Cookie', adminCookie)
          expect(res.status).toBe(401)
        })


      })

    /* @Test Suite 6 - DELETE for deleting a user by username
    *   Test Case 1: Delete a user by username - success
    *   Test Case 2: Delete a user by username - admin try to delete other admin
    *   Test Case 3: Delete a user by username - admin delete himself
    *   Test Case 4: Delete a user by username - customer delete himself
    *   Test Case 5: Delete a user by username - user not authorized
    *   Test Case 6: Delete a user by username - user not Admin
    */
    describe("DELETE /users/:username", () => {
      // Test Case 1: Delete a user by username - success
      test("It should return a 200 success code", async () => {
        const res = await request(app).delete(`${basePath}/users/${customer2.username}`).set('Cookie', adminCookie)
        expect(res.status).toBe(200)
        const users = await request(app).get(`${basePath}/users`).set('Cookie', adminCookie)
        expect(users.body).toHaveLength(3)
      })

      // Test Case 2: Delete a user by username - admin try to delete other admin
      test("It should return a 401 error code - admin try to delete other admin", async () => {
        const res = await request(app).delete(`${basePath}/users/${admin.username}`).set('Cookie', admin2Cookie)
        expect(res.status).toBe(401)
      })

      // Test Case 3: Delete a user by username - admin delete himself
      test("It should return a 200 success code", async () => {
        const res = await request(app).delete(`${basePath}/users/${admin2.username}`).set('Cookie', admin2Cookie)
        expect(res.status).toBe(200)
        const users = await request(app).get(`${basePath}/users`).set('Cookie', adminCookie)
        expect(users.body).toHaveLength(2)
      })

      // Test Case 4: Delete a user by username - customer delete himself
      test("It should return a 200 success code", async () => {
        await createUser(customer3)
        customer3Cookie = await login(customer3)
        const res = await request(app).delete(`${basePath}/users/${customer3.username}`).set('Cookie', customer3Cookie)
        expect(res.status).toBe(200)
        const users = await request(app).get(`${basePath}/users`).set('Cookie', adminCookie)
        expect(users.body).toHaveLength(2)
      })

      // Test Case 5: Delete a user by username - user not found
      test("It should return a 404 error code - user not found", async () => {
        const res = await request(app).delete(`${basePath}/users/user`).set('Cookie', adminCookie)
        expect(res.status).toBe(404)
      })

      // Test Case 6: Delete a user by username - user not Admin
      test("It should return a 401 error code - user not Admin", async () => {
        createUser(customer2)
        const res = await request(app).delete(`${basePath}/users/${customer2.username}`).set('Cookie', customerCookie)
        expect(res.status).toBe(401)
      })
    })

    /* @Test Suite 7 - DELETE for deleting all users
    *   Test Case 1: Delete all users - success
    *   Test Case 2: Delete all users - user not Admin
    */
    describe("DELETE /users", () => {
      // Test Case 1: Delete all users - success
      test("It should return a 200 success code", async () => {
        const res = await request(app).delete(`${basePath}/users`).set('Cookie', adminCookie)
        expect(res.status).toBe(200)
        const users = await request(app).get(`${basePath}/users`).set('Cookie', adminCookie)
        expect(users.body).toHaveLength(1)
      })

      // Test Case 2: Delete all users - user not Admin
      test("It should return a 401 error code - user not Admin", async () => {
        const res = await request(app).delete(`${basePath}/users`).set('Cookie', customerCookie)
        expect(res.status).toBe(401)
      })
    })
})

describe("Auth integration tests", () => {

  /* @Test Suite 1 - POST for creating a new session
  *   Test Case 1: Create a new session - success
  *   Test Case 2: Create a new session - user not found
  *   Test Case 3: Create a new session - wrong password
  */
  describe("POST /sessions", () => {
    // Test Case 1: Create a new session - success
    test("It should return a 200 success code", async () => {
      const res = await request(app).post(`${basePath}/sessions`).send({username: "admin", password: "admin"})
      expect(res.status).toBe(200)
    })

    // Test Case 2: Create a new session - wrong username
    test("It should return a 401 error code - user not found", async () => {
      const res = await request(app).post(`${basePath}/sessions`).send({username: "user", password: "user"})
      expect(res.status).toBe(401)
    })

    // Test Case 3: Create a new session - wrong password
    test("It should return a 401 error code - wrong password", async () => {
      const res = await request(app).post(`${basePath}/sessions`).send({username: "admin", password: "wrong"})
      expect(res.status).toBe(401)
    })
  })

  /* @Test Suite 2 - GET for getting the current session
  *   Test Case 1: Get the current session - success
  *   Test Case 2: Get the current session - user not authenticated
  */
  describe("GET /sessions", () => {
    // Test Case 1: Get the current session - success
    test("It should return a 200 success code", async () => {
      const res = await request(app).get(`${basePath}/sessions/current`).set('Cookie', adminCookie)
      expect(res.status).toBe(200)
      expect(res.body.username).toBe(admin.username)
      expect(res.body.name).toBe("newName")
      expect(res.body.surname).toBe(admin.surname)
      expect(res.body.role).toBe(admin.role)
    })
  })

  /* @Test Suite 3 - DELETE for deleting the current session
  *   Test Case 1: Delete the current session - success
  */
  describe("DELETE /sessions", () => {
    // Test Case 1: Delete the current session - success
    test("It should return a 200 success code", async () => {
      const res = await request(app).delete(`${basePath}/sessions/current`).set('Cookie', adminCookie)
      expect(res.status).toBe(200)
    })
  })
})
