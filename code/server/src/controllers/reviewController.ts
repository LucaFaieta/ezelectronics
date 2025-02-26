import { User } from "../components/user";
import ReviewDAO from "../dao/reviewDAO";
import { ProductReview } from "../components/review";
import { ExistingReviewError, NoReviewProductError } from "../errors/reviewError";

class ReviewController {
    private dao: ReviewDAO

    constructor() {
        this.dao = new ReviewDAO();
    }

    /**
     * Adds a new review for a product
     * @param model The model of the product to review
     * @param user The username of the user who made the review
     * @param score The score assigned to the product, in the range [1, 5]
     * @param comment The comment made by the user
     * @returns A Promise that resolves to nothing
     */
    async addReview(model: string, user: User, score: number, comment: string): Promise<void> {
        try {
            await this.dao.addReview(model, user, score, comment);
        } catch (error) {
            if (error instanceof ExistingReviewError) {
                throw new ExistingReviewError();
            } else {
                throw error;
            }
        }
    }

    /**
     * Returns all reviews for a product
     * @param model The model of the product to get reviews from
     * @returns A Promise that resolves to an array of ProductReview objects
     */
    async getProductReviews(model: string): Promise<ProductReview[]> {
        try {
            return await this.dao.getProductReviews(model);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes the review made by a user for a product
     * @param model The model of the product to delete the review from
     * @param user The user who made the review to delete
     * @returns A Promise that resolves to nothing
     */
    async deleteReview(model: string, user: User): Promise<void> {
        try {
            await this.dao.deleteProductReview(model, user);
        } catch (error) {
            if (error instanceof NoReviewProductError) {
                throw new NoReviewProductError();
            } else {
                throw error;
            }
        }
    }

    /**
     * Deletes all reviews for a product
     * @param model The model of the product to delete the reviews from
     * @returns A Promise that resolves to nothing
     */
    async deleteReviewsOfProduct(model: string): Promise<void> {
        try {
            await this.dao.deleteReviewsOfProduct(model);
        } catch (error) {
            throw error;
        }
    }


    /**
     * Deletes all reviews of all products
     * @returns A Promise that resolves to nothing
     */
    async deleteAllReviews(): Promise<void> {
        try {
            await this.dao.deleteAllReviews();
        } catch (error) {
            throw error;
        }
    }
}

export default ReviewController;
