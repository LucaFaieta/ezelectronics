import { expect, jest, it, afterEach, describe } from "@jest/globals"
import CartController from "../../src/controllers/cartController"

import CartDAO from "../../src/dao/cartDAO"
import { User, Role } from "../../src/components/user"
import { Cart, ProductInCart } from "../../src/components/cart"
import { Product ,Category} from "../../src/components/product"
import {CartNotFoundError,ProductInCartError,ProductNotInCartError,WrongUserCartError,EmptyCartError} from "../../src/errors/cartError"


jest.mock("../../src/dao/cartDAO")

//Example of a unit test for the createUser method of the UserController
//The test checks if the method returns true when the DAO method returns true
//The test also expects the DAO method to be called once with the correct parameters

describe("CartController", () => {
    const cartController = new CartController();
    const mockUser = {
        username: "test",
        name: "test",
        surname: "test",
        password: "test",
        role: "Manager",
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

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    })
    
    describe("addToCart", () => {
        it("should return true", async () => {
            jest.spyOn(CartDAO.prototype, "addToCart").mockResolvedValueOnce(true);

            const response = await cartController.addToCart(
                mockUser2,
                mockProduct5.model
                );
            expect(CartDAO.prototype.addToCart).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.addToCart).toHaveBeenCalledWith(
                mockUser2,
                mockProduct5.model);
            expect(response).toBe(true);
        })
    });

    describe("getCart", () => {
        it("should return the cart", async () => {
            jest.spyOn(CartDAO.prototype, "getCart").mockResolvedValueOnce(mockCart2);

            const response = await cartController.getCart(mockUser2);

            expect(CartDAO.prototype.getCart).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.getCart).toHaveBeenCalledWith(mockUser2);
            expect(response).toEqual(mockCart2); 
        });

        it("should return an empty cart", async () => {
            jest.spyOn(CartDAO.prototype, "getCart").mockResolvedValueOnce(mockCart5);

            const response = await cartController.getCart(mockUser4);

            expect(CartDAO.prototype.getCart).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.getCart).toHaveBeenCalledWith(mockUser4);
            expect(response.products.length).toBe(0); 
        }); 


        

    });

    describe("checkoutCart", () => {
        it("should return true", async () => {
            jest.spyOn(CartDAO.prototype, "checkoutCart").mockResolvedValueOnce(true);

            const response = await cartController.checkoutCart(mockUser2);

            expect(CartDAO.prototype.checkoutCart).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.checkoutCart).toHaveBeenCalledWith(mockUser2);
            expect(response).toBe(true);
        });

        
        it("should return an EmptyCartError", async () => {
            jest.spyOn(CartDAO.prototype, "checkoutCart").mockRejectedValueOnce(new EmptyCartError());
            try{
                 await cartController.checkoutCart(mockUser4);
                
            }
            
            catch(error){
                expect(error).toBeInstanceOf(EmptyCartError);
                
            }
            expect(CartDAO.prototype.checkoutCart).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.checkoutCart).toHaveBeenCalledWith(mockUser4);
        });
    });

    describe("getCustomerCarts", () => {
        it("should return the list of paid carts", async () => {
            jest.spyOn(CartDAO.prototype, "getCustomerCarts").mockResolvedValueOnce([mockCart3]);
            
            const response = await cartController.getCustomerCarts(mockUser2);
            
            expect(CartDAO.prototype.getCustomerCarts).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.getCustomerCarts).toHaveBeenCalledWith(mockUser2);
            expect(response).toStrictEqual([mockCart3]); 
        });

        it("should return an empty list", async () => {
            jest.spyOn(CartDAO.prototype, "getCustomerCarts").mockResolvedValueOnce([]);
            
            const response = await cartController.getCustomerCarts(mockUser4);
            
            expect(CartDAO.prototype.getCustomerCarts).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.getCustomerCarts).toHaveBeenCalledWith(mockUser4);
            expect(response.length).toBe(0); 
    });});



    describe("removeProductFromCart", () => {
        it("should return true and delete the product from the list", async () => {
            jest.spyOn(CartDAO.prototype, "removeProductFromCart").mockResolvedValueOnce(true);

            const response = await cartController.removeProductFromCart(mockUser2,mockProduct1.model);

            expect(CartDAO.prototype.removeProductFromCart).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.removeProductFromCart).toHaveBeenCalledWith(mockUser2,mockProduct1.model);
            expect(response).toBe(true);
        });

        it("should return true and decrease the quantity", async () => {
            jest.spyOn(CartDAO.prototype, "removeProductFromCart").mockResolvedValueOnce(true);

            const response = await cartController.removeProductFromCart(mockUser2,mockProduct1.model);

            expect(CartDAO.prototype.removeProductFromCart).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.removeProductFromCart).toHaveBeenCalledWith(mockUser2,mockProduct1.model);
            expect(response).toBe(true);
        });

        it("should return ProductNotInCartError", async () => {
            jest.spyOn(CartDAO.prototype, "removeProductFromCart").mockRejectedValueOnce(new ProductNotInCartError())
            try {
                
                await cartController.removeProductFromCart(mockUser2,mockProduct5.model);
                
            }
            
            catch(error){
                expect(error).toBeInstanceOf(ProductNotInCartError);
               
            }
            expect(CartDAO.prototype.removeProductFromCart).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.removeProductFromCart).toHaveBeenCalledWith(mockUser2,mockProduct5.model);
        });

        it("should return EmptyCartError ", async () => {
            jest.spyOn(CartDAO.prototype, "removeProductFromCart").mockRejectedValueOnce(new EmptyCartError())
            try {
                
                await cartController.removeProductFromCart(mockUser4,mockProduct5.model);
            }
            
            catch(error){
                expect(error).toBeInstanceOf(EmptyCartError);
               
            }
            expect(CartDAO.prototype.removeProductFromCart).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.removeProductFromCart).toHaveBeenCalledWith(mockUser4,mockProduct5.model);
           
        });

        
            

    });

    describe("clearCart", () => {
        it("should return true and have zero products", async () => {
            jest.spyOn(CartDAO.prototype, "clearCart").mockResolvedValueOnce(true);
            jest.spyOn(CartDAO.prototype, "getCart").mockResolvedValueOnce(mockCart5);
            const response = await cartController.clearCart(mockUser2);

            expect(CartDAO.prototype.clearCart).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.clearCart).toHaveBeenCalledWith(mockUser2);
            expect(response).toBe(true); 
        });

        describe("CartController - clearCart", () => {
            it("should return the CartNotFoundError", async () => {
                jest.spyOn(CartDAO.prototype, "clearCart").mockRejectedValueOnce(new CartNotFoundError());
        
                try {
                    await cartController.clearCart(mockUser4);
                    // Se arriva qui, il test fallisce perché non è stata lanciata nessuna eccezione
                } catch (error) {
                    expect(error).toBeInstanceOf(CartNotFoundError);
                }
        
                expect(CartDAO.prototype.clearCart).toHaveBeenCalledTimes(1);
                expect(CartDAO.prototype.clearCart).toHaveBeenCalledWith(mockUser4);
            });
        });

    });



    describe("getAllCarts", () => {
        it("should return true", async () => {
            jest.spyOn(CartDAO.prototype, "getAllCarts").mockResolvedValueOnce([mockCart1,mockCart2,mockCart3,mockCart4,mockCart5]);

            const response = await cartController.getAllCarts();

            expect(CartDAO.prototype.getAllCarts).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.getAllCarts).toHaveBeenCalledWith();
            expect(response).toEqual([mockCart1,mockCart2,mockCart3,mockCart4,mockCart5]); 
        });
    });

    describe("deleteAllCarts", () => {
        it("should return true", async () => {
            jest.spyOn(CartDAO.prototype, "deleteAllCarts").mockResolvedValueOnce(true);

            const response = await cartController.deleteAllCarts();

            expect(CartDAO.prototype.deleteAllCarts).toHaveBeenCalledTimes(1);
            expect(CartDAO.prototype.deleteAllCarts).toHaveBeenCalledWith();
            expect(response).toBe(true); 
        });
    });



    

   
});