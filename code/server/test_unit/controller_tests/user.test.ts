import { expect, jest, test, afterEach, describe } from "@jest/globals"
import UserController from "../../src/controllers/userController"
import UserDAO from "../../src/dao/userDAO"
import { User, Role } from "../../src/components/user"

import { UnauthorizedUserError, UserNotFoundError, UserIsAdminError, UserNotAdminError } from "../../src/errors/userError"
import { DateError } from "../../src/utilities"


jest.mock("../../src/dao/userDAO")

describe("UserController", () => {
    const userController = new UserController();
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
    const mockUserManager: User = {
        username: "test3",
        name: "test3",
        surname: "test2",
        role: Role.MANAGER,
        address: "via Prova",
        birthdate: "2000-01-01"
    }
    const mockUserCustomer: User = {
        username: "test4",
        name: "test4",
        surname: "test4",
        role: Role.CUSTOMER,
        address: "via Prova",
        birthdate: "2000-01-01"
    }
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    })
    
    /* @Test Suite 1 - createUser
    *   Test Case 1: Create a new user - success
    */
    describe("createUser", () => {
        // Test Case 1: Create a new user - success
        test("should return true", async () => {
            jest.spyOn(UserDAO.prototype, "createUser").mockResolvedValueOnce(true);

            const response = await userController.createUser(
                mockUser.username,
                mockUser.name,
                mockUser.surname,
                mockUser.password,
                mockUser.role);

            expect(UserDAO.prototype.createUser).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.createUser).toHaveBeenCalledWith(
                mockUser.username,
                mockUser.name,
                mockUser.surname,
                mockUser.password,
                mockUser.role);
            expect(response).toBe(true);
        })
    });

    /* @Test Suite 2 - getUsers
    *   Test Case 1: success
    */
    describe("getUsers", () => {
        // Test Case 1: Get all users - success
        test("should return the user", async () => {
            jest.spyOn(UserDAO.prototype, "getAllUsers").mockResolvedValueOnce([]);

            const response = await userController.getUsers();

            expect(UserDAO.prototype.getAllUsers).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.getAllUsers).toHaveBeenCalledWith();
            expect(response).toEqual([]); 
        });
    });

    /* @Test Suite 3 - getUsersByRole
    *   Test Case 1: success
    */
    describe("getUsersByRole", () => {
        // Test Case 1: Get all users by role - success
        test("should return the user", async () => {
            jest.spyOn(UserDAO.prototype, "getUsersByRole").mockResolvedValueOnce([]);

            const response = await userController.getUsersByRole(mockUser.role);

            expect(UserDAO.prototype.getUsersByRole).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.getUsersByRole).toHaveBeenCalledWith(mockUser.role);
            expect(response).toEqual([]);
        });
    });

    /* @Test Suite 4 - getUserByUsername
    *   Test Case 1: Admin
    *   Test Case 2: Manager/Customer
    *   Test Case 3: Customer - UnauthorizedUserError
    */
    describe("getUserByUsername", () => {
        // Test Case 1: Admin 
        test("should return the user - Admin", async () => {
            jest.spyOn(UserDAO.prototype, "getUserByUsername").mockResolvedValueOnce(mockUserManager);
            
            const response = await userController.getUserByUsername(mockUserAdmin2, mockUserManager.username);
            
            expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledWith(mockUserManager.username);
            expect(response).toBe(mockUserManager); 
        });

        // Test Case 2: Manager/Customer
        test("should return the user - Manager/Customer", async () => {
            jest.spyOn(UserDAO.prototype, "getUserByUsername").mockResolvedValueOnce(mockUserManager);
            
            const response = await userController.getUserByUsername(mockUserManager, mockUserManager.username);
            
            expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledWith(mockUserManager.username);
            expect(response).toBe(mockUserManager); 
        });

        // Test Case 3: Customer - UnauthorizedUserError
        test("should return error 401- UnauthorizedUserError ", async () => {
            try{
                await expect(userController.getUserByUsername(mockUserCustomer, mockUserManager.username)).rejects.toThrow(new UnauthorizedUserError());
            } 
            finally{
                expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(0);
            }
        });
    });

    /* @Test Suite 5 - deleteUser
    *   Test Case 1: Admin delete himself
    *   Test Case 2: Admin delete other user
    *   Test Case 3: Admin delete other user - UserIsAdminError
    *   Test Case 4: User delete himself
    *   Test Case 5: User delete other user - UserNotAdminError
    */
    describe("deleteUser", () => {
        // Test Case 1: Admin delete himself
        test("should return true - Admin delete himself", async () => {
            jest.spyOn(UserDAO.prototype, "deleteUser").mockResolvedValueOnce(true);
            jest.spyOn(UserDAO.prototype, "getUserByUsername").mockResolvedValueOnce(mockUserAdmin2);

            const response = await userController.deleteUser(mockUserAdmin2, mockUserAdmin2.username);

            expect(UserDAO.prototype.deleteUser).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.deleteUser).toHaveBeenCalledWith(mockUserAdmin2.username);
            expect(response).toBe(true); 
        });

        // Test Case 2: Admin delete other user
        test("should return error 404 - UserNotFoundError ", async () => {
            jest.spyOn(UserDAO.prototype, "getUserByUsername").mockImplementation(() => {
                throw new UserNotFoundError();
            });

            try{
                await expect(userController.deleteUser(mockUserAdmin2, "utente")).rejects.toThrow(new UserNotFoundError());
            } 
            finally{
                expect(UserDAO.prototype.deleteUser).toHaveBeenCalledTimes(0);
                expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(1);
                expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledWith("utente");
            }
        });

        // Test Case 3: Admin delete other user
        test("should return true - Admin delete other user", async () => {
            jest.spyOn(UserDAO.prototype, "deleteUser").mockResolvedValueOnce(true);
            jest.spyOn(UserDAO.prototype, "getUserByUsername").mockResolvedValueOnce(mockUserManager);

            const response = await userController.deleteUser(mockUserAdmin2, mockUserManager.username);

            expect(UserDAO.prototype.deleteUser).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.deleteUser).toHaveBeenCalledWith(mockUserManager.username);
            expect(response).toBe(true); 
        });

        // Test Case 4: Admin delete other admin - UserIsAdminError
        test("should return error 401 - UserIsAdminError", async () => {
            jest.spyOn(UserDAO.prototype, "getUserByUsername").mockResolvedValueOnce(mockUserAdmin2);

            try{
                await expect(userController.deleteUser(mockUserAdmin1, mockUserAdmin2.username)).rejects.toThrow(new UserIsAdminError());
            } 
            finally{
                expect(UserDAO.prototype.deleteUser).toHaveBeenCalledTimes(0);
                expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(1);
                expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledWith(mockUserAdmin2.username);
            }
        });

        // Test Case 5: User delete himself
        test("should return true - User delete himself", async () => {
            jest.spyOn(UserDAO.prototype, "deleteUser").mockResolvedValueOnce(true);

            const response = await userController.deleteUser(mockUserCustomer, mockUserCustomer.username);
            
            expect(UserDAO.prototype.deleteUser).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(0);
            expect(response).toBe(true);
        });

        // Test Case 6: User delete other user - UserNotAdminError
        test("should return error 401 - UserNotAdminError", async () => {

            try{
                await expect(userController.deleteUser(mockUserManager, mockUserCustomer.username)).rejects.toThrow(new UserNotAdminError());
            } 
            finally{
                expect(UserDAO.prototype.deleteUser).toHaveBeenCalledTimes(0);
                expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(0);
            }
        });


    });

    /* @Test Suite 6 - deleteAll
    *   Test Case 1: Delete all users - success
    */
    describe("deleteAll", () => {
        // Test Case 1: success
        test("should return true", async () => {
            jest.spyOn(UserDAO.prototype, "deleteAllUsers").mockResolvedValueOnce(true);

            const response = await userController.deleteAll();

            expect(UserDAO.prototype.deleteAllUsers).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.deleteAllUsers).toHaveBeenCalledWith();
            expect(response).toBe(true); 
        });
    });

    /* @Test Suite 7 - patchUser
    *   Test Case 1: Generic user modify himself
    *   Test Case 2: Birthdate wrong - DateError 
    *   Test Case 3: Admin modify Customer
    *   Test Case 4: Admin modify another Admin - UserIsAdminError
    *   Test Case 5: Customer modify himself
    *   Test Case 6: Customer/Manager modify other account - UserNotAdminError
    */
    describe("patchUser", () => {
        // Test Case 1: Generic user modify himself
        test("should return true - Generic user modify himself", async () => {
            const updatedUser = {...mockUserAdmin1, name: "new name", surname: "new surname", address: "new address", birthdate: "2000-12-01"}
            jest.spyOn(UserDAO.prototype, "getUserByUsername").mockResolvedValueOnce(mockUserAdmin1);
            jest.spyOn(UserDAO.prototype, "updateUserInfo").mockResolvedValueOnce(updatedUser);

            const response = await userController.updateUserInfo(
                mockUserAdmin1, 
                "new name", 
                "new surname", 
                "new address", 
                "2000-12-01", 
                mockUserAdmin1.username);

            expect(UserDAO.prototype.updateUserInfo).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.updateUserInfo).toHaveBeenCalledWith("new name", "new surname", "new address", "2000-12-01", mockUserAdmin1.username);
            expect(response).toBe(updatedUser); 
        });

        // Test Case 2: Bithdate wrong - DateError 
        test("should return error 400 - DateError", async () => {
            try{
                await expect(userController.updateUserInfo(mockUserAdmin1, mockUserAdmin1.name, mockUserAdmin1.surname, mockUserAdmin1.address, "2025-12-01", mockUserAdmin1.username)).rejects.toThrow(new DateError());
            } 
            finally{
                expect(UserDAO.prototype.updateUserInfo).toHaveBeenCalledTimes(0);
            }
        });

        // Test Case 3: Admin modify Customer
        test("should return true - Admin modify Customer", async () => {
            const updatedUser = {...mockUserCustomer, name: "new name", surname: "new surname", address: "new address", birthdate: "2000-12-01"}
            jest.spyOn(UserDAO.prototype, "getUserByUsername").mockResolvedValueOnce(mockUserCustomer);
            jest.spyOn(UserDAO.prototype, "updateUserInfo").mockResolvedValueOnce(updatedUser);

            const response = await userController.updateUserInfo(
                mockUserAdmin1, 
                "new name", 
                "new surname", 
                "new address", 
                "2000-12-01", 
                mockUserCustomer.username);

            expect(UserDAO.prototype.updateUserInfo).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.updateUserInfo).toHaveBeenCalledWith("new name", "new surname", "new address", "2000-12-01", mockUserCustomer.username);
            expect(response).toBe(updatedUser); 
        });

        // Test Case 4: Admin modify another Admin - UserIsAdminError
        test("should return error 403 - UserIsAdminError", async () => {
            try{
                jest.spyOn(UserDAO.prototype, "getUserByUsername").mockResolvedValueOnce(mockUserAdmin2);
                await expect(userController.updateUserInfo(mockUserAdmin1, mockUserAdmin2.name, mockUserAdmin2.surname, mockUserAdmin2.address, mockUserAdmin2.birthdate, mockUserAdmin2.username)).rejects.toThrow(new UserIsAdminError());
            } 
            finally{
                expect(UserDAO.prototype.updateUserInfo).toHaveBeenCalledTimes(0);
                expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(1);
                expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledWith(mockUserAdmin2.username);
            }
        });

        // Test Case 5: Customer modify himself
        test("should return true - Customer modify himself", async () => {
            const updatedUser = {...mockUserCustomer, name: "new name", surname: "new surname", address: "new address", birthdate: "2000-12-01"}
            jest.spyOn(UserDAO.prototype, "getUserByUsername").mockResolvedValueOnce(mockUserCustomer);
            jest.spyOn(UserDAO.prototype, "updateUserInfo").mockResolvedValueOnce(updatedUser);

            const response = await userController.updateUserInfo(
                mockUserCustomer, 
                "new name", 
                "new surname", 
                "new address", 
                "2000-12-01", 
                mockUserCustomer.username);
            
            expect(UserDAO.prototype.updateUserInfo).toHaveBeenCalledTimes(1);
            expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(0);
            expect(UserDAO.prototype.updateUserInfo).toHaveBeenCalledWith("new name", "new surname", "new address", "2000-12-01", mockUserCustomer.username);
            expect(response).toBe(updatedUser); 
        });

        // Test Case 6: Customer/Manager modify other account - UserNotAdminError
        test("should return error 401 - UserNotAdminError", async () => {
            try{
                jest.spyOn(UserDAO.prototype, "getUserByUsername").mockResolvedValueOnce(mockUserCustomer);
                await expect(userController.updateUserInfo(mockUserManager, mockUserCustomer.name, mockUserCustomer.surname, mockUserCustomer.address, mockUserCustomer.birthdate, mockUserCustomer.username)).rejects.toThrow(new UserNotAdminError());
            } 
            finally{
                expect(UserDAO.prototype.updateUserInfo).toHaveBeenCalledTimes(0);
                expect(UserDAO.prototype.getUserByUsername).toHaveBeenCalledTimes(0);
            }
        });
    });
});