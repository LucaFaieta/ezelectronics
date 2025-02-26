import { afterEach, it, expect, jest, describe, beforeEach } from "@jest/globals"
import request from 'supertest'
import { app } from "../../index"
import { User, Role } from "../../src/components/user";
import { Product, Category } from "../../src/components/product";
import { Cart, ProductInCart } from "../../src/components/cart";
import { ProductReview } from "../../src/components/review";
import Authenticator from "../../src/routers/auth";
import ReviewController from "../../src/controllers/reviewController";

const baseURL = "/ezelectronics/reviews";
jest.mock("../../src/routers/auth");


describe('Review Routes', () => {

    //*INIZIO MOCKANDO QUALCHE COMPONENTS CHE POTREBBE TORNARMI UTILE */
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

    const mockReview: ProductReview = {
        model: "Iphone 13",
        user: "test",
        score: 5,
        date: "01/03/2024",
        comment: "Ottimo Prodotto"
    }

    const mockReview2: ProductReview = {
        model: "Iphone 13",
        user: "test",
        score: 4,
        date: "01/03/2024",
        comment: "Ottimo Prodotto"
    }

    afterEach(() => {
        jest.clearAllMocks(); //Clear all mocks after each test
        jest.resetAllMocks(); //Reset all mocks after each test
    })

    const mockReviewData = {
        score: 5,
        comment: "Great product!"
    };

    /**TEST SUITE 1 */
    describe('POST /:model ', () => {

        beforeEach(() => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                req.user = mockUser; // Ensure req.user is set
                next();
            });
            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => next());
        });

        it('should add a review to the product and return status 200 if successful', async () => {
            jest.spyOn(ReviewController.prototype, "addReview").mockResolvedValueOnce();
    
            const response = await request(app)
                .post(`${baseURL}/${mockProduct1.model}`)
                .send(mockReviewData);
    
            expect(response.status).toBe(200);
            expect(ReviewController.prototype.addReview).toHaveBeenCalledWith(mockProduct1.model, mockUser, mockReviewData.score, mockReviewData.comment);
        });

        it('should return status 422 if validation fails', async () => {
            const invalidReviewData = {
                score: 6, // Invalid score
                comment: ""
            };

            const response = await request(app)
                .post(`${baseURL}/${mockProduct1.model}`)
                .send(invalidReviewData);

            expect(response.status).toBe(422); // Expect validation to fail
        });

        it('should return status 503 if an error occurs in the controller', async () => {
            jest.spyOn(ReviewController.prototype, "addReview").mockRejectedValueOnce(new Error('Test error'));

            const response = await request(app)
                .post(`${baseURL}/${mockProduct1.model}`)
                .send(mockReviewData);

            expect(response.status).toBe(503); // Expect internal server error status
        });

        it('should return status 422 if score or comment is missing', async () => {
            const invalidReviewData1 = {
                comment: "Great product!"
            };

            const invalidReviewData2 = {
                score: 5
            };

            const response1 = await request(app)
                .post(`${baseURL}/${mockProduct1.model}`)
                .send(invalidReviewData1);

            const response2 = await request(app)
                .post(`${baseURL}/${mockProduct1.model}`)
                .send(invalidReviewData2);

            expect(response1.status).toBe(422); // Expect validation to fail for missing score
            expect(response2.status).toBe(422); // Expect validation to fail for missing comment
        });


    });
    /** FINE DESCRIBE POST /:model */


    /**TEST SUITE 2 */

    describe('DELETE /:model', () => {

        beforeEach(() => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                req.user = mockUser; // Ensure req.user is set
                next();
            });
            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => next());
        });

        it('should delete a review and return status 200 if successful', async () => {
            jest.spyOn(ReviewController.prototype, "deleteReview").mockResolvedValueOnce();

            const response = await request(app)
                .delete(`${baseURL}/${mockProduct1.model}`)
                .send();

            expect(response.status).toBe(200);
            expect(ReviewController.prototype.deleteReview).toHaveBeenCalledWith(mockProduct1.model, mockUser);
        });

        it('should return status 401 if the user is not authenticated', async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                res.status(401).send('Unauthorized');
            });

            const response = await request(app)
                .delete(`${baseURL}/${mockProduct1.model}`)
                .send();

            expect(response.status).toBe(401); // Expect unauthorized status
        });

        it('should return status 403 if the user is not a customer', async () => {
            jest.spyOn(Authenticator.prototype, "isCustomer").mockImplementation((req, res, next) => {
                res.status(403).send('Forbidden');
            });

            const response = await request(app)
                .delete(`${baseURL}/${mockProduct1.model}`)
                .send();

            expect(response.status).toBe(403); // Expect forbidden status
        });

        it('should return status 503 if an error occurs in the controller', async () => {
            jest.spyOn(ReviewController.prototype, "deleteReview").mockRejectedValueOnce(new Error('Test error'));

            const response = await request(app)
                .delete(`${baseURL}/${mockProduct1.model}`)
                .send();

            expect(response.status).toBe(503); // Expect internal server error status
        });

    });
    /**FINE DESCRIBE DELETE /:model */


    /**TEST SUITE 3 */

    describe('DELETE /:model/all', () => {

        beforeEach(() => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                req.user = mockUser; // Ensure req.user is set
                next();
            });
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
        });

        it('should delete all reviews of a product and return status 200 if successful', async () => {
            jest.spyOn(ReviewController.prototype, "deleteReviewsOfProduct").mockResolvedValueOnce();

            const response = await request(app)
                .delete(`${baseURL}/${mockProduct1.model}/all`)
                .send();

            expect(response.status).toBe(200);
            expect(ReviewController.prototype.deleteReviewsOfProduct).toHaveBeenCalledWith(mockProduct1.model);
        });

        it('should return status 401 if the user is not authenticated', async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                res.status(401).send('Unauthorized');
            });

            const response = await request(app)
                .delete(`${baseURL}/${mockProduct1.model}/all`)
                .send();

            expect(response.status).toBe(401); // Expect unauthorized status
        });

        it('should return status 403 if the user is not an admin or manager', async () => {
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                res.status(403).send('Forbidden');
            });

            const response = await request(app)
                .delete(`${baseURL}/${mockProduct1.model}/all`)
                .send();

            expect(response.status).toBe(403); // Expect forbidden status
        });

        it('should return status 503 if an error occurs in the controller', async () => {
            jest.spyOn(ReviewController.prototype, "deleteReviewsOfProduct").mockRejectedValueOnce(new Error('Test error'));

            const response = await request(app)
                .delete(`${baseURL}/${mockProduct1.model}/all`)
                .send();

            expect(response.status).toBe(503); // Expect internal server error status
        });
    });
    /**FINE DESCRIBE DELETE /:model/all */

    /**TEST SUIT 4 */

    describe('DELETE /', () => {
        beforeEach(() => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                req.user = mockUser; // Ensure req.user is set
                next();
            });
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => next());
        });

        it('should delete all reviews and return status 200 if successful', async () => {
            jest.spyOn(ReviewController.prototype, "deleteAllReviews").mockResolvedValueOnce();

            const response = await request(app)
                .delete(baseURL)
                .send();

            expect(response.status).toBe(200);
            expect(ReviewController.prototype.deleteAllReviews).toHaveBeenCalled();
        });

        it('should return status 401 if the user is not authenticated', async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                res.status(401).send('Unauthorized');
            });

            const response = await request(app)
                .delete(baseURL)
                .send();

            expect(response.status).toBe(401); // Expect unauthorized status
        });

        it('should return status 403 if the user is not an admin or manager', async () => {
            jest.spyOn(Authenticator.prototype, "isAdminOrManager").mockImplementation((req, res, next) => {
                res.status(403).send('Forbidden');
            });

            const response = await request(app)
                .delete(baseURL)
                .send();

            expect(response.status).toBe(403); // Expect forbidden status
        });

        it('should return status 503 if an error occurs in the controller', async () => {
            jest.spyOn(ReviewController.prototype, "deleteAllReviews").mockRejectedValueOnce(new Error('Test error'));

            const response = await request(app)
                .delete(baseURL)
                .send();

            expect(response.status).toBe(503); // Expect internal server error status
        });
    });

    /**FINE DESCRIBE DELETE / */


     /**TEST SUITE 5 */
     describe('GET /:model ', () => {

        const mockUser: User = {
            username: "test",
            name: "test",
            surname: "test",
            role: Role.CUSTOMER,
            address: "via Prova",
            birthdate: "2000-01-01"
        };
    
        const mockReviews = [
            { model: "Iphone 13", user: "test", score: 5, date: "2024-01-03", comment: "Ottimo Prodotto" },
            { model: "Iphone 13", user: "test2", score: 4, date: "2024-01-03", comment: "Buon Prodotto" }
        ];

        beforeEach(() => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                req.user = mockUser; // Ensure req.user is set
                next();
            });
        });

        it('should get reviews for a product and return status 200 if successful', async () => {
            jest.spyOn(ReviewController.prototype, "getProductReviews").mockResolvedValueOnce(mockReviews);

            const response = await request(app)
                .get(`${baseURL}/${mockReviews[0].model}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockReviews);
            expect(ReviewController.prototype.getProductReviews).toHaveBeenCalledWith(mockReviews[0].model);
        });

        it('should return status 401 if the user is not authenticated', async () => {
            jest.spyOn(Authenticator.prototype, "isLoggedIn").mockImplementation((req, res, next) => {
                res.status(401).send('Unauthorized');
            });

            const response = await request(app)
                .get(`${baseURL}/${mockReviews[0].model}`)
                .send();

            expect(response.status).toBe(401); // Expect unauthorized status
        });

        it('should return status 503 if an error occurs in the controller', async () => {
            jest.spyOn(ReviewController.prototype, "getProductReviews").mockRejectedValueOnce(new Error('Test error'));

            const response = await request(app)
                .get(`${baseURL}/${mockReviews[0].model}`)
                .send();

            expect(response.status).toBe(503); // Expect internal server error status
        });
    });
    /** FINE DESCRIBE GET /:model */

})