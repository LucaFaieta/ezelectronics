import { describe, test, expect, jest, beforeEach, afterEach } from "@jest/globals"
import { Product, Category } from "../../src/components/product";
import ProductController from "../../src/controllers/productController";
import ProductDAO from '../../src/dao/productDAO';

jest.mock('../../src/dao/productDAO');

describe("ProductController", () => {
    let productController: ProductController;
    let mockProduct: Product;
    let mockProduct2: Product;

    beforeEach(() => {
        productController = new ProductController();

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
        jest.clearAllMocks();
        jest.resetAllMocks();
    })

    describe("registerProducts", () => {
        test("PC_001: should call dao.registerProducts with correct parameters", async () => {
            const model = 'iPhone 13';
            const category = 'Smartphone';
            const quantity = 10;
            const details = 'Latest model';
            const sellingPrice = 999.99;
            const arrivalDate = '2024-06-10';

            const response = await productController.registerProducts(model, category, quantity, details, sellingPrice, arrivalDate);

            expect(ProductDAO.prototype.registerProducts).toHaveBeenCalledTimes(1);
            expect(ProductDAO.prototype.registerProducts).toHaveBeenCalledWith(
                model, category, quantity, details, sellingPrice, arrivalDate);

            expect(response).toBe(undefined);
        });

        test("PC_002: should call dao.registerProducts with current date for null arrivalDate parameter", async () => {
            const model = 'iPhone 13';
            const category = 'Smartphone';
            const quantity = 10;
            const details = 'Latest model';
            const sellingPrice = 999.99;
            const arrivalDate: string | null = null;

            const currentDate = new Date().toISOString().split('T')[0];

            await productController.registerProducts(model, category, quantity, details, sellingPrice, arrivalDate);
            expect(ProductDAO.prototype.registerProducts).toHaveBeenCalledWith(model, category, quantity, details, sellingPrice, currentDate);
        });
    });

    describe("changeProductQuantity", () => {
        test("PC_003: should call dao.changeProductQuantity with correct parameters", async () => {
            const model = 'iPhone 13';
            const quantity = 10;
            const arrivalDate = '2024-06-10';

            const response = await productController.changeProductQuantity(model, quantity, arrivalDate);

            expect(ProductDAO.prototype.changeProductQuantity).toHaveBeenCalledTimes(1);
            expect(ProductDAO.prototype.changeProductQuantity).toHaveBeenCalledWith(model, quantity, arrivalDate);

            expect(response).toBe(undefined);
        });

        test("PC_004: should call dao.changeProductQuantity with current date for null arrivalDate parameter", async () => {
            const model = 'iPhone 13';
            const quantity = 10;
            const arrivalDate: string | null = null;

            const currentDate = new Date().toISOString().split('T')[0];

            await productController.changeProductQuantity(model, quantity, arrivalDate);
            expect(ProductDAO.prototype.changeProductQuantity).toHaveBeenCalledWith(model, quantity, currentDate);
        });
    });

    describe("sellProduct", () => {
        test("PC_005: should call dao.sellProduct with correct parameters", async () => {
            const model = 'iPhone 13';
            const quantity = 10;
            const sellingDate = '2024-06-10';

            const response = await productController.sellProduct(model, quantity, sellingDate);

            expect(ProductDAO.prototype.sellProduct).toHaveBeenCalledTimes(1);
            expect(ProductDAO.prototype.sellProduct).toHaveBeenCalledWith(model, quantity, sellingDate);

            expect(response).toBe(undefined);
        });

        test("PC_006: should call dao.sellProduct with current date for null sellingDate parameter", async () => {
            const model = 'iPhone 13';
            const quantity = 10;
            const sellingDate: string | null = null;

            const currentDate = new Date().toISOString().split('T')[0];

            await productController.sellProduct(model, quantity, sellingDate);
            expect(ProductDAO.prototype.sellProduct).toHaveBeenCalledWith(model, quantity, currentDate);
        });
    });

    describe("getProducts", () => {
        test("PC_007: should call dao.getProducts with correct parameters", async () => {
            const grouping = 'category';
            const category = 'Smartphone';
            const model = 'iPhone 13';

            await productController.getProducts(grouping, category, model);
            expect(ProductDAO.prototype.getProducts).toHaveBeenCalledWith(grouping, category, model);
        });
    });

    describe("getAvailableProducts", () => {
        test("PC_008: should call dao.getAvailableProducts with correct parameters", async () => {
            const grouping = 'category';
            const category = 'Smartphone';
            const model = 'iPhone 13';

            await productController.getAvailableProducts(grouping, category, model);
            expect(ProductDAO.prototype.getAvailableProducts).toHaveBeenCalledWith(grouping, category, model);
        });
    });

    describe("deleteAllProducts", () => {
        test("PC_009: should call dao.deleteAllProducts with correct parameters", async () => {
            await productController.deleteAllProducts();
            expect(ProductDAO.prototype.deleteAllProducts).toHaveBeenCalled();
        });
    });

    describe("deleteProduct", () => {
        test("PC_010: should call dao.deleteProduct with correct parameters", async () => {
            const model = 'iPhone 13';

            await productController.deleteProduct(model);
            expect(ProductDAO.prototype.deleteProduct).toHaveBeenCalledWith(model);
        });
    });

});

