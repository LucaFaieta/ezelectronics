import { describe, test, expect, jest, beforeEach, afterEach } from "@jest/globals"
import { Database } from "sqlite3"
import db from "../../src/db/db";
import { Product, Category } from "../../src/components/product";
import ProductDAO from "../../src/dao/productDAO";
import { ProductNotFoundError, ProductAlreadyExistsError, EmptyProductStockError, LowProductStockError } from "../../src/errors/productError"
import { DateError } from "../../src/utilities"


jest.mock("../../src/db/db.ts");

describe("ProductDAO", () => {
    let productDAO: ProductDAO;
    let mockProduct: Product;
    let mockProduct2: Product;

    beforeEach(() => {
        productDAO = new ProductDAO();

        mockProduct = new Product(
            700,
            "Iphone 13",
            Category.SMARTPHONE,
            "2023-06-20",
            "Latest smartphone model",
            55
        );

        mockProduct2 = new Product(
            1200,
            "Macbook air 2",
            Category.LAPTOP,
            "2023-06-20",
            "Latest computer model",
            55
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("getProductbyModel", () => {
        test("PD_001: should return product - success", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, mockProduct);
                return {} as Database;
            });

            const result = await productDAO.getProductbyModel("Iphone 13");
            expect(result).toEqual(mockProduct);
            mockDBGet.mockRestore();
        });

        test("PD_002: should return null - product model does not exist", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, null);
                return {} as Database;
            });

            try {
                expect(await productDAO.getProductbyModel("NonExistentModel")).toBeNull();
            } finally {
                mockDBGet.mockRestore();
            }
        });

        test("PD_003: should throw error - product not found", async () => {
            const mockError = new Error("Database error");
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });

            try {
                await expect(productDAO.getProductbyModel("Iphone00")).rejects.toThrow("Database error");
            } finally {
                mockDBGet.mockRestore();
            }
        });

        test("PD_004: should throw error - internal DB error", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                throw new Error("Database error");
            });

            try {
                await expect(productDAO.getProductbyModel("Iphone00")).rejects.toThrow("Database error");
            } finally {
                mockDBGet.mockRestore();
            }
        });
    });

    describe("registerProducts", () => {
        test("PD_005: should register a new product - success", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(undefined);

            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            try {
                await expect(productDAO.registerProducts("Iphone 13", Category.SMARTPHONE, 55, "Latest smartphone model", 700, "2023-06-20")).resolves.toBeUndefined();
            } finally {
                mockDBRun.mockRestore();
            }
        });

        test("PD_006: should throw error - product already exists", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            try {
                await expect(productDAO.registerProducts("Iphone 13", Category.SMARTPHONE, 55, "Latest smartphone model", 700, "2023-06-20")).rejects.toThrow(ProductAlreadyExistsError);
            } finally {
                mockDBRun.mockRestore();
            }
        });

        test("PD_007: should throw error - invalid arrival date", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(undefined);

            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            try {
                await expect(productDAO.registerProducts("Iphone 13", Category.SMARTPHONE, 55, "Latest smartphone model", 700, "2025-06-20")).rejects.toThrow(DateError);
            } finally {
                mockDBRun.mockRestore();
            }
        });

        test("PD_008: should throw error - database error", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(undefined);
            const mockError = new Error("Database error");
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });

            try {
                await expect(productDAO.registerProducts("Iphone 13", Category.SMARTPHONE, 55, "Latest smartphone model", 700, "2023-06-20")).rejects.toThrow(new Error("Database error"));
            } finally {
                mockDBRun.mockRestore();
            }
        });

        test("PD_009: should throw error - internal DB error", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockRejectedValueOnce(new Error());

            await expect(productDAO.registerProducts("Iphone 13", Category.SMARTPHONE, 55, "Latest smartphone model", 700, "2025-06-20")).rejects.toThrow();
        });
    });

    describe("changeProductQuantity", () => {
        test("PD_010: should increase product quantity - success", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            const newQuantity = 10;
            const expectedQuantity = mockProduct.quantity + newQuantity;

            await expect(productDAO.changeProductQuantity("Iphone 13", newQuantity, "2023-06-21")).resolves.toBe(expectedQuantity);
            mockDBRun.mockRestore();
        });

        test("PD_011: should throw error - product not found", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(undefined);

            await expect(productDAO.changeProductQuantity("NonExistentModel", 10, "2023-06-21")).rejects.toThrow(ProductNotFoundError);
        });

        test("PD_012: should throw error - invalid change date", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            await expect(productDAO.changeProductQuantity("Iphone 13", 10, "2025-06-20")).rejects.toThrow(DateError);
        });

        test("PD_013: should throw error - database error", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            const mockError = new Error("Database error");
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });

            const newQuantity = 10;

            try {
                await expect(productDAO.changeProductQuantity("Iphone 13", newQuantity, "2023-06-21")).rejects.toThrow(new Error("Database error"));
            } finally {
                mockDBRun.mockRestore();
            }
        });

        test("PD_014: should throw error - internal DB error", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockRejectedValueOnce(new Error());

            await expect(productDAO.changeProductQuantity("Iphone 13", 10, "2025-06-20")).rejects.toThrow();
        });
    });

    describe("sellProduct", () => {
        test("PD_015: should decrease product quantity - success", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            const quantityToSell = 10;
            const expectedQuantity = mockProduct.quantity - quantityToSell;

            await expect(productDAO.sellProduct("Iphone 13", quantityToSell, "2023-06-21")).resolves.toBe(expectedQuantity);
            mockDBRun.mockRestore();
        });

        test("PD_016: should throw error - product not found", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(undefined);

            await expect(productDAO.sellProduct("NonExistentModel", 10, "2023-06-21")).rejects.toThrow(ProductNotFoundError);
        });

        test("PD_017: should throw error - invalid selling date", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            await expect(productDAO.sellProduct("Iphone 13", 10, "2025-06-20")).rejects.toThrow(DateError);
        });

        test("PD_018: should throw error - empty product stock", async () => {
            const mockEmptyProduct = { ...mockProduct, quantity: 0 };
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockEmptyProduct);

            await expect(productDAO.sellProduct("Iphone 13", 10, "2023-06-21")).rejects.toThrow(EmptyProductStockError);
        });

        test("PD_019: should throw error - low product stock", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            await expect(productDAO.sellProduct("Iphone 13", 60, "2023-06-21")).rejects.toThrow(LowProductStockError);
        });

        test("PD_020: should throw error - database error", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            const mockError = new Error("Database error");
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });

            const quantityToSell = 10;

            try {
                await expect(productDAO.sellProduct("Iphone 13", quantityToSell, "2023-06-21")).rejects.toThrow(new Error("Database error"));
            } finally {
                mockDBRun.mockRestore();
            }
        });

        test("PD_021: should throw error - internal DB error", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockRejectedValueOnce(new Error());

            await expect(productDAO.sellProduct("Iphone 13", 60, "2023-06-21")).rejects.toThrow();
        });
    });

    describe("getProducts", () => {
        test("PD_022: should return all products - success", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(undefined);

            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, [mockProduct]);
                return {} as Database;
            });

            const result = await productDAO.getProducts(null, null, null);
            expect(result).toEqual([mockProduct]);
            mockDBAll.mockRestore();
        });

        test("PD_023: should return products filtered by category - success", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, [mockProduct]);
                return {} as Database;
            });

            const result = await productDAO.getProducts("category", Category.SMARTPHONE, null);
            expect(result).toEqual([mockProduct]);
            mockDBAll.mockRestore();
        });

        test("PD_024: should return products filtered by model - success", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, [mockProduct]);
                return {} as Database;
            });

            const result = await productDAO.getProducts("model", null, "Iphone 13");
            expect(result).toEqual([mockProduct]);
            mockDBAll.mockRestore();
        });

        test("PD_025: should throw error - product not found for model", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(undefined);

            await expect(productDAO.getProducts("model", null, "NonExistentModel")).rejects.toThrow(ProductNotFoundError);
        });

        test("PD_026: should throw error - database error", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(undefined);

            const mockError = new Error("Database error");
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });

            try {
                await expect(productDAO.getProducts(null, null, null)).rejects.toThrow(new Error("Database error"));
            } finally {
                mockDBAll.mockRestore();
            }
        });

        test("PD_027: should throw error - internal DB error", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockRejectedValueOnce(new Error());

            await expect(productDAO.getProducts("model", "category", "ExistentModel")).rejects.toThrow();
        });
    });

    describe("getAvailableProducts", () => {
        test("PD_028: should return all available products - success", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(undefined);

            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, [mockProduct]);
                return {} as Database;
            });

            const result = await productDAO.getAvailableProducts(null, null, null);
            expect(result).toEqual([mockProduct]);
            mockDBAll.mockRestore();
        });

        test("PD_029: should return available products filtered by category - success", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, [mockProduct]);
                return {} as Database;
            });

            const result = await productDAO.getAvailableProducts("category", Category.SMARTPHONE, null);
            expect(result).toEqual([mockProduct]);
            mockDBAll.mockRestore();
        });

        test("PD_030: should return available products filtered by model - success", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, [mockProduct]);
                return {} as Database;
            });

            const result = await productDAO.getAvailableProducts("model", null, "Iphone 13");
            expect(result).toEqual([mockProduct]);
            mockDBAll.mockRestore();
        });

        test("PD_031: should throw error - product not found for model", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(undefined);

            await expect(productDAO.getAvailableProducts("model", null, "NonExistentModel")).rejects.toThrow(ProductNotFoundError);
        });

        test("PD_032: should throw error - database error", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(undefined);

            const mockError = new Error("Database error");
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });

            try {
                await expect(productDAO.getAvailableProducts(null, null, null)).rejects.toThrow(new Error("Database error"));
            } finally {
                mockDBAll.mockRestore();
            }
        });

        test("PD_033: should throw error - internal DB error", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockRejectedValueOnce(new Error());

            await expect(productDAO.getAvailableProducts("model", "category", "ExistentModel")).rejects.toThrow();
        });
    });


    describe("deleteAllProducts", () => {
        test("PD_034: should delete all products - success", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
                callback(null);
                return {} as Database;
            });

            await expect(productDAO.deleteAllProducts()).resolves.toBe(true);
            mockDBRun.mockRestore();
        });

        test("PD_035: should throw error - database error", async () => {
            const mockError = new Error("Database error");
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
                callback(mockError);
                return {} as Database;
            });

            await expect(productDAO.deleteAllProducts()).rejects.toThrow("Database error");
            mockDBRun.mockRestore();
        });

        test("PD_036: should throw error - internal DB error", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
                throw new Error("Database error");
            });

            try {
                await expect(productDAO.deleteAllProducts()).rejects.toThrow("Database error");
            } finally {
                mockDBRun.mockRestore();
            }
        });
    });

    describe("deleteProduct", () => {
        test("PD_037: should delete product by model - success", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });

            await expect(productDAO.deleteProduct("Iphone 13")).resolves.toBe(true);
            mockDBRun.mockRestore();
        });

        test("PD_038: should throw error - product not found", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(undefined);

            await expect(productDAO.deleteProduct("NonExistentModel")).rejects.toThrow(ProductNotFoundError);
        });

        test("PD_039: should throw error - database error", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockResolvedValueOnce(mockProduct);

            const mockError = new Error("Database error");
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(mockError);
                return {} as Database;
            });

            await expect(productDAO.deleteProduct("Iphone 13")).rejects.toThrow("Database error");
            mockDBRun.mockRestore();
        });

        test("PD_040: should throw error - internal DB error", async () => {
            jest.spyOn(productDAO as any, "getProductbyModel").mockRejectedValueOnce(new Error());

            await expect(productDAO.deleteProduct("Iphone 13")).rejects.toThrow();
        });
    });

});