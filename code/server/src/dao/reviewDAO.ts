import db from "../db/db";
import { ProductReview } from "../components/review";
import { User } from "../components/user"
import { ExistingReviewError, NoReviewProductError, NoProductError} from "../errors/reviewError";
import { ProductNotFoundError} from "../errors/productError";
import dayjs from "dayjs";

/**
 * A class that implements the interaction with the database for all review-related operations.
 * You are free to implement any method you need here, as long as the requirements are satisfied.
 */
class ReviewDAO {

    /**
     * Adds a new review to a product.
     * @param model The model of the product being reviewed.
     * @param user The username of the user who wrote the review.
     * @param score The score given in the review.
     * @param date The date in which the product was reviewed.
     * @param comment The comment of the review.
     * @returns A Promise that resolves to nothing.
     */
    async addReview(model: string, user: User, score: number, comment: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const checkProductSql = "SELECT * FROM products WHERE model = ?";
            db.get(checkProductSql, [model], (err: Error | null, row: any) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    reject(new NoReviewProductError());
                } else {
                    const sql = "INSERT INTO reviews (model, user, score, date, comment) VALUES (?, ?, ?, ?, ?)";
                    const date = dayjs().format("YYYY-MM-DD");
                    db.run(sql, [model, user.username, score, date, comment], (err: Error | null) => {
                        if (err) {
                            if (err.message.includes("UNIQUE constraint failed")) {
                                reject(new ExistingReviewError());
                            } else {
                                reject(err);
                            }
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }

    /**
     * Retrieves all reviews for a given product model.
     * @param model The model of the product whose reviews are to be retrieved.
     * @returns A Promise that resolves to an array of ProductReview objects.
     */
    async getProductReviews(model: string): Promise<ProductReview[]> {
        return new Promise<ProductReview[]>((resolve, reject) => {
            const checkProductSql = "SELECT * FROM products WHERE model = ?";
            db.get(checkProductSql, [model], (err: Error | null, row: any) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    reject(new NoProductError());
                } else {
                    const sql = "SELECT * FROM reviews WHERE model = ?";
                    db.all(sql, [model], (err: Error | null, rows: any[]) => {
                        if (err) {
                            reject(err);
                        } else {
                            const reviews = rows.map(row => new ProductReview(row.model, row.user, row.score, row.date, row.comment));
                            resolve(reviews);
                        }
                    });
                }
            });
        });
    }

    /**
     * Deletes a specific review of a product.
     * @param model The model of the product whose review is to be deleted.
     * @param user The username of the user who wrote the review.
     * @returns A Promise that resolves to nothing.
     */
    async deleteProductReview(model: string, user: User): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const checkProductSql = "SELECT * FROM products WHERE model = ?";
            db.get(checkProductSql, [model], (err: Error | null, row: any) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    reject(new ProductNotFoundError());
                } else {
                    const checkReviewSql = "SELECT * FROM reviews WHERE model = ? AND user = ?";
                    db.get(checkReviewSql, [model, user.username], (err: Error | null, row: any) => {
                        if (err) {
                            reject(err);
                        } else if (!row) {
                            reject(new NoReviewProductError());
                        } else {
                            const sql = "DELETE FROM reviews WHERE model = ? AND user = ?";
                            db.run(sql, [model, user.username], (err: Error | null) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            });
                        }
                    })
                }
            })
        });
    }

    /**
     * Deletes all reviews of a specific product.
     * @param model The model of the product whose reviews are to be deleted.
     * @returns A Promise that resolves to nothing.
     */
    async deleteReviewsOfProduct(model: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const sql2 = "SELECT * FROM products WHERE model = ?";
            db.get(sql2, [model], (err: Error | null, row: any) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    reject(new ProductNotFoundError());
                } else {
                    const sql = "DELETE FROM reviews WHERE model = ?";
                    db.run(sql, [model], (err: Error | null) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }

    /**
     * Deletes all reviews in the database.
     * @returns A Promise that resolves to nothing.
     */
    async deleteAllReviews(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const sql = "DELETE FROM reviews";
            db.run(sql, [], (err: Error | null) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export default ReviewDAO;
