import db from "../db/db"
import { Product } from "../components/product"
import crypto from "crypto"
import { User } from "../components/user"
import UserDAO from "../dao/userDAO" 
import { ProductNotFoundError, ProductAlreadyExistsError, ProductSoldError, EmptyProductStockError, LowProductStockError } from "../errors/productError"
import { DateError } from "../utilities"

/**
 * A class that implements the interaction with the database for all product-related operations.
 * You are free to implement any method you need here, as long as the requirements are satisfied.
 */
class ProductDAO {

    /** Returns the product with the specified model. */
    getProductbyModel(model: string): Promise<Product> {
        return new Promise<Product>((resolve, reject) => {
            try {
                const sql = "SELECT * FROM products WHERE model = ?"
                db.get(sql, [model], (err: Error | null, row: any) => {
                    if (err) reject(err)
                    else resolve(row)
                })
            } catch (error) {
                reject(error)
            }
        });
    }


    /**
     * Registers a new product in the database.
     * @param model The unique model of the product.
     * @param category The category of the product.
     * @param quantity The number of units of the new product.
     * @param details The optional details of the product.
     * @param sellingPrice The price at which one unit of the product is sold.
     * @param arrivalDate The optional date in which the product arrived.
     * @returns A Promise that resolves to nothing.
     */
    registerProducts(model: string, category: string, quantity: number, details: string | null, sellingPrice: number, arrivalDate: string | null): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.getProductbyModel(model).then((product) => {
                    if(product) {
                        reject(new ProductAlreadyExistsError())
                    }
                    else if(arrivalDate > new Date().toISOString().split('T')[0]) {
                        reject(new DateError());
                    }
                    else {
                        const sql = "INSERT INTO products(model, category, quantity, details, sellingPrice, arrivalDate) VALUES(?, ?, ?, ?, ?, ?)"
                        db.run(sql, [model, category, quantity, details, sellingPrice, arrivalDate], (err: Error | null) => {
                        if (err) reject(err);
                        resolve();
                        })
                    }
                }).catch((err) => {
                    reject(err);
                });
            });
    }


    /**
     * Increases the available quantity of a product.
     * @param model The model of the product to increase.
     * @param newQuantity The number of product units to add. This number must be added to the existing quantity, it is not a new total.
     * @param changeDate The optional date in which the change occurred.
     * @returns A Promise that resolves to the new available quantity of the product.
     */
    changeProductQuantity(model: string, newQuantity: number, changeDate: string | null): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.getProductbyModel(model).then((product) => {
                if(!product) {
                    reject(new ProductNotFoundError())
                }
                else if((changeDate < product.arrivalDate) || (changeDate > new Date().toISOString().split('T')[0])) {
                    reject(new DateError());
                }
                else {
                    const sql = "UPDATE products SET quantity = quantity + ? WHERE model = ?"
                    db.run(sql, [newQuantity, model], (err: Error | null) => {
                        if (err) reject(err)
                        resolve(product.quantity + newQuantity)
                    })
                }
            }).catch ((error) => {
                reject(error)
            });
        });
    }


    /**
     * Decreases the available quantity of a product.
     * @param model The model of the product to sell
     * @param quantity The number of product units that were sold.
     * @param sellingDate The optional date in which the sale occurred.
     * @returns A Promise that resolves to the new available quantity of the product.
     */

    sellProduct(model: string, quantity: number, sellingDate: string | null): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.getProductbyModel(model).then((product) => {
                if(!product) {
                    reject(new ProductNotFoundError())
                }
                else if((sellingDate < product.arrivalDate) || (sellingDate > new Date().toISOString().split('T')[0])) {
                    reject(new DateError());
                }
                else if(product.quantity === 0) { 
                    reject(new EmptyProductStockError());
                } 
                else if(product.quantity < quantity) {
                    reject(new LowProductStockError());
                }
                
                /*  invertito l'ordine per i test
                else if(product.quantity < quantity) {
                    reject(new LowProductStockError());
                }
                else if(product.quantity === 0) {
                    reject(new EmptyProductStockError());
                } */
               
                else {
                    const sql = "UPDATE products SET quantity = quantity - ? WHERE model = ?"
                    db.run(sql, [quantity, model], (err: Error | null) => {
                        if (err) reject(err)
                        resolve(product.quantity - quantity)
                    })
                }
            }).catch ((error) => {
                    reject(error)
            });
        })
    }
    
    
    /**
     * Returns all products in the database, with the option to filter them by category or model.
     * @param grouping An optional parameter. If present, it can be either "category" or "model".
     * @param category An optional parameter. It can only be present if grouping is equal to "category" (in which case it must be present) and, when present, it must be one of "Smartphone", "Laptop", "Appliance".
     * @param model An optional parameter. It can only be present if grouping is equal to "model" (in which case it must be present and not empty).
     * @returns A Promise that resolves to an array of Product objects.
     */
    getProducts(grouping: string | null, category: string | null, model: string | null): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            this.getProductbyModel(model).then((product) => {   
                if(!product && grouping === "model") {
                    reject(new ProductNotFoundError())
                } 
                else {
                    let sql = "SELECT * FROM products"
                    if (grouping === "category") {
                        sql += " WHERE category = ?"
                    } else if (grouping === "model") {
                        sql += " WHERE model = ?"
                    }
                    db.all(sql, [category || model], (err: Error | null, rows: any[]) => {
                        if (err) reject(err)
                        const products = rows.map((row) => new Product(row.sellingPrice, row.model, row.category, row.arrivalDate, row.details, row.quantity));
                        resolve(products)
                    })
                }
            }).catch ((error) => {
                reject(error)
            });
        });
    }


    /**
     * Returns all available products (with a quantity above 0) in the database, with the option to filter them by category or model.
     * @param grouping An optional parameter. If present, it can be either "category" or "model".
     * @param category An optional parameter. It can only be present if grouping is equal to "category" (in which case it must be present) and, when present, it must be one of "Smartphone", "Laptop", "Appliance".
     * @param model An optional parameter. It can only be present if grouping is equal to "model" (in which case it must be present and not empty).
     * @returns A Promise that resolves to an array of Product objects.
     */
    getAvailableProducts(grouping: string | null, category: string | null, model: string | null): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            this.getProductbyModel(model).then((product) => {
                if(!product && grouping === "model") {
                    reject(new ProductNotFoundError())
                }
                else {   
                    let sql = "SELECT * FROM products WHERE quantity > 0"
                    if (grouping === "category") {
                        sql += " AND category = ?"
                    } else if (grouping === "model") {
                        sql += " AND model = ?"
                    }
                    db.all(sql, [category || model], (err: Error | null, rows: any[]) => {
                        if (err) reject(err)
                        const products = rows.map((row) => new Product(row.sellingPrice, row.model, row.category, row.arrivalDate, row.details, row.quantity));
                        resolve(products)
                    })
                }
            }).catch ((error) => {
                    reject(error)
            });
        });
    }


    /**
     * Deletes all products.
     * @returns A Promise that resolves to `true` if all products have been successfully deleted.
     */

    deleteAllProducts(): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            try {
                const sql = "DELETE FROM products"
                db.run(sql, (err: Error | null) => {
                    if (err) reject(err)
                    resolve(true)
                })
            } catch (error) {
                reject(error)
            }
        });
    }

    /**
     * Deletes one product, identified by its model
     * @param model The model of the product to delete
     * @returns A Promise that resolves to `true` if the product has been successfully deleted.
     */

    deleteProduct(model: string): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            this.getProductbyModel(model).then((product) => {
                if(!product) {
                    reject(new ProductNotFoundError())
                }
                else {
                    const sql = "DELETE FROM products WHERE model = ?"
                    db.run(sql, [model], (err: Error | null) => {
                        if (err) reject(err)
                        resolve(true)
                    })
                }
            }). catch ((error) => {
                reject(error)
            });
        });
    }

    
}

export default ProductDAO