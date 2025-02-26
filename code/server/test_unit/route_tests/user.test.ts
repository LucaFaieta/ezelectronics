import { describe, afterEach, test, expect, jest } from "@jest/globals"
import request from 'supertest'
import { app } from "../../index"
import { User, Role } from "../../src/components/user"
import UserController from "../../src/controllers/userController"
import Authenticator from "../../src/routers/auth"
import { UnauthorizedUserError, UserNotFoundError } from "../../src/errors/userError"
import { after } from "node:test"

const baseURL = "/ezelectronics/users"

jest.mock("../../src/routers/auth.ts") //Mock the authenticator

describe("UserRoutes", () => {
    const mockUser = {
        username: "test",
        name: "test",
        surname: "test",
        password: "test",
        role: "Manager",
        address: "via Prova",
        birthdate: "2000-01-01"
    }
    const mockUserAdmin1: User = {
        username: "test1",
        name: "test1",
        surname: "test1",
        role: Role.ADMIN,
        address: "via Prova",
        birthdate: "2000-01-01"
    }
    const mockUserAdmin2: User = {
        username: "test2",
        name: "test2",
        surname: "test2",
        role: Role.ADMIN,
        address: "via Prova",
        birthdate: "2000-01-01"
    }
    
    afterEach(() => {
        jest.clearAllMocks() //Clear all mocks after each test
        jest.resetAllMocks() //Reset all mocks after each test
    })
    

    /* @Test Suite 1 - POST for creating a new user
    *   Test Case 1: Create a new user - success
    *   Test Case 2: Create a new user - Empty value
    *   Test Case 3: Create a new user - Invalid role
    *   Test Case 4: Create a new user - createUser failed
    */
    describe("POST /users", () => {  
        // Test Case 1: Create a new user - success
        test("It should return a 200 success code", async () => {
            jest.spyOn(UserController.prototype, "createUser").mockResolvedValueOnce(true) //Mock the createUser method of the controller
            const response = await request(app).post(baseURL).send(mockUser) //Send a POST request to the route
            expect(response.status).toBe(200) //Check if the response status is 200
            expect(UserController.prototype.createUser).toHaveBeenCalledTimes(1) //Check if the createUser method has been called once
            //Check if the createUser method has been called with the correct parameters
            expect(UserController.prototype.createUser).toHaveBeenCalledWith(
                mockUser.username,
                mockUser.name,
                mockUser.surname,
                mockUser.password,
                mockUser.role)
        })

        // Test Case 2: Create a new user - Empty value
        test("It should return a 422 error code", async () => {
            const response = await request(app).post(baseURL).send(["testUser", "test", "password", "Admin"]) //Send a POST request to the route with a missing body's values
            expect(response.status).toBe(422) //Check if the response status is 400
            expect(UserController.prototype.createUser).toHaveBeenCalledTimes(0) //Check if the createUser method has been called once
        })

        // Test Case 3: Create a new user - Invalid role
        test("It should return a 422 error code", async () => {
            const response = await request(app).post(baseURL).send({...mockUser, role: "test"}) //Send a POST request to the route with an invalid role
            expect(response.status).toBe(422) //Check if the response status is 422
            expect(UserController.prototype.createUser).toHaveBeenCalledTimes(0) //Check if the createUser method has been called once
        })

        // Test Case 4: Create a new user - createUser failed
        test("It should return a 500 error code", async () => {
            jest.spyOn(UserController.prototype, "createUser").mockRejectedValueOnce(new Error("createUser failed")) //Mock the createUser method of the controller
            const response = await request(app).post(baseURL).send(mockUser) //Send a POST request to the route
            expect(response.status).toBe(503) //Check if the response status is 503
            expect(UserController.prototype.createUser).toHaveBeenCalledTimes(1) //Check if the createUser method has been called once
        })
    });

    /* @Test Suite 2 - GET for getting all users
    *   Test Case 1: Get all users - success
    *   Test Case 2: Get all users - getUsers failed
    *   Test Case 3: Get all users - Not Admin
    */
    describe("GET /users", () => {
        // Test Case 1: Get all users - success
        test("It should return a 200 success code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAdmin method of the authenticator
            jest.spyOn(UserController.prototype, "getUsers").mockResolvedValueOnce([]) //Mock the getUsers method of the controller
            const response = await request(app).get(baseURL) //Send a GET request to the route
            expect(response.status).toBe(200) //Check if the response status is 200
            expect(UserController.prototype.getUsers).toHaveBeenCalledTimes(1) //Check if the getUsers method has been called once
            expect(UserController.prototype.getUsers).toHaveBeenCalledWith() //Check if the getUsers method has been called with the correct parameters
        })

        // Test Case 2: Get all users - getUsers failed
        test("It should return a 503 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAdmin method of the authenticator
            jest.spyOn(UserController.prototype, "getUsers").mockRejectedValueOnce(new Error("getUsers failed")) //Mock the getUsers method of the controller
            const response = await request(app).get(baseURL) //Send a GET request to the route
            expect(response.status).toBe(503) //Check if the response status is 503
            expect(UserController.prototype.getUsers).toHaveBeenCalledTimes(1) //Check if the getUsers method has been called once
        })

        // Test Case 3: Get all users - Not Admin
        test("It should return a 401 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req: any, res: any, next: any) => res.status(401).json({error: "User is not an Admin", status: 401})) //Mock the isAdmin method of the authenticator
            jest.spyOn(UserController.prototype, "getUsers").mockResolvedValueOnce([]) //Mock the getUsers method of the controller
            const response = await request(app).get(baseURL) //Send a GET request to the route
            expect(response.status).toBe(401) //Check if the response status is 401
            expect(UserController.prototype.getUsers).toHaveBeenCalledTimes(0) //Check if the getUsers method has been called once
        })
    });

    /* @Test Suite 3 - GET for getting a user by role
    *   Test Case 1: Get a user by role - success
    *   Test Case 2: Get a user by role - getUsersByRole failed
    *   Test Case 3: Get a user by role - Not Admin
    */
    describe("GET /users/:role", () => {
        // Test Case 1: Get a user by role - success
        test("It should return a 200 success code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAdmin method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => (["Manager", "Admin", "Customer"]),
                })),
            }));
            jest.spyOn(UserController.prototype, "getUsersByRole").mockResolvedValueOnce([]) //Mock the getUsersByRole method of the controller
            const response = await request(app).get(baseURL + "/roles/Manager"); //Send a GET request to the route
            expect(response.status).toBe(200) //Check if the response status is 200
            expect(response.body).toEqual([]) //Check if the response body is an empty array
            expect(UserController.prototype.getUsersByRole).toHaveBeenCalledTimes(1) //Check if the getUsersByRole method has been called once
            expect(UserController.prototype.getUsersByRole).toHaveBeenCalledWith("Manager") //Check if the getUsersByRole method has been called with the correct parameters
        })

        // Test Case 2: Get a user by role - getUsersByRole failed
        test("It should return a 503 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAdmin method of the authenticator
            jest.spyOn(UserController.prototype, "getUsersByRole").mockRejectedValue(new Error("getUsersByRole failed")) //Mock the getUsersByRole method of the controller
            const response = await request(app).get(baseURL + "/roles/Customer") //Send a GET request to the route
            expect(response.status).toBe(503) //Check if the response status is 503
        })

        // Test Case 3: Get a user by role - Not Admin
        test("It should return a 401 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req: any, res: any, next: any) => res.status(401).json({error: "User is not an Admin", status: 401})) //Mock the isAdmin method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => (["Manager", "Admin", "Customer"]),
                })),
            }));
            jest.spyOn(UserController.prototype, "getUsersByRole").mockResolvedValueOnce([]) //Mock the getUsersByRole method of the controller
            const response = await request(app).get(baseURL + "/roles/Manager") //Send a GET request to the route
            expect(response.status).toBe(401) //Check if the response status is 401
        })
    });

    /* @Test Suite 4 - GET for getting a user by username
    *   Test Case 1: Get a user by username - success
    *   Test Case 2: Get a user by username - getUserByUsername failed
    *   Test Case 3: Get a user by username - Not Admin
    *   Test Case 4: Get a user by username - User does not exist
    */
    describe("GET /users/:username", () => {
        // Test Case 1: Get a user by username - success
        test("It should return a 200 success code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "getUserByUsername").mockResolvedValueOnce(mockUserAdmin1) //Mock the getUserByUsername method of the controller
            const response = await request(app).get(baseURL + "/test1") //Send a GET request to the route
            expect(response.status).toBe(200) //Check if the response status is 200
            expect(UserController.prototype.getUserByUsername).toHaveBeenCalledTimes(1) //Check if the getUserByUsername method has been called once
        })

        // Test Case 2: Get a user by username - getUserByUsername failed
        test("It should return a 503 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "getUserByUsername").mockRejectedValueOnce(new Error("getUserByUsername failed")) //Mock the getUserByUsername method of the controller
            const response = await request(app).get(baseURL + "/test") //Send a GET request to the route
            expect(response.status).toBe(503) //Check if the response status is 503
        })

        // Test Case 3: Get a user by username - Not Admin
        test("It should return a 401 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "getUserByUsername").mockImplementation((user, username) => {throw new UnauthorizedUserError()}) //Mock the getUserByUsername method of the controller
            const response = await request(app).get(baseURL + "/otherutente") //Send a GET request to the route
            expect(response.status).toBe(401) //Check if the response status is 401
        })

        // Test Case 4 : Get a user by username - User does not exist
        test("It should return a 401 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "getUserByUsername").mockImplementation((user, username) => { throw new UserNotFoundError()}) //Mock the getUserByUsername method of the controller
            const response = await request(app).get(baseURL + "/notexist") //Send a GET request to the route
            expect(response.status).toBe(404) //Check if the response status is 401
        })
    });

    /* @Test Suite 5 - DELETE for deleting a user by username
    *   Test Case 1: Delete a user by username - success
    *   Test Case 2: Delete a user by username - deleteUser failed
    *   Test Case 3: Delete a user by username - Not Admin
    *   Test Case 4: Delete a user by username - User does not exist
    *   Test Case 5: Delete a user by username - User is not the same as the one to delete
    */
    describe("DELETE /users/:username", () => {
        // Test Case 1: Delete a user by username - success
        test("It should return a 200 success code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "deleteUser").mockResolvedValueOnce(true) //Mock the deleteUser method of the controller
            const response = await request(app).delete(baseURL + "/test1") //Send a DELETE request to the route
            expect(response.status).toBe(200) //Check if the response status is 200
            expect(UserController.prototype.deleteUser).toHaveBeenCalledTimes(1) //Check if the deleteUser method has been called once
        })

        // Test Case 2: Delete a user by username - deleteUser failed
        test("It should return a 503 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "deleteUser").mockRejectedValueOnce(new Error("deleteUser failed")) //Mock the deleteUser method of the controller
            const response = await request(app).delete(baseURL + "/test") //Send a DELETE request to the route
            expect(response.status).toBe(503) //Check if the response status is 503
        })

        // Test Case 3: Delete a user by username - Not Admin
        test("It should return a 401 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "deleteUser").mockImplementation((user, username) => {throw new UnauthorizedUserError()}) //Mock the deleteUser method of the controller
            const response = await request(app).delete(baseURL + "/otherutente") //Send a DELETE request to the route
            expect(response.status).toBe(401) //Check if the response status is 401
        })

        // Test Case 4: Delete a user by username - User does not exist
        test("It should return a 404 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "deleteUser").mockImplementation((user, username) => { throw new UserNotFoundError()}) //Mock the deleteUser method of the controller
            const response = await request(app).delete(baseURL + "/notexist") //Send a DELETE request to the route
            expect(response.status).toBe(404) //Check if the response status is 404
        })

        // Test Case 5: Delete a user by username - User is not the same as the one to delete
        test("It should return a 401 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "deleteUser").mockImplementation((user, username) => { throw new UnauthorizedUserError()}) //Mock the deleteUser method of the controller
            const response = await request(app).delete(baseURL + "/test1") //Send a DELETE request to the route
            expect(response.status).toBe(401) //Check if the response status is 401
        })
    });

    /* @Test Suite 6 - DELETE for deleting all users
    *   Test Case 1: Delete all users - success
    *   Test Case 2: Delete all users - deleteUser failed
    *   Test Case 3: Delete all users - Not Admin
    */
    describe("DELETE /users", () => {
        // Test Case 1: Delete all users - success
        test("It should return a 200 success code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAdmin method of the authenticator
            jest.spyOn(UserController.prototype, "deleteAll").mockResolvedValueOnce(true) //Mock the deleteAllUsers method of the controller
            const response = await request(app).delete(baseURL) //Send a DELETE request to the route
            expect(response.status).toBe(200) //Check if the response status is 200
            expect(UserController.prototype.deleteAll).toHaveBeenCalledTimes(1) //Check if the deleteAllUsers method has been called once
        })

        // Test Case 2: Delete all users - deleteUser failed
        test("It should return a 503 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAdmin method of the authenticator
            jest.spyOn(UserController.prototype, "deleteAll").mockRejectedValueOnce(new Error("deleteAllUsers failed")) //Mock the deleteAllUsers method of the controller
            const response = await request(app).delete(baseURL) //Send a DELETE request to the route
            expect(response.status).toBe(503) //Check if the response status is 503
        })

        // Test Case 3: Delete all users - Not Admin
        test("It should return a 401 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isAdmin").mockImplementation((req: any, res: any, next: any) => res.status(401).json({error: "User is not an Admin", status: 401})) //Mock the isAdmin method of the authenticator
            jest.spyOn(UserController.prototype, "deleteAll").mockResolvedValueOnce(true) //Mock the deleteAllUsers method of the controller
            const response = await request(app).delete(baseURL) //Send a DELETE request to the route
            expect(response.status).toBe(401) //Check if the response status is 401
        })
    });

    /* @Test Suite 7 - PATCH for updating a user by username
    *   Test Case 1: Update a user by username - success
    *   Test Case 2: Update a user by username - updateUser failed
    *   Test Case 3: Update a user by username - Not Admin
    *   Test Case 4: Update a user by username - User does not exist
    *   Test Case 5: Update a user by username - User is not the same as the one to update
    *   Test Case 6: Update a user by username - Wrong birthdate
    */
    describe("PATCH /users/:username", () => {
        // Test Case 1: Update a user by username - success
        test("It should return a 200 success code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "updateUserInfo").mockResolvedValueOnce(mockUserAdmin1) //Mock the updateUser method of the controller
            const response = await request(app).patch(baseURL + "/test1").send(mockUserAdmin1) //Send a PATCH request to the route
            expect(response.status).toBe(200) //Check if the response status is 200
            expect(UserController.prototype.updateUserInfo).toHaveBeenCalledTimes(1) //Check if the updateUser method has been called once
        })

        // Test Case 2: Update a user by username - updateUser failed
        test("It should return a 503 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "updateUserInfo").mockRejectedValueOnce(new Error("updateUser failed")) //Mock the updateUser method of the controller
            const response = await request(app).patch(baseURL + "/test").send(mockUserAdmin1) //Send a PATCH request to the route
            expect(response.status).toBe(503) //Check if the response status is 503
        })

        // Test Case 3: Update a user by username - Not Admin
        test("It should return a 401 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "updateUserInfo").mockImplementation((user, username) => {throw new UnauthorizedUserError()}) //Mock the updateUser method of the controller
            const response = await request(app).patch(baseURL + "/otherutente").send(mockUserAdmin1) //Send a PATCH request to the route
            expect(response.status).toBe(401) //Check if the response status is 401
        })

        // Test Case 4: Update a user by username - User does not exist
        test("It should return a 404 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "updateUserInfo").mockImplementation((user, username) => { throw new UserNotFoundError()}) //Mock the updateUser method of the controller
            const response = await request(app).patch(baseURL + "/notexist").send(mockUserAdmin1) //Send a PATCH request to the route
            expect(response.status).toBe(404) //Check if the response status is 404
        })

        // Test Case 5: Update a user by username - User is not the same as the one to update
        test("It should return a 401 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    notEmpty: () => ({}),
                })),
            }));
            jest.spyOn(UserController.prototype, "updateUserInfo").mockImplementation((user, username) => { throw new UnauthorizedUserError()}) //Mock the updateUser method of the controller
            const response = await request(app).patch(baseURL + "/test1").send(mockUserAdmin2) //Send a PATCH request to the route
            expect(response.status).toBe(401) //Check if the response status is 401
        })

        // Test Case 6: Update a user by username - Wrong birthdate
        test("It should return a 422 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            const response = await request(app).patch(baseURL + "/test1").send({...mockUserAdmin1, birthdate: "wrong"}) //Send a PATCH request to the route with a wrong birthdate
            expect(response.status).toBe(422) //Check if the response status is 422
        })
    });
});

describe("AuthRoutes", () => {
    const mockUser = {
        username: "test",
        name: "test",
        surname: "test",
        password: "test",
        role: "Manager",
        address: "via Prova",
        birthdate: "2000-01-01"
    }
    const mockUserAdmin1: User = {
        username: "test1",
        name: "test1",
        surname: "test1",
        role: Role.ADMIN,
        address: "via Prova",
        birthdate: "2000-01-01"
    }
    afterEach(() => {
        jest.clearAllMocks() //Clear all mocks after each test
        jest.resetAllMocks() //Reset all mocks after each test
    })

    /* @Test Suite 8 - POST for logging in
    *   Test Case 1: Login - success
    *   Test Case 2: Login - login failed
    *   Test Case 3: Login - User does not exist
    */
    describe("POST /login", () => {
        // Test Case 1: Login - success
        test("It should return a 200 success code", async () => {
            jest.spyOn(Authenticator.prototype, "login").mockResolvedValueOnce(mockUserAdmin1) //Mock the login method of the authenticator
            const response = await request(app).post("/ezelectronics/sessions").send([mockUserAdmin1.username, "test1"]) //Send a POST request to the route
            expect(response.status).toBe(200) //Check if the response status is 200
            expect(response.body).toEqual(mockUserAdmin1) //Check if the response body is the token
        })

        // Test Case 2: Login - login failed
        test("It should return a 401 error code", async () => {
            jest.spyOn(Authenticator.prototype, "login").mockRejectedValueOnce(new Error("login failed")) //Mock the login method of the authenticator
            const response = await request(app).post("/ezelectronics/sessions").send(mockUserAdmin1) //Send a POST request to the route
            expect(response.status).toBe(401) //Check if the response status is 401
        })

        // Test Case 3: Login - User does not exist
        test("It should return a 404 error code", async () => {
            jest.spyOn(Authenticator.prototype, "login").mockRejectedValueOnce(new UserNotFoundError()) //Mock the login method of the authenticator
            const response = await request(app).post("/ezelectronics/login").send({username: "test", password: "test"}) //Send a POST request to the route
            expect(response.status).toBe(404) //Check if the response status is 404
        })
    });

    /* @Test Suite 9 - DELETE for logging out
    *   Test Case 1: Logout - success
    *   Test Case 2: Logout - logout failed
    */
    describe("DELETE /logout", () => {
        // Test Case 1: Logout - success
        test("It should return a 200 success code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "logout").mockResolvedValueOnce(null) //Mock the logout method of the authenticator
            const response = await request(app).delete("/ezelectronics/sessions/current") //Send a DELETE request to the route
            expect(response.status).toBe(200) //Check if the response status is 200
        })

        // Test Case 2: Logout - logout failed
        test("It should return a 503 error code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "logout").mockRejectedValueOnce(new Error("logout failed")) //Mock the logout method of the authenticator
            const response = await request(app).delete("/ezelectronics/sessions/current") //Send a DELETE request to the route
            expect(response.status).toBe(503) //Check if the response status is 503
        })
    });

    /* @Test Suite 10 - GET for getting the current user
    *   Test Case 1: Get the current user - success
    *   Test Case 2: Get the current user - Not logged in
    */
    describe("GET /current", () => {
        // Test Case 1: Get the current user - success
        test("It should return a 200 success code", async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            const response = await request(app).get("/ezelectronics/sessions/current") //Send a GET request to the route
            expect(response.status).toBe(200) //Check if the response status is 200
        })
    });
});
