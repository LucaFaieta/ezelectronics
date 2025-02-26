import { expect, jest, it, afterEach, describe,beforeEach , test} from "@jest/globals"
import CartController from "../../src/controllers/cartController"

import CartDAO from "../../src/dao/cartDAO"
import { User, Role } from "../../src/components/user"
import { Cart, ProductInCart } from "../../src/components/cart"
import { Product ,Category} from "../../src/components/product"
import {CartNotFoundError,ProductInCartError,ProductNotInCartError,WrongUserCartError,EmptyCartError} from "../../src/errors/cartError"
import {ProductNotFoundError, ProductAlreadyExistsError, ProductSoldError, EmptyProductStockError, LowProductStockError } from "../../src/errors/productError"
import { Database } from "sqlite3"
import db from "../../src/db/db"
jest.mock("../../src/db/db.ts")


describe("CartDao", () => {

    const mockError = new Error('Test error');
    let cartDao = new CartDAO;
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

    const mockProduct6: Product = {
        model: "Air pods",
        sellingPrice: 300,
        category: Category.APPLIANCE,
        arrivalDate: null,
        details: null,
        quantity: 1
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
        paymentDate: "",
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
        paymentDate: "",
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

    beforeEach(() => {
        cartDao = new CartDAO();
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Ripristina tutti i mock dopo ogni test
    });
    describe("getCartId", () => {
        test("should return cart id - success", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, {id:1});
                return {} as Database;
            });
            try {
                const result = await cartDao.getCartId(mockUser);
                expect(result).toBe(1);
            } finally {
                mockDBGet.mockRestore();
            }
    
        });

        test("should return cart id but cart to be created- success", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, undefined);
                return {} as Database;
            }).mockImplementationOnce((sql, params, callback) => {
                callback(null, {id:1});
                return {} as Database;
            });
            jest.spyOn(CartDAO.prototype,"createCart").mockResolvedValue(mockCart1);
            try {
                const result = await cartDao.getCartId(mockUser);
                expect(result).toBe(1);
            } finally {
                mockDBGet.mockRestore();
            }
    
        });

        test("should return an error - fail", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });
            try {
                await expect(cartDao.getCartId(mockUser)).rejects.toThrow(mockError);
            } finally {
                mockDBGet.mockRestore();
            }
    
        })
    });


    describe("getCartProducts", () => {
        test("should return array of products in cart - success", async () => {
            jest.spyOn(CartDAO.prototype,"getCartId").mockResolvedValueOnce(1);
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, [mockProductInCart1,mockProductInCart2,mockProductInCart3]);
                return {} as Database;
            });
            try {
                const result = await cartDao.getCartProducts(mockUser);
                expect(result).toEqual([mockProductInCart1,mockProductInCart2,mockProductInCart3]);
                expect(result.length).toBe(3)
            } finally {
                mockDBAll.mockRestore();
            }
    
        });

        test("should return an empty array - success", async () => {
            jest.spyOn(CartDAO.prototype,"getCartId").mockResolvedValueOnce(1);
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(null, []);
                return {} as Database;
            });
            try {
                const result = await cartDao.getCartProducts(mockUser);
                expect(result).toEqual([]);
                expect(result.length).toBe(0)
            } finally {
                mockDBAll.mockRestore();
            }
    
        });

        test("should return an Error - all fails", async () => {
            jest.spyOn(CartDAO.prototype,"getCartId").mockResolvedValueOnce(1);
            const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });
            try {
                await expect(cartDao.getCartProducts(mockUser)).rejects.toThrow(mockError);
            } finally {
                mockDBAll.mockRestore();
            }
    
        });


    });
    

    describe("createCart", () => {
        test("should return the cart created - success", async () => {
            const mockDBrun = jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
                callback.call({lastID:1}, null);
                return {} as Database;
            });
            const mockDBGet = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, {
                    customer: "test4",
                    paid: false,
                    paymentDate: null,
                    total: 0
                });
                return {} as Database;
            });
            try {
                const result = await cartDao.createCart(mockUser);
                expect(result.customer).toEqual(mockCart5.customer);
                expect(result.paid).toEqual(mockCart5.paid);
                expect(result.products).toEqual(mockCart5.products);
                expect(result.total).toEqual(mockCart5.total);
            } finally {
                mockDBGet.mockRestore();
                mockDBrun.mockRestore();
            }
    
        });

        test("should throw an error - run fails", async () => {
            const mockDBrun = jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });
            const mockDBGet = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(null, {
                    customer: "test4",
                    paid: false,
                    paymentDate: null,
                    total: 0
                });
                return {} as Database;
            });
            try {
                await expect(cartDao.createCart(mockUser)).rejects.toThrow(mockError);
            } finally {
                mockDBGet.mockRestore();
                mockDBrun.mockRestore();
            }
    
        });

        test("should throw an error - get fails", async () => {
            const mockDBrun = jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
                callback.call({lastID:1}, null);
                return {} as Database;
            });
            const mockDBGet = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });
            try {
                await expect(cartDao.createCart(mockUser)).rejects.toThrow(mockError);
            } finally {
                mockDBGet.mockRestore();
                mockDBrun.mockRestore();
            }
    
        });
    });


    describe("getCart", () => {
        test("should return the cart - success", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null,{customer: "test2",
                    paid: false,
                    paymentDate: null,
                    total: 0 });
                return {} as Database;
            });
            jest.spyOn(CartDAO.prototype, "getCartProducts").mockResolvedValueOnce([mockProductInCart3,mockProductInCart1]);

            try {
                const result = await cartDao.getCart(mockUser2);
                expect(result.customer).toEqual(mockCart2.customer);
                expect(result.paid).toEqual(mockCart2.paid);
                expect(result.products).toEqual(mockCart2.products);
                expect(result.total).toEqual(mockCart2.total);
                expect(CartDAO.prototype.getCartProducts).toHaveBeenCalledTimes(1);
                expect(CartDAO.prototype.getCartProducts).toHaveBeenCalledWith(mockUser2);
            } finally {
                mockDBGet.mockRestore();
            }
    
        });

        test("should return the cart - success with row = 0", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null,null);
                return {} as Database;
            });
            jest.spyOn(CartDAO.prototype, "getCartProducts").mockResolvedValueOnce([mockProductInCart3,mockProductInCart1]);
            //jest.spyOn(CartDAO.prototype, "createCart").mockResolvedValueOnce(mockCart5);

            try {
                const result = await cartDao.getCart(mockUser4);
                expect(result.customer).toEqual(mockCart5.customer);
                expect(result.paid).toEqual(mockCart5.paid);
                expect(result.products).toEqual(mockCart5.products);
                expect(result.total).toEqual(mockCart5.total);
                expect(CartDAO.prototype.getCartProducts).toHaveBeenCalledTimes(0);
            } finally {
                mockDBGet.mockRestore();
            }
    
        });

        test("should throw an error - get fails", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(mockError,null);
                return {} as Database;
            });
            jest.spyOn(CartDAO.prototype, "createCart").mockResolvedValueOnce(mockCart2);
            jest.spyOn(CartDAO.prototype, "getCartProducts").mockResolvedValueOnce([mockProductInCart3,mockProductInCart1]);

            try {
                await expect(cartDao.getCart(mockUser2)).rejects.toThrow(mockError);
                expect(CartDAO.prototype.getCartProducts).toHaveBeenCalledTimes(0);
            } finally {
                mockDBGet.mockRestore();
            }
    
        });

        test("should throw an error - createCart fails", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(mockError,null);
                return {} as Database;
            });
            jest.spyOn(CartDAO.prototype, "createCart").mockRejectedValueOnce(mockError);
            jest.spyOn(CartDAO.prototype, "getCartProducts").mockResolvedValueOnce([mockProductInCart3,mockProductInCart1]);

            try {
                await expect(cartDao.getCart(mockUser2)).rejects.toThrow(mockError);
                expect(CartDAO.prototype.getCartProducts).toHaveBeenCalledTimes(0);
            } finally {
                mockDBGet.mockRestore();
            }
    
        });

        test("should throw an error - getCartProducts fails", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(mockError,null);
                return {} as Database;
            });
            jest.spyOn(CartDAO.prototype, "createCart").mockResolvedValueOnce(mockCart2);
            jest.spyOn(CartDAO.prototype, "getCartProducts").mockRejectedValueOnce(mockError);

            try {
                await expect(cartDao.getCart(mockUser2)).rejects.toThrow(mockError);
                expect(CartDAO.prototype.getCartProducts).toHaveBeenCalledTimes(0);
            } finally {
                mockDBGet.mockRestore();
            }
    
        });

    });


    describe("addProductCart", () => {
        test("should return the cart - success", async () => {
        const mockDBrun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            callback(null, null);
            return {} as Database;
        });
        jest.spyOn(CartDAO.prototype, "takeCategory").mockResolvedValueOnce(mockProduct5.category);
        jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(mockProduct5.sellingPrice);

        try {
            const result = await cartDao.addProductCart(1,mockUser,mockProduct5.model)
            expect(result).toBe(true);
            expect(CartDAO.prototype.takeCategory).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.takeCategory).toHaveBeenCalledWith(mockProduct5.model);
            expect(CartDAO.prototype.takePrice).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.takePrice).toHaveBeenCalledWith(mockProduct5.model);
        } finally {
            mockDBrun.mockRestore();
        }

    });

    test("should not return - run1 fails", async () => {
        const mockDBrun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            callback(mockError, null);
            return {} as Database;
        });
        jest.spyOn(CartDAO.prototype, "takeCategory").mockResolvedValueOnce(mockProduct5.category);
        jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(mockProduct5.sellingPrice);

        try {
            await expect(cartDao.addProductCart(1,mockUser,mockProduct5.model)).rejects.toThrow(mockError);
            expect(CartDAO.prototype.takeCategory).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.takeCategory).toHaveBeenCalledWith(mockProduct5.model);
            expect(CartDAO.prototype.takePrice).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.takePrice).toHaveBeenCalledWith(mockProduct5.model);
        } finally {
            mockDBrun.mockRestore();
        }

    });

    test("should not return - run2 fails", async () => {
        const mockDBrun = jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
            callback(null, null);
            return {} as Database;
        }).mockImplementationOnce((sql, params, callback) => {
            callback(mockError, null);
            return {} as Database;
        });
        jest.spyOn(CartDAO.prototype, "takeCategory").mockResolvedValueOnce(mockProduct5.category);
        jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(mockProduct5.sellingPrice);

        try {
            await expect(cartDao.addProductCart(1,mockUser,mockProduct5.model)).rejects.toThrow(mockError);
            expect(CartDAO.prototype.takeCategory).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.takeCategory).toHaveBeenCalledWith(mockProduct5.model);
            expect(CartDAO.prototype.takePrice).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.takePrice).toHaveBeenCalledWith(mockProduct5.model);
        } finally {
            mockDBrun.mockRestore();
        }

    });

    test("should not return - takeCategory fails", async () => {
        const mockDBrun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            callback(null, null);
            return {} as Database;
        });
        jest.spyOn(CartDAO.prototype, "takeCategory").mockRejectedValueOnce(mockError);
        jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(mockProduct5.sellingPrice);

        try {
            await expect(cartDao.addProductCart(1,mockUser,mockProduct5.model)).rejects.toThrow(mockError);
            expect(CartDAO.prototype.takeCategory).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.takeCategory).toHaveBeenCalledWith(mockProduct5.model);
            expect(CartDAO.prototype.takePrice).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.takePrice).toHaveBeenCalledWith(mockProduct5.model);
        } finally {
            mockDBrun.mockRestore();
        }

    });
});



describe("addToCart", () => {
    test("should return the cart - success", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(null,{count:1});
            return {} as Database;
        });
        jest.spyOn(CartDAO.prototype, "changeQuantityOnCarts").mockResolvedValueOnce(undefined);
        jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);
        jest.spyOn(CartDAO.prototype, "takeQuantity").mockResolvedValueOnce(1);
        jest.spyOn(CartDAO.prototype, "addProductCart").mockResolvedValueOnce(true);


        try {
            const result = await cartDao.addToCart(mockUser,mockProductInCart4.model)
            expect(result).toEqual(true);
        } finally {
            mockDBGet.mockRestore();
        }

    });


    test("should return the cart - success", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(null,{count:0});
            return {} as Database;
        });
        jest.spyOn(CartDAO.prototype, "changeQuantityOnCarts").mockResolvedValueOnce(undefined);
        jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);
        jest.spyOn(CartDAO.prototype, "takeQuantity").mockResolvedValueOnce(1);
        jest.spyOn(CartDAO.prototype, "addProductCart").mockResolvedValueOnce(true);

        try {
            const result = await cartDao.addToCart(mockUser,mockProductInCart4.model)
            expect(result).toEqual(true);
        } finally {
            mockDBGet.mockRestore();
        }

    });
    test("should return false - fail", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(mockError,null);
            return {} as Database;
        });
        jest.spyOn(CartDAO.prototype, "changeQuantityOnCarts").mockResolvedValueOnce(undefined);
        jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);
        jest.spyOn(CartDAO.prototype, "takeQuantity").mockResolvedValueOnce(1);
        jest.spyOn(CartDAO.prototype, "addProductCart").mockResolvedValueOnce(true);

        try {
            await expect(cartDao.addToCart(mockUser,mockProductInCart4.model)).rejects.toThrow(mockError);
        } finally {
            mockDBGet.mockRestore();
        }

    });

    test("should return false - fail", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(mockError,null);
            return {} as Database;
        });
        jest.spyOn(CartDAO.prototype, "changeQuantityOnCarts").mockResolvedValueOnce(undefined);
        jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);
        jest.spyOn(CartDAO.prototype, "takeQuantity").mockResolvedValueOnce(0);
        jest.spyOn(CartDAO.prototype, "addProductCart").mockResolvedValueOnce(true);

        try {
            await expect(cartDao.addToCart(mockUser,mockProductInCart4.model)).rejects.toThrow(EmptyProductStockError);
        } finally {
        }

    });
});


describe("takePrice,takeCategory,takeQuantity", () => {
    test("should return the price on takePrice - success ", async () => {
    const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
        callback(null, {sellingPrice:mockProduct5.sellingPrice});
        return {} as Database;
    });

    try {
        const result = await cartDao.takePrice(mockProduct5.model)
        expect(result).toEqual(mockProduct5.sellingPrice);
    } finally {
        mockDBGet.mockRestore();
    }

    });

    test("should return the Error on takePrice", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(null, {undefined});
            return {} as Database;
        });
    
        try {
            
            await expect(cartDao.takePrice(mockProduct5.model)).rejects.toThrow(`Product with model '${mockProduct5.model}' not found or price not available`);
        } finally {
            mockDBGet.mockRestore();
        }
    });

    test("should return an Error on takePrice", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(mockError, null);
            return {} as Database;
        });
    
        try {
            
            await expect(cartDao.takePrice(mockProduct5.model)).rejects.toThrow(mockError);
        } finally {
            mockDBGet.mockRestore();
        }
    });

    test("should return the Error on takeCategory", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(null, undefined);
            return {} as Database;
        });
    
        try {
            await expect(cartDao.takeCategory(mockProduct5.model)).rejects.toThrow(`Product with model '${mockProduct5.model}' not found or category not available`);
        } finally {
            mockDBGet.mockRestore();
        }
    });

    test("should return an Error on takeCategory", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(mockError, null);
            return {} as Database;
        });
    
        try {
            
            await expect(cartDao.takeCategory(mockProduct5.model)).rejects.toThrow(mockError);
        } finally {
            mockDBGet.mockRestore();
        }
    });

    test("should return the price on takeCategory - success ", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(null, {category:mockProduct5.category});
            return {} as Database;
        });
    
        try {
            const result = await cartDao.takeCategory(mockProduct5.model)
            expect(result).toEqual(mockProduct5.category);
        } finally {
            mockDBGet.mockRestore();
        }
    
        });

        test("should return the Error on takeQuantity", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, undefined);
                return {} as Database;
            });
        
            try {
                await expect(cartDao.takeQuantity(mockProduct5.model)).rejects.toThrow(`Product with model '${mockProduct5.model}' not found or quantity not available`);
            } finally {
                mockDBGet.mockRestore();
            }
        });
    
        test("should return an Error on takeQuantity", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(mockError, null);
                return {} as Database;
            });
        
            try {
                
                await expect(cartDao.takeQuantity(mockProduct5.model)).rejects.toThrow(mockError);
            } finally {
                mockDBGet.mockRestore();
            }
        });
    
        test("should return the price on takeQuantity - success ", async () => {
            const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
                callback(null, {quantity:mockProduct5.quantity});
                return {} as Database;
            });
        
            try {
                const result = await cartDao.takeQuantity(mockProduct5.model);
                expect(result).toEqual(mockProduct5.quantity);
            } finally {
                mockDBGet.mockRestore();
            }
        
            });
});


describe("changeQuantityOnCarts", () => {
    test("should return the cart - success", async () => {
    const mockDBrun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
        callback(null, null);
        return {} as Database;
    });
            jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(170);

    try {
        const result = await cartDao.changeQuantityOnCarts(1,mockProduct5.model);
        expect(result).toBeUndefined();
        
        expect(CartDAO.prototype.takePrice).toHaveBeenCalledTimes(1);
        expect(CartDAO.prototype.takePrice).toHaveBeenCalledWith(mockProduct5.model);
    } finally {
        mockDBrun.mockRestore();
    }

});
    test("should return an error - run1 fail", async () => {
        
        const mockDBrun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            callback(mockError);
            return {} as Database;
        });
        jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(170);
        try {
            await expect(cartDao.changeQuantityOnCarts(1, mockProduct5.model)).rejects.toThrow(mockError);
        } finally {
            mockDBrun.mockRestore();
        }

});


test("should return an error - run2 fail", async () => {
        
    const mockDBrun = jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
        callback(null,null);
        return {} as Database;
    }).mockImplementationOnce((sql, params, callback) => {
        callback(mockError);
        return {} as Database;
    });
    jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(170);
    try {
        await expect(cartDao.changeQuantityOnCarts(1, mockProduct5.model)).rejects.toThrow(mockError);
    } finally {
        mockDBrun.mockRestore();
    }

});
});

describe("getProduct", () => {
    test("should return the product - success", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(null, {model:mockProduct1.model,
                            sellingPrice:mockProduct1.sellingPrice,
                            category:mockProduct1.category,
                            arrivalDate: mockProduct1.arrivalDate,
                            details: mockProduct1.details,
                            quantity: mockProduct1.quantity
            });
            return {} as Database;
        });
        try {
            const result = await cartDao.getProduct(mockProduct1.model);
            expect(result).toEqual(mockProduct1);
        } finally {
            mockDBGet.mockRestore();
        }

    })

    test("should return an error - fail", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(mockError, null);
            return {} as Database;
        });
        try {
            await expect(cartDao.getProduct(mockProduct1.model)).rejects.toThrow(mockError);
        } finally {
            mockDBGet.mockRestore();
        }

    })

    test("should throw ProductNotFoundError - fail", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(null, null);
            return {} as Database;
        });
        try {
            await expect(cartDao.getProduct(mockProduct1.model)).rejects.toThrow(ProductNotFoundError);
        } finally {
            mockDBGet.mockRestore();
        }

    })
});


describe("checkoutCart", () => {
    
    test("should return true - success", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(null, {...mockCart2,id:1});
            return {} as Database;
        });
        const mockDBRun1 = jest.spyOn(db, "run").mockImplementationOnce((sql, callback) => {
            callback(null,null); 
            return {} as Database;
        }).mockImplementationOnce((sql, parameters,callback) => {
            callback(null,null); 
            return {} as Database;
        }).mockImplementationOnce((sql, parameters,callback) => {
            callback(null,null); 
            return {} as Database;
        }).mockImplementation((sql, callback) => {
            callback(null,null); 
            return {} as Database;
        });
      //  jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);
        jest.spyOn(CartDAO.prototype, "getCartProducts").mockResolvedValue([mockProductInCart3]);
        jest.spyOn(CartDAO.prototype, "getProduct").mockResolvedValueOnce(mockProduct3);
        try{
        //expect(CartDAO.prototype.getCartProducts).toHaveBeenCalledTimes(1);
        const result = await cartDao.checkoutCart(mockUser2);
        expect(result).toBe(true);
    }finally{
        mockDBRun1.mockReset();
    }

});

test("should throw LowProductStockError - fail", async () => {
    const mockDBRun1 = jest.spyOn(db, "run").mockImplementationOnce((sql, callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementationOnce((sql, parameters,callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementationOnce((sql, parameters,callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementation((sql, callback) => {
        callback(null,null); 
        return {} as Database;
    });
    //jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);
    jest.spyOn(CartDAO.prototype, "getCartProducts").mockResolvedValue([mockProductInCart3]);
    jest.spyOn(CartDAO.prototype, "getProduct").mockResolvedValueOnce(mockProduct6);
    try{
    await expect(cartDao.checkoutCart(mockUser2)).rejects.toThrow(LowProductStockError);
}finally{
    mockDBRun1.mockReset();
}

});

test("should throw EmptyCartError - fail", async () => {
    const mockDBRun1 = jest.spyOn(db, "run").mockImplementationOnce((sql, callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementationOnce((sql, parameters,callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementationOnce((sql, parameters,callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementation((sql, callback) => {
        callback(null,null); 
        return {} as Database;
    });
    //jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);
    jest.spyOn(CartDAO.prototype, "getCartProducts").mockResolvedValue([]);
    jest.spyOn(CartDAO.prototype, "getProduct").mockResolvedValueOnce(mockProduct6);
    try{
    await expect(cartDao.checkoutCart(mockUser2)).rejects.toThrow(EmptyCartError);
}finally{
    mockDBRun1.mockReset();
}

});
test("should throw an error - UPDATE2 fail", async () => {
    const mockDBRun1 = jest.spyOn(db, "run").mockImplementationOnce((sql, callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementationOnce((sql, parameters,callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementationOnce((sql, parameters,callback) => {
        callback(mockError,null); 
        return {} as Database;
    }).mockImplementation((sql, callback) => {
        callback(null,null); 
        return {} as Database;
    });
    //jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);
    jest.spyOn(CartDAO.prototype, "getCartProducts").mockResolvedValue([mockProductInCart3]);
    jest.spyOn(CartDAO.prototype, "getProduct").mockResolvedValueOnce(mockProduct3);
    try{
    await expect(cartDao.checkoutCart(mockUser2)).rejects.toThrow(mockError);
}finally{
    mockDBRun1.mockReset();
}

});

test("should throw an error - COMMIT fail", async () => {
    const mockDBRun1 = jest.spyOn(db, "run").mockImplementationOnce((sql, callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementationOnce((sql, parameters,callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementationOnce((sql, parameters,callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementation((sql, callback) => {
        callback(mockError,null); 
        return {} as Database;
    });
   // jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);
    jest.spyOn(CartDAO.prototype, "getCartProducts").mockResolvedValue([mockProductInCart3]);
    jest.spyOn(CartDAO.prototype, "getProduct").mockResolvedValueOnce(mockProduct3);
    try{
    await expect(cartDao.checkoutCart(mockUser2)).rejects.toThrow(mockError);
}finally{
    mockDBRun1.mockReset();
}
});

test("should throw an error - BEGIN fail", async () => {
    const mockDBRun1 = jest.spyOn(db, "run").mockImplementationOnce((sql, callback) => {
        callback(mockError,null); 
        return {} as Database;
    }).mockImplementationOnce((sql,callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementationOnce((sql, parameters,callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementation((sql, callback) => {
        callback(null,null); 
        return {} as Database;
    });
   // jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);
    jest.spyOn(CartDAO.prototype, "getCartProducts").mockResolvedValue([mockProductInCart3]);
    jest.spyOn(CartDAO.prototype, "getProduct").mockResolvedValueOnce(mockProduct3);
    try{
    await expect(cartDao.checkoutCart(mockUser2)).rejects.toThrow(mockError);
}finally{
    mockDBRun1.mockReset();
}

});
test("should throw an error - UPDATE1 fail", async () => {
    const mockDBRun1 = jest.spyOn(db, "run").mockImplementationOnce((sql, callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementationOnce((sql, parameters,callback) => {
        callback(mockError,null); 
        return {} as Database;
    }).mockImplementationOnce((sql,callback) => {
        callback(null,null); 
        return {} as Database;
    }).mockImplementation((sql, callback) => {
        callback(null,null); 
        return {} as Database;
    });
    //jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);
    jest.spyOn(CartDAO.prototype, "getCartProducts").mockResolvedValue([mockProductInCart3]);
    jest.spyOn(CartDAO.prototype, "getProduct").mockResolvedValueOnce(mockProduct3);
    try{
    await expect(cartDao.checkoutCart(mockUser2)).rejects.toThrow(mockError);
}finally{
    mockDBRun1.mockReset();
}

});
});

describe("getProductsById", () => {
    test("should return an arrray of ProductInCart - success", async () => {
        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
            callback(null, [mockProductInCart1,mockProductInCart2]);
            return {} as Database;
        });
        try {
            const result = await cartDao.getProductsById(1);
            expect(result).toEqual([mockProductInCart1,mockProductInCart2]);
        } finally {
            mockDBAll.mockRestore();
        }

    })

    test("should return an error - fail", async () => {
        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
            callback(mockError, null);
            return {} as Database;
        });
        try {
            await expect(cartDao.getProductsById(1)).rejects.toThrow(mockError);
        } finally {
            mockDBAll.mockRestore();
        }

    })
    test("should return an arrray of ProductInCart - success", async () => {
        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
            callback(null, []);
            return {} as Database;
        });
        try {
            const result = await cartDao.getProductsById(1);
            expect(result).toEqual([]);
        } finally {
            mockDBAll.mockRestore();
        }

    })
});

describe("getCustomerCarts", () => {
    test("should return an array of carts - success", async () => {
        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
            callback(null, [mockCart4,mockCart6]);
            return {} as Database;
        });

        jest.spyOn(CartDAO.prototype, "getProductsById").mockResolvedValueOnce([mockProductInCart4]).mockResolvedValueOnce([mockProductInCart4]);

        try {
            const result = await cartDao.getCustomerCarts(mockUser);

            expect(result).toEqual([
                mockCart4,
                mockCart6
            ]);

        } finally{
            mockDBAll.mockRestore();
        }
    });

    test("should return an empty array - no paid carts found", async () => {
        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
            callback(null, []);
            return {} as Database;
        });

        const mockGetProductsById = jest.spyOn(CartDAO.prototype, "getProductsById")
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);
        try {
            const result = await cartDao.getCustomerCarts(mockUser);

            expect(result).toEqual([]);

        } catch (error) {
            mockDBAll.mockRestore();
        }
    });

    test("should reject with Error - database error", async () => {
        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, params, callback) => {
            callback(mockError, null);
            return {} as Database;
        });
        try {
            await expect(cartDao.getCustomerCarts(mockUser)).rejects.toThrowError(mockError);

        } finally {
            mockDBAll.mockRestore();
        }
    });

});

describe("removeProductFromCart", () => {
    test("should return true quantity > 1- success", async () => {
    const mockDBGet = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
        callback(null,{quantity:mockProductInCart4.quantity});
        return {} as Database;
    });
    const mockDBrun1 = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
        callback(null, null);
        return {} as Database;
    });
    jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(mockProduct4.sellingPrice).mockResolvedValueOnce(mockProduct4.sellingPrice);
    jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);

    try {
        const result = await cartDao.removeProductFromCart(mockUser,mockProduct4.model)
        expect(result).toBe(true);
    } finally {
        mockDBGet.mockRestore();
        mockDBrun1.mockRestore();
    }


});
test("should return true quantity == 1 - success", async () => {
    const mockDBGet = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
        callback(null,{...mockCart1,id:1});
        return {} as Database;
    }).mockImplementationOnce((sql, params, callback) => {
        callback(null,{quantity:mockProductInCart1.quantity});
        return {} as Database;
    });
    const mockDBrun1 = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
        callback(null, null);
        return {} as Database;
    });
    jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(mockProduct1.sellingPrice);
    jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);

    try {
        const result = await cartDao.removeProductFromCart(mockUser,mockProduct1.model)
        expect(result).toBe(true);
    } finally {
        mockDBGet.mockRestore();
        mockDBrun1.mockRestore();
    }


});

test("should throw an error with quantity == 1 - fail", async () => {
    const mockDBGet = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
        callback(null,{...mockCart1,id:1});
        return {} as Database;
    }).mockImplementationOnce((sql, params, callback) => {
        callback(null,{quantity:mockProductInCart1.quantity});
        return {} as Database;
    });
    const mockDBrun1 = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
        callback(mockError, null);
        return {} as Database;
    });
    jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(mockProduct1.sellingPrice);
    jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);

    try {
        await expect(cartDao.removeProductFromCart(mockUser,mockProduct1.model)).rejects.toThrowError(mockError);
    } finally {
        mockDBGet.mockRestore();
        mockDBrun1.mockRestore();
    }


});
test("should throw ProductNotInCartError - fail", async () => {
    const mockDBGet = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
        callback(null,{...mockCart1,id:1});
        return {} as Database;
    }).mockImplementation((sql, params, callback) => {
        callback(null,undefined);
        return {} as Database;
    });
    const mockDBrun1 = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
        callback(null, null);
        return {} as Database;
    });
    jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(mockProduct4.sellingPrice).mockResolvedValueOnce(mockProduct4.sellingPrice);
    jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);

    try {
        await expect(cartDao.removeProductFromCart(mockUser,mockProduct1.model)).rejects.toThrowError(ProductNotInCartError);
    } finally {
        mockDBGet.mockRestore();
        mockDBrun1.mockRestore();
    }
});

test("should throw an error - get fails", async () => {
    const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
        callback(mockError,null);
        return {} as Database;
    });
    const mockDBrun1 = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
        callback(null, null);
        return {} as Database;
    });
    jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(mockProduct4.sellingPrice).mockResolvedValueOnce(mockProduct4.sellingPrice);
    jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);

    try {
        await expect(cartDao.removeProductFromCart(mockUser,mockProduct1.model)).rejects.toThrowError(mockError);
    } finally {
        mockDBGet.mockRestore();
        mockDBrun1.mockRestore();
    }
});

test("should throw an error - run1 fails", async () => {
    const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
        callback(null,{quantity:mockProductInCart4.quantity});
        return {} as Database;
    });
    const mockDBrun1 = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
        callback(mockError, null);
        return {} as Database;
    });
    jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(mockProduct4.sellingPrice).mockResolvedValueOnce(mockProduct4.sellingPrice);
    jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);

    try {
        await expect(cartDao.removeProductFromCart(mockUser,mockProduct1.model)).rejects.toThrowError(mockError);
    } finally {
        mockDBGet.mockRestore();
        mockDBrun1.mockRestore();
    }
});

test("should throw an error - run2 fails", async () => {
    const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
        callback(null,{quantity:mockProductInCart4.quantity});
        return {} as Database;
    });
    const mockDBrun1 = jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
        callback(null, null);
        return {} as Database;
    }).mockImplementationOnce((sql, params, callback) => {
        callback(mockError, null);
        return {} as Database;
    });
    jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(mockProduct4.sellingPrice).mockResolvedValueOnce(mockProduct4.sellingPrice);
    jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);

    try {
        await expect(cartDao.removeProductFromCart(mockUser,mockProduct1.model)).rejects.toThrowError(mockError);
    } finally {
        mockDBGet.mockRestore();
        mockDBrun1.mockRestore();
    }
});

test("should throw an error - run4 fails", async () => {
    const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
        callback(null,{quantity:1});
        return {} as Database;
    });
    const mockDBrun1 = jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
        callback(mockError, null);
        return {} as Database;
    });
    jest.spyOn(CartDAO.prototype, "takePrice").mockResolvedValueOnce(mockProduct4.sellingPrice).mockResolvedValueOnce(mockProduct4.sellingPrice);
    jest.spyOn(CartDAO.prototype, "getCartId").mockResolvedValueOnce(1);

    try {
        await expect(cartDao.removeProductFromCart(mockUser,mockProduct1.model)).rejects.toThrowError(mockError);
    } finally {
        mockDBGet.mockRestore();
        mockDBrun1.mockRestore();
    }
});
});


describe("clearCart", () => {

  
    test("should clear cart successfully- succes", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementation((sql, params, callback) => {
            callback(null, { id: 1 }); // Simula il recupero di un id valido
            return {} as Database;
        });
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, params, callback) => {
            callback(null,null); // Simula successo nella cancellazione dei prodotti
            return {} as Database;
        });
    
        try {
            const result = await cartDao.clearCart(mockUser);
            expect(result).toBe(true);

        } finally{
            mockDBGet.mockRestore();
            mockDBRun.mockRestore();
        }
    });

    test("should throw an error - get fails", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
            callback(mockError,null);  
            return {} as Database;
        });
        const mockDBRun = jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
            callback(null,null); 
            return {} as Database;
        });
        try{
            await expect(cartDao.clearCart(mockUser)).rejects.toThrowError(mockError);
        } finally{
            mockDBGet.mockRestore() ;
            mockDBRun.mockRestore();
        }
    });

    test("should throw an error - run1 fails", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
            callback(null,{ id: 1 });  
            return {} as Database;
        });
        const mockDBRun = jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
            callback(mockError,null); 
            return {} as Database;
        }).mockImplementationOnce((sql, params, callback) => {
            callback(null,null); 
            return {} as Database;
        });
        try{
            await expect(cartDao.clearCart(mockUser)).rejects.toThrowError(mockError);
        } finally{
            mockDBGet.mockRestore() ;
            mockDBRun.mockRestore();
        }
    });

    test("should throw an error - run2 fails", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
            callback(null,{ id: 1 });  
            return {} as Database;
        });
        const mockDBRun = jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
            callback(null,null); 
            return {} as Database;
        }).mockImplementationOnce((sql, params, callback) => {
            callback(mockError,null); 
            return {} as Database;
        });
        try{
            await expect(cartDao.clearCart(mockUser)).rejects.toThrowError(mockError);
        } finally{
            mockDBGet.mockRestore() ;
            mockDBRun.mockRestore();
        }
    });

    test("should throw CartNotFoundError - fail", async () => {
        const mockDBGet = jest.spyOn(db, "get").mockImplementationOnce((sql, params, callback) => {
            callback(null,null);  
            return {} as Database;
        });
        const mockDBRun = jest.spyOn(db, "run").mockImplementationOnce((sql, params, callback) => {
            callback(null,null); 
            return {} as Database;
        });
        try{
            await expect(cartDao.clearCart(mockUser)).rejects.toThrowError(CartNotFoundError);
        } finally{
            mockDBGet.mockRestore() ;
            mockDBRun.mockRestore();
        }
    });
});

describe("deleteAllCarts", () => {
    
    test("should delete all carts successfully", async () => {
        
        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
            callback(null,null); // Simula un errore nella cancellazione dei carrelli
            return {} as Database;
        });
        try {
            const result = await cartDao.deleteAllCarts();
            expect(result).toBe(true);
        } finally {
            mockDBRun.mockRestore();
        }
    });

    test("should return false and log error if db.run fails during products deletion", async () => {

        const mockDBRun = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
            callback(mockError,null); // Simula un errore nella cancellazione dei carrelli
            return {} as Database;
        });
        try {
            await expect(cartDao.deleteAllCarts()).rejects.toThrow(mockError);
        } finally {
            mockDBRun.mockRestore();
        }
    });

    test("should return false and log error if db.run fails during carts deletion", async () => {
        const mockDBRun1 = jest.spyOn(db, "run").mockImplementationOnce((sql, callback) => {
            callback(null,null); // Simula un errore nella cancellazione dei carrelli
            return {} as Database;
        });
        const mockDBRun2 = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
            callback(mockError,null); // Simula un errore nella cancellazione dei carrelli
            return {} as Database;
        });
        try {
            await expect(cartDao.deleteAllCarts()).rejects.toThrow(mockError);
        } finally {
            mockDBRun1.mockRestore();
            mockDBRun1.mockRestore();
        }
    });

    test("should throw an error- run3 fails", async () => {
        const mockDBRun1 = jest.spyOn(db, "run").mockImplementationOnce((sql, callback) => {
            callback(null,null); // Simula un errore nella cancellazione dei carrelli
            return {} as Database;
        }).mockImplementationOnce((sql, callback) => {
            callback(null,null); // Simula un errore nella cancellazione dei carrelli
            return {} as Database;
        }).mockImplementationOnce((sql, callback) => {
            callback(mockError,null); // Simula un errore nella cancellazione dei carrelli
            return {} as Database;
        });
        const mockDBRun2 = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
            callback(mockError,null); // Simula un errore nella cancellazione dei carrelli
            return {} as Database;
        });
        try {
            await expect(cartDao.deleteAllCarts()).rejects.toThrow(mockError);
        } finally {
            mockDBRun1.mockRestore();
            mockDBRun1.mockRestore();
        }
    });

    test("should throw an error- COMMIT fails", async () => {
        const mockDBRun1 = jest.spyOn(db, "run").mockImplementationOnce((sql, callback) => {
            callback(null,null); // Simula un errore nella cancellazione dei carrelli
            return {} as Database;
        }).mockImplementationOnce((sql, callback) => {
            callback(null,null); // Simula un errore nella cancellazione dei carrelli
            return {} as Database;
        }).mockImplementationOnce((sql, callback) => {
            callback(null,null); // Simula un errore nella cancellazione dei carrelli
            return {} as Database;
        });
        const mockDBRun2 = jest.spyOn(db, "run").mockImplementation((sql, callback) => {
            callback(mockError,null); // Simula un errore nella cancellazione dei carrelli
            return {} as Database;
        });
        try {
            await expect(cartDao.deleteAllCarts()).rejects.toThrow(mockError);
        } finally {
            mockDBRun1.mockRestore();
            mockDBRun1.mockRestore();
        }
    });
});

describe("getAllCarts", () => {

    

    test("should get all carts successfully", async () => {
        const mockCarts = [mockCart3,mockCart1]
        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, callback) => {
            callback(null,mockCarts); 
            return {} as Database;
        });
        jest.spyOn(CartDAO.prototype, "getProductsById").mockResolvedValueOnce(mockCart3.products).mockResolvedValueOnce(mockCart1.products);
        
        try{
            const result = await cartDao.getAllCarts();
            expect(result).toEqual(mockCarts);
        }finally {
            mockDBAll.mockRestore();
        }
    });

    test("should return an empty array if no carts found", async () => {
        const emptyMockCarts: Cart[] = [];
        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, callback) => {
            callback(null, emptyMockCarts); // Simula il ritorno dei dati dal database
            return {} as Database;
        });
        try{
            const result = await cartDao.getAllCarts();
            expect(result).toEqual(emptyMockCarts);
        }finally{
            mockDBAll.mockRestore();
        }
        });
    test("should throw an error if db.all fails", async () => {
        const mockDBAll = jest.spyOn(db, "all").mockImplementation((sql, callback) => {
            callback(mockError); // Simula un errore
            return {} as Database;
        });
        try{
            await expect(cartDao.getAllCarts()).rejects.toThrowError(mockError);
        }finally{
            mockDBAll.mockRestore();
        }

    });
});
});