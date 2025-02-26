import { describe, afterEach, test, expect, jest } from "@jest/globals";
import { User, Role } from "../../src/components/user";
import { UnauthorizedUserError, UserNotFoundError, UserIsAdminError, UserNotAdminError } from "../../src/errors/userError";
import { DateError } from "../../src/utilities";
import ReviewController from "../../src/controllers/reviewController";
import ReviewDAO from "../../src/dao/reviewDAO";
import UserDAO from "../../src/dao/userDAO";
import { ProductReview } from "../../src/components/review";
import { NoReviewProductError, ExistingReviewError,NoProductError } from "../../src/errors/reviewError";
import { mock } from "node:test";



jest.mock("../../src/dao/reviewDAO");

describe("ReviewController", () => {
    const reviewController = new ReviewController();
    const userDAO = new UserDAO();

        const mockUser = new User("mockUser", "Nome", "Cognome", Role.CUSTOMER, "address", "1999-01-01");
        const mockUser2 = new User("mockUser2", "Nome 2", "Cognome 2", Role.CUSTOMER, "address 2", "2000-01-01");
        const mockUser3 = new User("mockUser3", "Nome 3", "Cognome 3", Role.CUSTOMER, "address 3", "2001-01-01");

        const mockReview = new ProductReview("iPhone 12", mockUser.username, 5, "2000-01-01", "grande Prodotto");
        const mockReview2 = new ProductReview("iPhone 12", mockUser2.username, 5, "2000-01-01", "grande Prodotto");
        const mockReview3 = new ProductReview("iPhone 12", mockUser3.username, 5, "2000-01-01", "grande Prodotto");
        const mockReview4 = new ProductReview("iPhone 13", mockUser3.username, 5, "2000-01-01", "grande Prodotto");

        const mockError = new Error("Test error");

        afterEach(() => {
            jest.clearAllMocks();
            jest.resetAllMocks();
        })

        /* @Test Suite 1 - addReview
    *   Test Case 1: controllo che le recensioni vengano aggiunte
        Test Case 2: controllo che ogni utente possa mettere solo una recensione a prodotto 
    */ 
    describe("addReview", () => {
        
        test("should return void", async () => {
            const response = await reviewController.addReview(
                mockReview.model,
                mockUser,
                mockReview.score,
                mockReview.comment
            );

            expect(ReviewDAO.prototype.addReview).toHaveBeenCalledTimes(1);
            expect(ReviewDAO.prototype.addReview).toHaveBeenCalledWith(
                mockReview.model,
                mockUser,
                mockReview.score,
                mockReview.comment
            );
            expect(response).toBeUndefined();
        });

        test("should return ExistingReviewError", async () => {
            jest.spyOn(ReviewDAO.prototype, "addReview")
                .mockRejectedValueOnce(new ExistingReviewError());
        
            let errorCaught = false;
        
            try {
                await reviewController.addReview(
                    mockReview.model,
                    mockUser,
                    mockReview.score,
                    mockReview.comment
                );
            } catch (error) {
                expect(error).toBeInstanceOf(ExistingReviewError);
                errorCaught = true;
            }
        
            expect(errorCaught).toBe(true);
            expect(ReviewDAO.prototype.addReview).toHaveBeenCalledTimes(1);
        });

        test("should return an error", async () => {
            
            jest.spyOn(ReviewDAO.prototype, "addReview")
                .mockRejectedValueOnce(mockError);
        
            let errorCaught = false;
        
            try {
                await reviewController.addReview(
                    mockReview.model,
                    mockUser,
                    mockReview.score,
                    mockReview.comment
                );
            } catch (error) {
                expect(error).toEqual(mockError);
                errorCaught = true;
            }
        
            expect(errorCaught).toBe(true);
            expect(ReviewDAO.prototype.addReview).toHaveBeenCalledTimes(1);
        });

        });

        /* @Test Suite 1 - getProductReviews
    *   Test Case 1: controllo che le recensioni vengano aggiunte e ritornate nel numero corretto
        Test Case 2: controllo il reject se non esiste il prodotto
    */
        describe("getProductReviews", () => {
            test("should return the vector of reviews", async () => {

                jest.spyOn(ReviewDAO.prototype, "getProductReviews").mockResolvedValueOnce([mockReview, mockReview2, mockReview3]);  

                const response1 = await reviewController.addReview(
                    mockReview.model,
                    mockUser,
                    mockReview.score,
                    mockReview.comment
                );
                const response2 = await reviewController.addReview(
                    mockReview2.model,
                    mockUser2,
                    mockReview2.score,
                    mockReview2.comment
                );
                const response3 = await reviewController.addReview(
                    mockReview3.model,
                    mockUser3,
                    mockReview3.score,
                    mockReview3.comment
                );
    
                const response = await reviewController.getProductReviews(
                    mockReview.model
                );
    
                expect(ReviewDAO.prototype.addReview).toHaveBeenCalledTimes(3);
                expect(ReviewDAO.prototype.getProductReviews).toHaveBeenCalledTimes(1); 
                expect(response).toHaveLength(3);
                expect(response).toEqual([mockReview, mockReview2, mockReview3]);

                
                
        })

        test("Should reject with NoReviewProductError", async () => {
            jest.spyOn(ReviewDAO.prototype, "getProductReviews").mockRejectedValue(new NoProductError);
            let errorCaught = false;

            try{
                const result = await reviewController.getProductReviews("Non esiste");
            }catch(error){
                expect(error).toBeInstanceOf(NoProductError);
                errorCaught = true;
            }
        
            expect(errorCaught).toBe(true);
            expect(ReviewDAO.prototype.getProductReviews).toHaveBeenCalledTimes(1);
        })
    });


    describe("deleteReview", () => {

    /**
     * Test Suites 3
     * 1: Controllo che una review da un prodotto venga cancellata
     * 2: Controllo che tutte le review di un prodotto vengano cancellate 
     * 3: Controllo il ritorno di errore in caso ci fosse una cancellazione di una review che non esiste
     */
    test("should return the vector of reviews of length 2 due to a delete", async () => {

        jest.spyOn(ReviewDAO.prototype, "getProductReviews").mockResolvedValueOnce([mockReview, mockReview3]);  

        const response1 = await reviewController.addReview(
            mockReview.model,
            mockUser,
            mockReview.score,
            mockReview.comment
        );
        const response2 = await reviewController.addReview(
            mockReview2.model,
            mockUser2,
            mockReview2.score,
            mockReview2.comment
        );
        const response3 = await reviewController.addReview(
            mockReview3.model,
            mockUser3,
            mockReview3.score,
            mockReview3.comment
        );

        const deleting = await reviewController.deleteReview(mockReview.model, mockUser);
        const response = await reviewController.getProductReviews(
            mockReview.model
        );

        expect(ReviewDAO.prototype.addReview).toHaveBeenCalledTimes(3);
        expect(ReviewDAO.prototype.getProductReviews).toHaveBeenCalledTimes(1); 
        expect(ReviewDAO.prototype.deleteProductReview).toHaveBeenCalledTimes(1);

        expect(response).toHaveLength(2);
        expect(response).toEqual([mockReview, mockReview3]);
        
    })

    test("should delete all the reviews of a single product", async () => {

        jest.spyOn(ReviewDAO.prototype, "getProductReviews").mockResolvedValueOnce([]);  

        const response1 = await reviewController.addReview(
            mockReview.model,
            mockUser,
            mockReview.score,
            mockReview.comment
        );
        const response2 = await reviewController.addReview(
            mockReview2.model,
            mockUser2,
            mockReview2.score,
            mockReview2.comment
        );
        const response3 = await reviewController.addReview(
            mockReview3.model,
            mockUser3,
            mockReview3.score,
            mockReview3.comment
        );

        const deleting = await reviewController.deleteReviewsOfProduct(mockReview.model);
        const response = await reviewController.getProductReviews(
            mockReview.model
        );

        expect(ReviewDAO.prototype.addReview).toHaveBeenCalledTimes(3);
        expect(ReviewDAO.prototype.getProductReviews).toHaveBeenCalledTimes(1); 
        expect(ReviewDAO.prototype.deleteReviewsOfProduct).toHaveBeenCalledTimes(1);

        expect(response).toHaveLength(0);
        expect(response).toEqual([]);
        expect(deleting).toBeUndefined();
        
    })

    test("Should return an error", async () => {
        jest.spyOn(ReviewDAO.prototype, "deleteProductReview").mockRejectedValueOnce(new NoReviewProductError); 
        
        try{
            await reviewController.deleteReview("non esiste", mockUser);
        }catch(error){
            expect(error).toBeInstanceOf(NoReviewProductError);
        }
    });

    test("Should return an error", async () => {
        jest.spyOn(ReviewDAO.prototype, "deleteProductReview").mockRejectedValueOnce(mockError); 
        
        try{
            await reviewController.deleteReview("non esiste", mockUser);
        }catch(error){
            expect(error).toEqual(mockError);
        }
    });


    describe("deleteReviewsOfProduct", () => {
        
        test("should return void", async () => {
            const response = await reviewController.deleteReviewsOfProduct(
                mockReview.model
            );

            expect(ReviewDAO.prototype.deleteReviewsOfProduct).toHaveBeenCalledTimes(1);
            expect(ReviewDAO.prototype.deleteReviewsOfProduct).toHaveBeenCalledWith(
                mockReview.model
            );
            expect(response).toBeUndefined();
        });

        test("should throw an error", async () => {
            jest.spyOn(ReviewDAO.prototype, "deleteReviewsOfProduct")
                .mockRejectedValueOnce(mockError);
        
            let errorCaught = false;
        
            try {
                await reviewController.deleteReviewsOfProduct(
                    mockReview.model
                );
            } catch (error) {
                expect(error).toEqual(mockError);
                errorCaught = true;
            }
        
            expect(errorCaught).toBe(true);
            expect(ReviewDAO.prototype.deleteReviewsOfProduct).toHaveBeenCalledTimes(1);
        });


        });


    /**
     * Provo che la cancellazione di tutte le review funzioni
     */
    describe("deleteAllReviews", () => {
        test("should delete all reviews of all products", async () => {
            // Mocking the DAO methods
            jest.spyOn(ReviewDAO.prototype, "deleteAllReviews").mockResolvedValueOnce(undefined);
            jest.spyOn(ReviewDAO.prototype, "getProductReviews")
                .mockResolvedValueOnce([mockReview, mockReview2, mockReview3])
                .mockResolvedValueOnce([mockReview4])
                .mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    
            // Adding reviews
            await reviewController.addReview(mockReview.model, mockUser, mockReview.score, mockReview.comment);
            await reviewController.addReview(mockReview2.model, mockUser, mockReview2.score, mockReview2.comment);
            await reviewController.addReview(mockReview3.model, mockUser, mockReview3.score, mockReview3.comment);
            await reviewController.addReview(mockReview4.model, mockUser, mockReview4.score, mockReview4.comment);
    
            // Verifying the added reviews
            const response1 = await reviewController.getProductReviews(mockReview.model);
            const response2 = await reviewController.getProductReviews(mockReview4.model);
    
            expect(response1).toHaveLength(3);
            expect(response2).toHaveLength(1);
    
            // Deleting all reviews
            await reviewController.deleteAllReviews();
    
            // Verifying the deletion of reviews
            try {
                // Attempting to get reviews after deletion
                const responseAfterDeletion1 = await reviewController.getProductReviews(mockReview.model);
                expect(responseAfterDeletion1).toHaveLength(0);
            } catch (error) {
                // Checking if the error is of type NoProductError
                expect(error).toBeInstanceOf(NoProductError);
            }
    
            try {
                // Attempting to get reviews after deletion
                const responseAfterDeletion2 = await reviewController.getProductReviews("non Esiste");
                expect(responseAfterDeletion2).toHaveLength(0);
            } catch (error) {
                // Checking if the error is of type NoProductError
                expect(error).toBeInstanceOf(NoProductError);
            }
          
    
            // Verifying the calls to DAO methods
            expect(ReviewDAO.prototype.addReview).toHaveBeenCalledTimes(4);
            expect(ReviewDAO.prototype.deleteAllReviews).toHaveBeenCalledTimes(1);
            expect(ReviewDAO.prototype.getProductReviews).toHaveBeenCalledTimes(4);
        });

        test("should throw an error", async () => {
            // Mocking the DAO methods
            jest.spyOn(ReviewDAO.prototype, "deleteAllReviews").mockRejectedValueOnce(mockError);
            jest.spyOn(ReviewDAO.prototype, "getProductReviews")
                .mockResolvedValueOnce([mockReview, mockReview2, mockReview3])
                .mockResolvedValueOnce([mockReview4])
                .mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    
            // Adding reviews
            await reviewController.addReview(mockReview.model, mockUser, mockReview.score, mockReview.comment);
            await reviewController.addReview(mockReview2.model, mockUser, mockReview2.score, mockReview2.comment);
            await reviewController.addReview(mockReview3.model, mockUser, mockReview3.score, mockReview3.comment);
            await reviewController.addReview(mockReview4.model, mockUser, mockReview4.score, mockReview4.comment);
    
            // Verifying the added reviews
            const response1 = await reviewController.getProductReviews(mockReview.model);
            const response2 = await reviewController.getProductReviews(mockReview4.model);
    
            expect(response1).toHaveLength(3);
            expect(response2).toHaveLength(1);
    
    
            
            try {
                await reviewController.deleteAllReviews();
            } catch (error) {
                // Checking if the error is of type NoProductError
                expect(error).toEqual(mockError);
            }
    
        });

    });

    })


});