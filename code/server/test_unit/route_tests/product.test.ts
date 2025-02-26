import { describe, test, expect, jest, beforeAll, beforeEach, afterAll, afterEach } from "@jest/globals";
import request from 'supertest';
import { app } from "../../index"
import Authenticator from "../../src/routers/auth";
import ErrorHandler from "../../src/helper";
import ProductController from "../../src/controllers/productController";
import ProductRoutes from "../../src/routers/productRoutes";
import { Product, Category } from "../../src/components/product";
import { body, check, param, query } from "express-validator"

const baseURL = "/ezelectronics/products";

jest.mock("../../src/routers/auth.ts");


describe('ProductRoutes', () => {
    let productRoutes: ProductRoutes;

    const mockProduct: Product = {
        model: "model1",
        category: Category.SMARTPHONE,
        quantity: 10,
        details: "details",
        sellingPrice: 999.99,
        arrivalDate: "2022-10-10"
    };

    const mockProducts = [mockProduct];

    afterEach(() => {
        jest.clearAllMocks()
        jest.resetAllMocks()
    })



    describe('POST /products', () => {

        test('PR_001 - should return a 200 success code', async () => {
            const product = {
                model: "model1",
                category: "Laptop",
                quantity: 10,
                details: "details",
                sellingPrice: 999.99,
                arrivalDate: "2022-10-10"
            }

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());

            jest.spyOn(ProductController.prototype, "registerProducts").mockResolvedValueOnce()

            const response = await request(app).post(baseURL).send(product)
            expect(response.status).toBe(200)

        });


        test('PR_002 - should return 422 validation error', async () => {
            const mockProduct = {
                model: "",
                category: Category.LAPTOP,
                quantity: 10,
                details: "details",
                sellingPrice: 999.99,
                arrivalDate: "2022-10-10"
            };

            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());

            const response = await request(app).post(baseURL).send(mockProduct);
            expect(response.status).toBe(422);
        });

        test('PR_003 - should return 401 if an unlogged user tries to add a product', async () => {
            const mockProduct = {
                model: "model1",
                category: Category.LAPTOP,
                quantity: 10,
                details: "details",
                sellingPrice: 999.99,
                arrivalDate: "2022-10-10"
            };

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return res.status(401).json({ error: "Unauthenticated user", status: 401 });
            });

            const response = await request(app).post(baseURL).send(mockProduct);
            expect(response.status).toBe(401);
        });

        test('PR_004 - should return 401 if a non-admin user tries to add a product', async () => {
            const mockProduct = {
                model: "model1",
                category: Category.LAPTOP,
                quantity: 10,
                details: "details",
                sellingPrice: 999.99,
                arrivalDate: "2022-10-10"
            };

            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return res.status(401).json({ error: "Unauthorized user", status: 401 });
            });

            const response = await request(app).post(baseURL).send(mockProduct);
            expect(response.status).toBe(401);
        });

        test('PR_005 - should return 422 for invalid arrivalDate format', async () => {
            const invalidProduct = {
                model: "model1",
                category: "Laptop",
                quantity: 10,
                details: "details",
                sellingPrice: 999.99,
                arrivalDate: "a2022/10/10"
            };
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());

            const response = await request(app).post(baseURL).send(invalidProduct);
            expect(response.status).toEqual(422)
        });

        test('PR_006 - should handle error during product registration', async () => {
            const mockProduct = {
                model: "model1",
                category: "Laptop",
                quantity: 10,
                details: "details",
                sellingPrice: 999.99,
                arrivalDate: "2022-10-10"
            };

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());

            jest.spyOn(ProductController.prototype, "registerProducts").mockRejectedValue(() => {
                throw new Error("Failed to register product");
            });

            const response = await request(app).post(baseURL).send(mockProduct);

            expect(response.status).toBe(503);
        });
    });

    describe('PATCH /products/:model', () => {
        test('PR_007 - should return a 200 success code', async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, "changeProductQuantity").mockResolvedValueOnce(15);

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}`).send({ quantity: 5 });
            expect(response.status).toBe(200);
            expect(response.body.quantity).toBe(15); // Assumi che `changeProductQuantity` ritorni il nuovo valore di quantità
        });

        test('PR_008 - should return 422 validation error', async () => {
            const invalidQuantityPatch = { quantity: 0 }; // Quantità non valida

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}`).send(invalidQuantityPatch);
            expect(response.status).toBe(422);
        });

        test('PR_009 - should return 401 if an unlogged user tries to change quantity', async () => {
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return res.status(401).json({ error: "Unauthenticated user", status: 401 });
            });

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}`).send({ quantity: 5 });
            expect(response.status).toBe(401);
        });

        test('PR_010 - should return 401 if a non-admin user tries to change quantity', async () => {
            const invalidProduct = {
                model: "model1",
                quantity: 5,
                changeDate: "a2022/10/10"
            };
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return res.status(401).json({ error: "Unauthorized user", status: 401 });
            });

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}`).send({ quantity: 5 });
            expect(response.status).toBe(401);
        });

        test('PR_011 - should return 200 for valid arrivalDate format', async () => {

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());

            jest.spyOn(ProductController.prototype, "changeProductQuantity").mockResolvedValueOnce(15);

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}`).send({ quantity: 5, changeDate: "2024-06-11" });
            expect(response.status).toBe(200)
            expect(response.body.quantity).toBe(15);

        });

        test('PR_012 - should return 422 for invalid arrivalDate format', async () => {
            const invalidProduct = {
                quantity: 10,
                changeDate: "a2022/10/10"
            };
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}`).send(invalidProduct);
            expect(response.status).toEqual(422)
        });

        test('PR_013 - should return a 503 error code for internal db error', async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());

            jest.spyOn(ProductController.prototype, "changeProductQuantity").mockRejectedValueOnce(new Error("Database error"));

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}`).send({ quantity: 5 });
            expect(response.status).toBe(503);
        });
    });

    describe('PATCH /products/:model/sell', () => {
        test('PR_014 - should return a 200 success code', async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, "sellProduct").mockResolvedValueOnce(8); // Assuming the sellProduct method returns the new quantity

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}/sell`).send({ quantity: 2 });
            expect(response.status).toBe(200);
            expect(response.body.quantity).toBe(8);
        });

        test('PR_015 - should return 422 validation error for invalid quantity', async () => {
            const invalidQuantity = { quantity: 0 }; // Invalid quantity

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}/sell`).send(invalidQuantity);
            expect(response.status).toBe(422);
        });

        test('PR_016 - should return 401 if an unlogged user tries to sell a product', async () => {
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                return res.status(401).json({ error: "Unauthenticated user", status: 401 });
            });

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}/sell`).send({ quantity: 2 });
            expect(response.status).toBe(401);
        });

        test('PR_017 - should return 401 if a non-admin user tries to sell a product', async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                return res.status(401).json({ error: "Unauthorized user", status: 401 });
            });

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}/sell`).send({ quantity: 2 });
            expect(response.status).toBe(401);
        });

        test('PR_018 - should return 422 for invalid sellingDate format', async () => {
            const invalidDate = { quantity: 2, sellingDate: "invalid-date" }; // Invalid date format

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}/sell`).send(invalidDate);
            expect(response.status).toBe(422);
        });

        test('PR_019 - should return 200 for valid arrivalDate format', async () => {

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, "sellProduct").mockResolvedValueOnce(8); // Assuming the sellProduct method returns the new quantity

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}/sell`).send({ quantity: 2, sellingDate: "2020-01-01" });
            expect(response.status).toBe(200);
            expect(response.body.quantity).toBe(8);
        });

        test('PR_020 - should return 422 if sellingDate is before arrivalDate', async () => {
            const invalidDate = { quantity: 2, sellingDate: "2022a-09-01" }; // Date before arrivalDate

            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}/sell`).send(invalidDate);
            expect(response.status).toBe(422);
        });

        test('PR_021 - should return a 503 error code for internal db error', async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());

            jest.spyOn(ProductController.prototype, "sellProduct").mockRejectedValueOnce(new Error("Database error"));

            const response = await request(app).patch(`${baseURL}/${mockProduct.model}/sell`).send({ quantity: 2 });
            expect(response.status).toBe(503);
        });
    });

    describe('GET /products', () => {
        test('PR_022 - should return a 200 success code and all products when no query parameters are provided', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, 'isAdminOrManager').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, 'getProducts').mockResolvedValueOnce(mockProducts);

            const response = await request(app).get(baseURL);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
        });

        test('PR_023 - should return a 200 success code for filtered by valid category when grouping is "category"', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, 'isAdminOrManager').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, 'getProducts').mockResolvedValueOnce(mockProducts);

            const response = await request(app).get(`${baseURL}?grouping=category&category=Smartphone`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
        });

        test('PR_024 - should return a 422 error code for filtered by invalid category when grouping is "category"', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, 'isAdminOrManager').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());

            const response = await request(app).get(`${baseURL}?grouping=category&category=InvalidCategory`);
            expect(response.status).toBe(422);
        });

        test('PR_025 - should return a 422 error code for filtered by invalid category when grouping is "model"', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, 'isAdminOrManager').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());

            const response = await request(app).get(`${baseURL}?grouping=model&category=InvalidCategory`);
            expect(response.status).toBe(422);
        });
        

        test('PR_026 - should return a 200 success code for filtered by model when grouping is "model"', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, 'isAdminOrManager').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, 'getProducts').mockResolvedValueOnce(mockProducts);

            const response = await request(app).get(`${baseURL}?grouping=model&model=${mockProduct.model}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
        });

        test('PR_027 - should return a 422 error code for filtered by model when grouping is "category"', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, 'isAdminOrManager').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, 'getProducts').mockResolvedValueOnce(mockProducts);

            const response = await request(app).get(`${baseURL}?grouping=category&model=${mockProduct.model}`);
            expect(response.status).toBe(422);
        });

        
        
        test('PR_028 - should return a 503 error code for internal db error', async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());

            jest.spyOn(ProductController.prototype, "getProducts").mockRejectedValueOnce(new Error());

            const response = await request(app).get(`${baseURL}?grouping=model&model=${mockProduct.model}`);
            expect(response.status).toBe(503);
        });
        
       
    });

    describe('GET /products/available', () => {
        test('PR_029 - should return a 200 success code and all available products when no query parameters are provided', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, 'getAvailableProducts').mockResolvedValueOnce(mockProducts);

            const response = await request(app).get(`${baseURL}/available`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
        });

        test('PR_030 - should filter available products by category when grouping is "category"', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, 'getAvailableProducts').mockResolvedValueOnce(mockProducts);

            const response = await request(app).get(`${baseURL}/available?grouping=category&category=Smartphone`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
        });

        test('PR_031 - should filter available products by model when grouping is "model"', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, 'getAvailableProducts').mockResolvedValueOnce(mockProducts);

            const response = await request(app).get(`${baseURL}/available?grouping=model&model=${mockProduct.model}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
        });

        test('PR_032 - should return a 422 error code for invalid category', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());

            const response = await request(app).get(`${baseURL}/available?grouping=category&category=InvalidCategory`);
            expect(response.status).toBe(422);
        });

        test('PR_033 - should return a 422 error code for invalid category', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());

            const response = await request(app).get(`${baseURL}/available?grouping=model&category=InvalidCategory`);
            expect(response.status).toBe(422);
        });

        test('PR_034 - should return a 422 error code for invalid model', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());

            const response = await request(app).get(`${baseURL}/available?grouping=category&model=Invalidmodel`);
            expect(response.status).toBe(422);
        });

        test('PR_035 - should return a 503 error code for internal db error', async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, "validateRequest").mockImplementation((req, res, next) => next());

            jest.spyOn(ProductController.prototype, "getAvailableProducts").mockRejectedValueOnce(new Error());

            const response = await request(app).get(`${baseURL}/available`);
            expect(response.status).toBe(503);
        });
        
    });

    describe('DELETE /products', () => {
        test('PR_036 - should return a 200 success code for deleting all products', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, 'isAdminOrManager').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, 'deleteAllProducts').mockResolvedValueOnce(true);

            const response = await request(app).delete(baseURL);
            expect(response.status).toBe(200);
        });

        test('PR_037 - should return a 503 error code for internal db error', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, 'isAdminOrManager').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, 'deleteAllProducts').mockRejectedValueOnce(new Error('Database error'));

            const response = await request(app).delete(baseURL);
            expect(response.status).toBe(503);
        });
    });

    describe('DELETE /products/:model', () => {
        test('PR_038 - should return a 200 success code for deleting all products', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, 'isAdminOrManager').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, 'deleteProduct').mockResolvedValueOnce(true);

            const response = await request(app).delete(`${baseURL}/${mockProduct.model}`);
            expect(response.status).toBe(200);
        });

        test('PR_039 - should return a 503 error code for internal db error', async () => {
            jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => next());
            jest.spyOn(Authenticator.prototype, 'isAdminOrManager').mockImplementation((req, res, next) => next());
            jest.spyOn(ErrorHandler.prototype, 'validateRequest').mockImplementation((req, res, next) => next());
            jest.spyOn(ProductController.prototype, 'deleteProduct').mockRejectedValueOnce(new Error());

            const response = await request(app).delete(`${baseURL}/${mockProduct.model}`);
            expect(response.status).toBe(503);
        });
    });
})