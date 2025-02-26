import { describe, test, expect, jest, beforeEach} from "@jest/globals"
import UserDAO from "../../src/dao/userDAO"
import crypto from "crypto"
import db from "../../src/db/db"
import { Database } from "sqlite3"
import { User, Role } from "../../src/components/user"
import { UserNotFoundError, UserAlreadyExistsError } from "../../src/errors/userError"

jest.mock("crypto")
jest.mock("../../src/db/db.ts")

describe("UserDAO", () => {
    let userDAO: UserDAO;

    const user = {
        username: "utente", 
        name: "utente", 
        surname: "utente", 
        role: "Manager", 
        address: "via Prova", 
        birthdate: "2000-01-01"
    };

    const users = [{
        username: "utente", 
        name: "utente", 
        surname: "utente", 
        role: "Customer", 
        address: "via prova", 
        birthdate:"2000-01-01" 
    },
    {
        username: "utente2", 
        name: "utente2", 
        surname: "utente2", 
        role: "Manager", 
        address: "via prova2", 
        birthdate:"2002-02-02" 
    }]

    beforeEach(() => {
        userDAO = new UserDAO();
    });

    /* @Test Suite 1: getIsUserAuthenticated
    *   Test Case 1: Success
    *   Test Case 2: Error - No username
    *   Test Case 3: Error - Wrong password
    *   Test Case 4: DB error
    */
    describe("getIsUserAuthenticated", () => {
        // Test Case 1: Success
        test("should return true - success", async () => {
            const user = {username: "username", password: Buffer.from("hashedPassword").toString('hex'), salt: Buffer.from("salt").toString('hex')}
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, user);
                return {} as Database;
            });
    
            const mockScryptSync = jest.spyOn(crypto, "scryptSync").mockImplementation((password, salt, keylen) => {
                return Buffer.from("hashedPassword");
            });
    
            const mock = jest.spyOn(crypto, "timingSafeEqual").mockImplementation((password, hexpsw) => {
                return true;
            });
    
            try {
                const result = await userDAO.getIsUserAuthenticated("username", "password");
                expect(result).toBe(true);
            } 
            finally {
                mockDBGet.mockRestore();
                mockScryptSync.mockRestore();
            }
        });

        // Test Case 2: Error - No username
        test("getIsUserAuthenticated - error no username", async () => {
            const user = {
                username: "nousername", 
                password: Buffer.from("hashedPassword").toString('hex'), 
                salt: Buffer.from("salt").toString('hex')
            }

            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, user)
                return {} as Database
            });
    
            const mockScryptSync = jest.spyOn(crypto, "scryptSync").mockImplementation((password, salt, keylen) => {
                return Buffer.from("hashedPassword");
            });
    
            const mock = jest.spyOn(crypto, "timingSafeEqual").mockImplementation((password, hexpsw) => {
                return true;
            });
    
            try {
                const result = await userDAO.getIsUserAuthenticated("username", "password");
                expect(result).toBe(false);
            } finally {
                mockDBGet.mockRestore();
                mockScryptSync.mockRestore();
                mock.mockRestore();
            }
        });

        // Test Case 3: Error - Wrong password
        test("getIsUserAuthenticated - error wrong password", async () => {
            const user = {
                username: "username", 
                password: Buffer.from("hashedPassword").toString('hex'), 
                salt: Buffer.from("salt").toString('hex')
            }
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, user)
                return {} as Database
            });
    
            const mockScryptSync = jest.spyOn(crypto, "scryptSync").mockImplementation((password, salt, keylen) => {
                return Buffer.from("hashedPassword");
            });
    
            const mock = jest.spyOn(crypto, "timingSafeEqual").mockImplementation((password, hexpsw) => {
                return false;
            });
    
            try {
                const result = await userDAO.getIsUserAuthenticated("username", "nopassword");
                expect(result).toBe(false);
            } finally {
                mockDBGet.mockRestore();
                mockScryptSync.mockRestore();
                mock.mockRestore();
            }
        });

        // Test Case 4: DB error
        test("getIsUserAuthenticated - DB error", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                throw new Error("Database error");
            });
        
            try {
                await expect(userDAO.getIsUserAuthenticated("username", "password")).rejects.toThrow("Database error");
            } finally {
                mockDBGet.mockRestore();
            }
        });
       
        // Test Case 5: Error DB fails internally
        test("getIsUserAuthenticated - DB internal error", async () => {
            const mockDBAll = jest.spyOn(db, "get").mockImplementation((sql, param,  callback) => {
                callback(new Error());
                return {} as Database
            });
            try {
                await expect(userDAO.getIsUserAuthenticated("username", "password")).rejects.toThrow(Error);
            } finally {
                mockDBAll.mockRestore();
            }
        });
    });
    
    /* @Test Suite 2: createUser
    *   Test Case 1: Success
    *   Test Case 2: Username already exists - UserAlreadyExists
    *   Test Case 3: DB error
    */
    describe("createUser", () => {
        // Test Case 1: Success
        test("createUser - success", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null)
                return {} as Database
            });

            const mockRandomBytes = jest.spyOn(crypto, "randomBytes").mockImplementation((size) => {
                return (Buffer.from("salt"));
            });

            const mockScrypt = jest.spyOn(crypto, "scrypt").mockImplementation(async (password, salt, keylen) => {
                return Buffer.from("hashedPassword");
            });

            const result = await userDAO.createUser("username", "name", "surname", "password", "role");
            expect(result).toBe(true);
            mockRandomBytes.mockRestore();
            mockDBRun.mockRestore();
            mockScrypt.mockRestore();
        });
    
        // Test Case 2: Username already exists - UserAlreadyExists
        test("createUser - Errore UserAlreadyExists", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(new Error("SQLITE_CONSTRAINT: UNIQUE constraint failed: users.username"));
                return {} as Database
            });
        
            const mockRandomBytes = jest.spyOn(crypto, "randomBytes").mockImplementation((size) => {
                return Buffer.from("salt");
            });
        
            const mockScryptSync = jest.spyOn(crypto, "scryptSync").mockImplementation((password, salt, keylen) => {
                return Buffer.from("hashedPassword");
            });
        
            try {
                await expect(userDAO.createUser("username", "name", "surname", "password", "role")).rejects.toThrow(UserAlreadyExistsError);
            } finally {
                mockDBRun.mockRestore();
                mockRandomBytes.mockRestore();
                mockScryptSync.mockRestore();
            }
        });

        // Test Case 3: DB error
        test("createUser - DB error", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                throw new Error("Database error");
            });
        
            try {
                await expect(userDAO.createUser("username", "name", "surname", "password", "role")).rejects.toThrow("Database error");
            } finally {
                mockDBRun.mockRestore();
            }
        });
    });

    /* @Test Suite 3: getUserByUsername
    *   Test Case 1: Success
    *   Test Case 2: Error - Generic error on user
    *   Test Case 3: Error - DB error
    *   Test Case 4: User not found - UserNotFoundError
    */
    describe("getUserByUsername", () => {
        // Test Case 1: Success
        test("getUserByUsername  - success", async () => {            
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, user)
                return {} as Database
            });
    
            try {
                const result = await userDAO.getUserByUsername("utente");
                expect(result).toEqual(user)
            } finally {
                mockDBGet.mockRestore();
            }
        });
        
        // Test Case 2: Error - Generic error on user
        test("getUserByUsername  - errore generico", async () => {
            const err = new Error();
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(err)
                return {} as Database
            });
    
            try {
                await expect(userDAO.getUserByUsername("utente")).rejects.toThrow(err);
            } finally {
                mockDBGet.mockRestore();
            }
        });
        
        // Test Case 3: Error - DB error
        test("getUserByUsername  - DB error", async () => {
            const err = new Error("DB Error");
    
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                throw err;
            });
    
            try {
                await expect(userDAO.getUserByUsername("notexist")).rejects.toThrow(err);
            } finally {
                mockDBGet.mockRestore();
            }
        });
    
        // Test Case 4: Error - UserNotFoundError
        test("getUserByUsername  - User not found error", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, null);
                return {} as Database;
            });
    
            try {
                await expect(userDAO.getUserByUsername("notexist")).rejects.toThrow(UserNotFoundError);
            } finally {
                mockDBGet.mockRestore();
            }
        });
    });

    /* @Test Suite 4: getAllUsers
    *   Test Case 1: Success
    *   Test Case 2: Error - DB error
    *   Test Case 3: Error - Generic error on user
    */
    describe("getAllUsers", () => {
        // Test Case 1: Success
        test("getAllUsers - success", async () => {
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, callback) => {
                callback(null, users)
                return {} as Database
            });
    
            try {
                const result = await userDAO.getAllUsers();
                expect(result).toEqual(users);
            } finally {
                mockDBAll.mockRestore();
            }
        });
        
        // Test Case 2: Error - DB error
        test("getUsers - DB error", async () => {
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, callback) => {
                throw new Error("Database error");
            });

            try {
                await expect(userDAO.getAllUsers()).rejects.toThrow("Database error");
            } finally {
                mockDBAll.mockRestore();
            }
        });

        // Test Case 3: Error - Generic error on user
        test("getUsers - errore generico", async () => {
            const err = new Error();
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, callback) => {
                callback(err);
                return {} as Database
            });
            try {
                await expect(userDAO.getAllUsers()).rejects.toThrow(err);
            } finally {
                mockDBAll.mockRestore();
            }
        });
    });

    /* @Test Suite 5: getUsersByRole
    *   Test Case 1: Success
    *   Test Case 2: Error - DB error
    *   Test Case 3: Error - DB error fails internally
    */
    describe("getUsersByRole", () => {
        // Test Case 1: Success
        test("getUsersByRole - success", async () => {
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, user)
                return {} as Database
            });
    
            try {
                const result = await userDAO.getUsersByRole(user.role);
                expect(result).toEqual(user);
            } finally {
                mockDBAll.mockRestore();
            }
        });

        // Test Case 2: Error - DB error
        test("getUsersByRole - DB error", async () => {
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, callback) => {
                throw new Error("Database error");
            });
            try {
                await expect(userDAO.getUsersByRole("Manager")).rejects.toThrow("Database error");
            } finally {
                mockDBAll.mockRestore();
            }
        });

        // Test Case 3: DB Error fails internally
        test("getUsersByRole - DB error", async () => {
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, param,  callback) => {
                callback(new Error());
                return {} as Database
            });
            try {
                await expect(userDAO.getUsersByRole("Manager")).rejects.toThrow(Error);
            } finally {
                mockDBAll.mockRestore();
            }
        });
    });

    /* @Test Suite 6: deleteUser
    *   Test Case 1: Success
    *   Test Case 2: Error - DB error
    *   Test Case 3: Error - Generic error on user
    */
    describe("deleteUser", () => {
        // Test Case 1: Success
        test("deleteUser - success", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database
            });

            try {
                const result = await userDAO.deleteUser("utente");
                expect(result).toBe(true);
            } finally {
                mockDBRun.mockRestore();
            }
        });

        // Test Case 2: Error - DB error
        test("deleteUser - DB error", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                throw new Error("Database error");
            });

            try {
                await expect(userDAO.deleteUser("utente")).rejects.toThrow("Database error");
            } finally {
                mockDBRun.mockRestore();
            }
        });

        // Test Case 3: Error - Generic error on user
        test("deleteUser - errore generico", async () => {
            const errore = new Error();
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(errore);
                return {} as Database
            });

            try {
                await expect(userDAO.deleteUser("utente")).rejects.toThrow(errore);
            } finally {
                mockDBRun.mockRestore();
            }
        });
    });

    /* @Test Suite 7: deleteAll
    *   Test Case 1: Success
    *   Test Case 2: Error - DB error
    *   Test Case 3: Error - Generic error on user
    */
    describe("deleteAll", () => {
        // Test Case 1: Success
        test("deleteAll - success ", async ()=>{
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
                callback(null);
                return {} as Database
            });
            try {
                const result = await userDAO.deleteAllUsers();
                 expect(result).toBe(true);
            } finally {
                mockDBRun.mockRestore();
            }
        });
    
        // Test Case 2: Error - DB error
        test("deleteAll  - DB error", async () => {
            const err = new Error("DB Error");
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
                throw err;
            });
    
            try {
                expect(userDAO.deleteAllUsers()).rejects.toThrow(err);
            } finally {
                mockDBRun.mockRestore();
            }
        });
    
        // Test Case 3: Error - Generic error on user
        test("deleteAll  - errore generico", async () => {
            const err = new Error();
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
                callback(err);
                return {} as Database
            });
    
            try {
                expect(userDAO.deleteAllUsers()).rejects.toThrow(err);
            } finally {
                mockDBRun.mockRestore();
            }
        });
    });

    /* @Test Suite 8: patchUser
    *   Test Case 1: Success
    *   Test Case 2: Error - DB error
    */
    describe("patchUser", () => {
        // Test Case 1: Success
        test("patchUser - success as Admin updating non-Admin", async () => {
            const updatedUser = new User("testuser", "NewName", "NewSurname", Role.CUSTOMER, "", "");
    
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database
            });
    
            jest.spyOn(userDAO, "getUserByUsername").mockResolvedValue(updatedUser);
            const result = await userDAO.updateUserInfo("NewName", "NewSurname", "NewAddress", "2000-01-01", "testuser");
            try{
                await expect(result).toEqual(updatedUser);
            }finally{
                mockDBRun.mockRestore();
            }
        });

        // Test Case 2: Error - DB error
        test("patchUser - DB error", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                throw new Error("Database error");
            });

            try {
                await expect(userDAO.updateUserInfo("NewName", "NewSurname", "NewAddress", "2000-01-01", "testuser")).rejects.toThrow("Database error");
            } finally {
                mockDBRun.mockRestore();
            }
        });

        // Test Case 3: DB Error fails internally
        test("patchUser - DB error", async () => {
            const mockDBAll = jest.spyOn(db, "run").mockImplementation((sql, param,  callback) => {
                callback(new Error());
                return {} as Database
            });
            try {
                await expect(userDAO.updateUserInfo("NewName", "NewSurname", "NewAddress", "2000-01-01", "testuser")).rejects.toThrow(Error);
            } finally {
                mockDBAll.mockRestore();
            }
        });
    });
});

