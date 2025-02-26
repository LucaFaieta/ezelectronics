import { afterEach, it, expect, jest, describe } from "@jest/globals"
import request from 'supertest'
import { app } from "../../index"
import { Cart, ProductInCart } from "../../src/components/cart";
import CartController from "../../src/controllers/cartController"
import Authenticator from "../../src/routers/auth";
import { User, Role } from "../../src/components/user";
import { Product, Category } from "../../src/components/product";
import CartDAO from "../../src/dao/cartDAO";

const baseURL = "/ezelectronics/carts";
jest.mock("../../src/routers/auth");

describe('CartRoutes', () => {
    const mockUser = {
        username: "test",
        name: "test",
        surname: "test",
        password: "test",
        role: Role.CUSTOMER,
        address: "via Prova",
        birthdate: "2000-01-01"
    }
    const mockUser2: User = {
        username: "test2",
        name: "test2",
        surname: "test2",
        role: Role.ADMIN,
        address: "via Prova",
        birthdate: "2000-01-01"
    }
    const mockUser3: User = {
        username: "test3",
        name: "test3",
        surname: "test2",
        role: Role.MANAGER,
        address: "via Prova",
        birthdate: "2000-01-01"
    }
    const mockUser4: User = {
        username: "test4",
        name: "test4",
        surname: "test4",
        role: Role.CUSTOMER,
        address: "via Prova",
        birthdate: "2000-01-01"
    }


    const mockUser5: User = {
        username: "test5",
        name: "test5",
        surname: "test5",
        role: Role.CUSTOMER,
        address: "via Prova",
        birthdate: "2000-01-01"
    }

    const mockProduct1: Product = {
        model: "Iphone 13",
        sellingPrice: 700,
        category: Category.SMARTPHONE,
        arrivalDate: "01/03/1999",
        details: null,
        quantity: 55
    }


    const mockProduct2: Product = {
        model: "Elitebook",
        sellingPrice: 700,
        category: Category.LAPTOP,
        arrivalDate: null,
        details: null,
        quantity: 33
    }


    const mockProduct3: Product = {
        model: "Air pods",
        sellingPrice: 300,
        category: Category.APPLIANCE,
        arrivalDate: null,
        details: null,
        quantity: 100
    }

    const mockProduct4: Product = {
        model: "Vivabook",
        sellingPrice: 550,
        category: Category.LAPTOP,
        arrivalDate: null,
        details: null,
        quantity: 76
    }


    const mockProduct5: Product = {
        model: "A15",
        sellingPrice: 170,
        category: Category.SMARTPHONE,
        arrivalDate: null,
        details: null,
        quantity: 200
    }


    const mockProductInCart1: ProductInCart = {
        model: "Iphone 13",
        quantity: 1,
        category: Category.SMARTPHONE,
        price: 700
    }

    const mockProductInCart2: ProductInCart = {
        model: "Elitebook",
        quantity: 1,
        category: Category.LAPTOP,
        price: 700
    }

    const mockProductInCart3: ProductInCart = {
        model: "Air pods",
        quantity: 2,
        category: Category.APPLIANCE,
        price: 300
    }



    const mockProductInCart4: ProductInCart = {
        model: "Vivabook",
        quantity: 2,
        category: Category.LAPTOP,
        price: 1100
    }

    const mockProductInCart5: ProductInCart = {
        model: "A15",
        quantity: 3,
        category: Category.SMARTPHONE,
        price: 510
    }

    const mockCart: Cart = {
        customer: "test",
        paid: false,
        paymentDate: "2021-06-01",
        total: 12345,
        products: []
    }

    const mockCart1: Cart = {
        customer: "test3",
        paid: true,
        paymentDate: "09/06/2024",
        total: 510,
        products: [mockProductInCart5]

    }

    const mockCart2: Cart = {
        customer: "test2",
        paid: false,
        paymentDate: "null",
        total: 0,
        products: [mockProductInCart3, mockProductInCart1]

    }

    const mockCart3: Cart = {
        customer: "test2",
        paid: true,
        paymentDate: "01/03/2024",
        total: 1800,
        products: [mockProductInCart2, mockProductInCart4]

    }

    const mockCart4: Cart = {
        customer: "test",
        paid: true,
        paymentDate: "01/06/2024",
        total: 1100,
        products: [mockProductInCart4]

    }

    const mockCart5: Cart = {
        customer: "test4",
        paid: false,
        paymentDate: "null",
        total: 0,
        products: []

    }

    const mockCart6: Cart = {
        customer: "test",
        paid: true,
        paymentDate: "01/06/2024",
        total: 1100,
        products: [mockProductInCart4]

    }

    afterEach(() => {
        jest.clearAllMocks(); //Clear all mocks after each test
        jest.resetAllMocks(); //Reset all mocks after each test
    })

    /**
     * Test suite 1:
     * 
     */

    describe("GET /", () => {
        it("should return a 200 success code", async () => {
            jest.spyOn(CartController.prototype, "getCart").mockResolvedValueOnce(mockCart);
            const mockIsLoggedIn = jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation(
                (req: any, res: any, next: any) => next()
            );
            const mockIsCustomer = jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation(
                (req: any, res: any, next: any) => next()
            );
            const response = await request(app).get(baseURL + "/").send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCart);
            expect(mockIsLoggedIn).toHaveBeenCalledTimes(1);
            expect(mockIsCustomer).toHaveBeenCalledTimes(1);
        });

        it('should handle errors and call the error handler middleware', async () => {

            const mockError = new Error('Internal Server Error');

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()); //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req: any, res: any, next: any) => next()); //Mock the isAdmin method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => (["Manager", "Admin", "Customer"]),
                })),
            }));
            jest.spyOn(CartController.prototype, "getCart").mockRejectedValueOnce(mockError);
            // Send GET request to / route
            const response = await request(app)
                .get(baseURL); // Mock authentication token

            // Assert response
            expect(response.status).toBe(503); // Assuming ErrorHandler handles errors with status 500
        });

        it('should handle errors and call the error handler middleware', async () => {

            const mockError = new Error('Internal Server Error');

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()); //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req: any, res: any, next: any) => next()); //Mock the isAdmin method of the authenticator
            jest.mock('express-validator', () => ({
                param: jest.fn().mockImplementation(() => ({
                    isString: () => ({ isLength: () => ({}) }),
                    isIn: () => (["Manager", "Admin", "Customer"]),
                })),
            }));
            jest.spyOn(CartController.prototype, "getCart").mockRejectedValueOnce(mockError);
            // Send GET request to / route
            const response = await request(app)
                .get(baseURL); // Mock authentication token

            // Assert response
            expect(response.status).toBe(503); // Assuming ErrorHandler handles errors with status 500
        });



  // Add tests for PATCH, DELETE, and other routes similarly...
  describe('PATCH /', () => {
    it('should checkout the cart of the logged-in customer', async () => {

        jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => {
            req.user = mockUser; // Ensure req.user is set
            next();
        });

        jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req: any, res: any, next: any) => next());

        jest.spyOn(CartController.prototype, "checkoutCart").mockResolvedValueOnce(true);

        const response = await request(app)
            .patch(baseURL + "/")
            .send();

        expect(response.status).toBe(200);
        expect(CartController.prototype.checkoutCart).toHaveBeenCalledWith(mockUser);
    });

    it('should handle errors and call the error handler middleware', async () => {
        const mockUser = { username: 'testuser', role: 'customer' };
        const mockError = new Error('Checkout Error');


        jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
        jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAdmin method of the authenticator
         
       jest.mock('express-validator', () => ({
           param: jest.fn().mockImplementation((user) => ({
               isString: () => ({ isLength: () => ({}) }),
               notEmpty: () => ({}),
           })),
       }));
        jest.spyOn(CartController.prototype,"checkoutCart").mockRejectedValueOnce(mockError);

        const response = await request(app)
            .patch(baseURL);

        expect(response.status).toBe(503);
    });



    describe('GET /history', () => {
        it('should return the history of the logged-in customer\'s carts', async () => {
            const mockCartHistory = [mockCart3];

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => {
                req.user = mockUser2; // Ensure req.user is set
                next();
            });

            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req: any, res: any, next: any) => next());

            jest.spyOn(CartController.prototype, "getCustomerCarts").mockResolvedValueOnce(mockCartHistory);

            const response = await request(app)
                .get(`${baseURL}/history`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCartHistory);
            expect(CartController.prototype.getCustomerCarts).toHaveBeenCalledWith(mockUser2);
        });
    
        it('should handle errors and call the error handler middleware', async () => {
            const mockError = new Error('History Error');
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAdmin method of the authenticator
             
           jest.mock('express-validator', () => ({
               param: jest.fn().mockImplementation((user) => ({
                   isString: () => ({ isLength: () => ({}) }),
                   notEmpty: () => ({}),
               })),
           }));
           jest.spyOn(CartController.prototype,"getCustomerCarts").mockRejectedValueOnce(mockError);
    
            const response = await request(app)
                .get(baseURL + '/history');
    
            expect(response.status).toBe(503);
        });
    });
    
    
    describe('DELETE /products/:model', () => {
        describe('DELETE /products/:model', () => {
            it('should remove a product unit from the cart of the logged-in customer', async () => {
                const model = 'Iphone 13';
    
                jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => {
                    req.user = mockUser; 
                    next();
                });
    
                jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req: any, res: any, next: any) => next());
    
                jest.spyOn(CartController.prototype, "removeProductFromCart").mockResolvedValueOnce(true);
    
                const response = await request(app)
                    .delete(`${baseURL}/products/${model}`);
    
                expect(response.status).toBe(200);
                expect(CartController.prototype.removeProductFromCart).toHaveBeenCalledWith(mockUser, model);
            });
        });
    
        it('should handle errors and call the error handler middleware', async () => {
            const model = mockProduct1.model;
            const mockError = new Error('Remove Product Error');
            
    
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAdmin method of the authenticator
             
           jest.mock('express-validator', () => ({
               param: jest.fn().mockImplementation((user) => ({
                   isString: () => ({ isLength: () => ({}) }),
                   notEmpty: () => ({}),
               })),
           }));
            jest.spyOn(CartController.prototype,"removeProductFromCart").mockRejectedValueOnce(mockError);
    
            const response = await request(app)
                .delete(baseURL + `/products/${model}`);
    
            expect(response.status).toBe(503);
        });
    });
    
    
    describe('DELETE /current', () => {
        
        it('should remove all products from the current cart', async () => {
    
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                req.user = mockUser; // Aggiungi l'utente mockato alla richiesta
                next();
            });
            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => next());
    
            jest.spyOn(CartController.prototype, "clearCart").mockResolvedValueOnce(true);
    
            const response = await request(app)
                .delete(baseURL+ "/current") // Usa la baseURL corretta se diversa da '/'
                .send();
    
            expect(response.status).toBe(200);
            expect(CartController.prototype.clearCart).toHaveBeenCalledWith(mockUser);
        });
    
        it('should handle errors and call the error handler middleware', async () => {
            const mockError = new Error('Clear Cart Error');
    
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAdmin method of the authenticator
             
           jest.mock('express-validator', () => ({
               param: jest.fn().mockImplementation((user) => ({
                   isString: () => ({ isLength: () => ({}) }),
                   notEmpty: () => ({}),
               })),
           }));
            
    
            jest.spyOn(CartController.prototype,"clearCart").mockRejectedValueOnce(mockError);
    
            const response = await request(app)
                .delete(baseURL + '/current');
    
            expect(response.status).toBe(503);
        });
    });
    describe('DELETE /', () => {
        it('should delete all carts', async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAdminOrManager method of the authenticator
             
           jest.mock('express-validator', () => ({
               param: jest.fn().mockImplementation((user) => ({
                   isString: () => ({ isLength: () => ({}) }),
                   notEmpty: () => ({}),
               })),
           }));
            jest.spyOn(CartController.prototype,"deleteAllCarts").mockResolvedValueOnce(true);
            const response = await request(app)
                .delete(baseURL);
    
            expect(response.status).toBe(200);
            expect(CartController.prototype.deleteAllCarts).toHaveBeenCalled();
        });
    
        it('should handle errors and call the error handler middleware', async () => {
            const mockError = new Error('Delete All Carts Error');
    
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAuthenticated method of the authenticator
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req: any, res: any, next: any) => next()) //Mock the isAdminOrManager method of the authenticator
             
           jest.mock('express-validator', () => ({
               param: jest.fn().mockImplementation((user) => ({
                   isString: () => ({ isLength: () => ({}) }),
                   notEmpty: () => ({}),
               })),
           }));
            jest.spyOn(CartController.prototype,"deleteAllCarts").mockRejectedValueOnce(mockError);
    
            const response = await request(app)
                .delete(baseURL);
    
            expect(response.status).toBe(503);
        });
    });
        });
    });
    
    
    describe('GET /all', () => {
        it('should return all carts of all users', async () => {
            const mockCarts = [mockCart3];
    
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
    
            jest.spyOn(CartController.prototype,"getAllCarts").mockResolvedValueOnce(mockCarts);
    
            const response = await request(app).get(baseURL + '/all').send();
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCarts);
            expect(CartController.prototype.getAllCarts).toHaveBeenCalled();
        });
    
        it('should handle errors and call the error handler middleware', async () => {
            const mockError = new Error('Get All Carts Error');
    
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
    
            jest.spyOn(CartController.prototype,"getAllCarts").mockRejectedValueOnce(mockError);
    
            const response = await request(app).get('/all');
    
            expect(response.status).toBe(404);
        });
    });


    describe('POST /', () => {
        it('should add a product to the user\'s cart and return status 200 if successful', async () => {
            // Mock the isLoggedIn method of Authenticator to set req.user
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                req.user = mockUser; // Set req.user to mockUser
                next();
            });
        
            // Mock the isCustomer method of Authenticator to allow access
            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => next());
        
            // Mock the addToCart method of CartController to resolve with true
            jest.spyOn(CartController.prototype, 'addToCart').mockResolvedValueOnce(true);
        
            // Send a request to add the product to the cart
            const response = await request(app)
                .post(baseURL)
                .send({ model: mockProduct1.model }); // Send only the product model in the request body
        
            // Expect a status code of 200
            expect(response.status).toBe(200);
        
            // Expect CartController.addToCart to have been called with the mockUser and mockProductModel
            expect(CartController.prototype.addToCart).toHaveBeenCalledWith(mockUser, mockProduct1.model);
        });
    
            it('should return status 503 if an error occurs during adding product to the cart', async () => {
                jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                    req.user = mockUser; // Set req.user to mockUser
                    next();
                });
            
                // Mock the isCustomer method of Authenticator to allow access
                jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => next());
        // Mock the addToCart method of CartController to reject with an error
        jest.spyOn(CartController.prototype, 'addToCart').mockRejectedValueOnce(new Error('Test error'));

        // Send a request to add the product to the cart
        const response = await request(app)
            .post(baseURL)
            .send({ model: mockProduct1.model });

        // Expect a status code of 503
        expect(response.status).toBe(503);

        // Expect CartController.addToCart to have been called with the mockUser and mockProductModel
        expect(CartController.prototype.addToCart).toHaveBeenCalledWith(mockUser, mockProduct1.model);
    });
    
});
});

