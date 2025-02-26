import { expect, jest, it, afterEach, describe,beforeEach , test} from "@jest/globals"
import CartController from "../../src/controllers/cartController"

import ReviewDAO from "../../src/dao/reviewDAO"
import { User, Role } from "../../src/components/user"
import { Cart, ProductInCart } from "../../src/components/cart"
import { Product ,Category} from "../../src/components/product"
import {ExistingReviewError, NoReviewProductError, NoProductError} from "../../src/errors/reviewError"
import { ProductNotFoundError} from "../../src/errors/productError";
import { Database } from "sqlite3"
import db from "../../src/db/db"
import {EmptyProductStockError} from "../../src/errors/productError"
jest.mock("../../src/db/db.ts")
describe("ReviewDao", () => {
    const mockError = new Error('Test error');
    let reviewDAO = new ReviewDAO;
    const mockUser = {
        username: "test",
        name: "test",
        surname: "test",
        password: "test",
        role: Role.MANAGER,
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
        products: [mockProductInCart3,mockProductInCart1]

    }

    const mockCart3: Cart = {
        customer: "test2",
        paid: true,
        paymentDate: "01/03/2024",
        total: 1800,
        products: [mockProductInCart2,mockProductInCart4]

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


    const mockReview ={
        model: mockProductInCart4.model,
        user: mockUser.username,
        score: 3,
        date: "01/06/2024",
        comment: "Not exceptional"
    }


    beforeEach(() => {
        reviewDAO = new ReviewDAO();
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Ripristina tutti i mock dopo ogni test
    });



    describe("addReview", () => {
        test("should add a review - success", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, mockProduct1);
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });
            try {
                const result = await reviewDAO.addReview(mockProduct1.model,mockUser,2,"Good")
                expect(result).toBeUndefined();
            } finally {
                mockDBRun.mockRestore();
                mockDBGet.mockRestore();
            }
    
        });

        test("should not add a review - get fails", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(mockError,null );
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.addReview(mockProduct1.model,mockUser,2,"Good")).rejects.toThrow(mockError)
            } finally {
                mockDBRun.mockRestore();
                mockDBGet.mockRestore();
            }
    
        });
        test("should not add a review - run fails", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, mockProduct1);
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(mockError);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.addReview(mockProduct1.model,mockUser,2,"Good")).rejects.toThrow(mockError)

            } finally {
                mockDBRun.mockRestore();
                mockDBGet.mockRestore();
            }
    
        });

        test("should throw ExistingReviewError - run fails", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, mockProduct1);
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(new Error("UNIQUE constraint failed"));
                return {} as Database;
            });
            try {
                await expect(reviewDAO.addReview(mockProduct1.model,mockUser,2,"Good")).rejects.toThrow(ExistingReviewError)

            } finally {
                mockDBRun.mockRestore();
                mockDBGet.mockRestore();
            }
    
        });

        test("should throw NoReviewProductError - fails", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, undefined);
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(mockError);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.addReview(mockProduct1.model,mockUser,2,"Good")).rejects.toThrow(NoReviewProductError)

            } finally {
                mockDBRun.mockRestore();
                mockDBGet.mockRestore();
            }
    
        });
    });


    describe("getProductReviews", () => {
        test("should an array of reviews - success", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, mockProduct1);
                return {} as Database;
            });
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null,[mockReview]);
                return {} as Database;
            });
            try {
                const result = await reviewDAO.getProductReviews(mockProduct1.model)
                expect(result).toEqual([mockReview]);
            } finally {
                mockDBAll.mockRestore();
                mockDBGet.mockRestore();
            }
    
        });

        test("should throw NoReviewProductError - get fails", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null,undefined );
                return {} as Database;
            });
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null,[]);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.getProductReviews(mockProduct1.model)).rejects.toThrow(NoProductError)
            } finally {
                mockDBAll.mockRestore();
                mockDBGet.mockRestore();
            }
    
        });
        test("should return an Error- run fails", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, mockProduct1);
                return {} as Database;
            });
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(mockError,null);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.getProductReviews(mockProduct1.model)).rejects.toThrow(mockError)

            } finally {
                mockDBAll.mockRestore();
                mockDBGet.mockRestore();
            }
    
        });

        test("should throw NoReviewProductError - get fails", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(mockError,null);
                return {} as Database;
            });
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null,[]);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.getProductReviews(mockProduct1.model)).rejects.toThrow(mockError)
            } finally {
                mockDBAll.mockRestore();
                mockDBGet.mockRestore();
            }
    
    });

});
    describe("deleteProductReview", () => {
        test("should delete - success", async () => {
            const mockDBGet1 = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, mockProduct1);
                return {} as Database;
            });
            const mockDBGet2 = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, mockReview);
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null,null);
                return {} as Database;
            });
            try {
                const result = await reviewDAO.deleteProductReview(mockProduct1.model,mockUser)
                expect(result).toBeUndefined();
            } finally {
                mockDBRun.mockRestore();
                mockDBGet1.mockRestore();
                mockDBGet2.mockRestore();
            }
    
        });

        test("should throw an error - get1 fails", async () => {
            const mockDBGet1 = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });
            const mockDBGet2 = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, mockReview);
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null,null);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.deleteProductReview(mockProduct1.model,mockUser)).rejects.toThrow(mockError);
            } finally {
                mockDBRun.mockRestore();
                mockDBGet1.mockRestore();
                mockDBGet2.mockRestore();
            }
    
        });
        test("should not delete - get2 fails", async () => {
            const mockDBGet1 = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, mockProduct1);
                return {} as Database;
            });
            const mockDBGet2 = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(mockError,null);
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null,null);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.deleteProductReview(mockProduct1.model,mockUser)).rejects.toThrow(mockError);
            } finally {
                mockDBRun.mockRestore();
                mockDBGet1.mockRestore();
                mockDBGet2.mockRestore();
            }
    
        });

        test("should not delete - run fails", async () => {
            const mockDBGet1 = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, mockProduct1);
                return {} as Database;
            });
            const mockDBGet2 = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, mockReview);
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(mockError,null);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.deleteProductReview(mockProduct1.model,mockUser)).rejects.toThrow(mockError);
            } finally {
                mockDBRun.mockRestore();
                mockDBGet1.mockRestore();
                mockDBGet2.mockRestore();
            }
    
        });

        test("should throw NoReviewProductError - get2 fails", async () => {
            const mockDBGet1 = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, mockProduct1);
                return {} as Database;
            });
            const mockDBGet2 = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, undefined);
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null,null);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.deleteProductReview(mockProduct1.model,mockUser)).rejects.toThrow(NoReviewProductError);
            } finally {
                mockDBRun.mockRestore();
                mockDBGet1.mockRestore();
                mockDBGet2.mockRestore();
            }
    
        });

        test("should throw NoReviewProductError - get1 fails", async () => {
            const mockDBGet1 = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, undefined);
                return {} as Database;
            });
            const mockDBGet2 = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, mockReview);
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null,null);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.deleteProductReview(mockProduct1.model,mockUser)).rejects.toThrow(ProductNotFoundError);
            } finally {
                mockDBRun.mockRestore();
                mockDBGet1.mockRestore();
                mockDBGet2.mockRestore();
            }
    
        });
    });

    describe("deleteAllReviews", () => {
        test("should delete - success", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null,null);
                return {} as Database;
            });
            try {
                const result = await reviewDAO.deleteAllReviews()
                expect(result).toBeUndefined();
            } finally {
                mockDBRun.mockRestore();
            }
    
        });

        test("should throw NoReviewProductError - get fails", async () => {
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(mockError,null);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.deleteAllReviews()).rejects.toThrow(mockError)
            } finally {
                mockDBRun.mockRestore();
            }
    
        });
    });

    describe("deleteReviewsOfProduct", () => {
        test("should delete - success", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, mockProduct1);
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(null,null);
                return {} as Database;
            });
            try {
                const result = await reviewDAO.deleteReviewsOfProduct(mockProduct1.model)
                expect(result).toBeUndefined();
            } finally {
                mockDBGet.mockRestore();
                mockDBRun.mockRestore();
            }
    
        });

        test("should throw an error  - get fails", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null,undefined );
                return {} as Database;
            });
            const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
                callback(mockError,null);
                return {} as Database;
            });
            try {
                await expect(reviewDAO.deleteReviewsOfProduct(mockProduct1.model)).rejects.toThrow(ProductNotFoundError)
            } finally {
                mockDBGet.mockRestore();
                mockDBRun.mockRestore();
            }
    
        });
    });
    
    test("should throw an error  - db get fails", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(mockError, null);
            return {} as Database;
        });
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            callback(mockError,null);
            return {} as Database;
        });
        try {
            await expect(reviewDAO.deleteReviewsOfProduct(mockProduct1.model)).rejects.toThrow()
        } finally {
            mockDBGet.mockRestore();
            mockDBRun.mockRestore();
        }

    });

    test("should throw an error  - db run fails", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(null, mockProduct1);
            return {} as Database;
        });
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            callback(mockError,null);
            return {} as Database;
        });
        try {
            await expect(reviewDAO.deleteReviewsOfProduct(mockProduct1.model)).rejects.toThrow(mockError)
        } finally {
            mockDBGet.mockRestore();
            mockDBRun.mockRestore();
        }

    });
});

