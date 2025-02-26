import { User } from "../components/user"
import { Cart, ProductInCart } from "../components/cart"
import { Category, Product } from "../components/product"
import db from "../db/db"
import { error } from "console";
import ProductDAO from "./productDAO";
import { CartNotFoundError, EmptyCartError, ProductNotInCartError} from "../errors/cartError";
import { ProductNotFoundError, LowProductStockError, EmptyProductStockError } from "../errors/productError";
import { resolve } from "path";


/**
 * A class that implements the interaction with the database for all cart-related operations.
 * You are free to implement any method you need here, as long as the requirements are satisfied.
 */
class CartDAO {

    async getCartId(user: User): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const sql = 'SELECT * FROM carts WHERE customer = ? AND paid = ?';
            db.get(sql, [user.username, false], async (err: Error | null, row: any) => {
                if (err) {
                    return reject(err);
                }
                if (!row) {
                    try {
                        await this.createCart(user);
                        const newCartId = await this.getCartId(user); // Chiamata ricorsiva per ottenere l'ID del nuovo carrello
                        return resolve(newCartId);
                    } catch (error) {
                        return reject(error);
                    }
                }
                return resolve(row.id);
            });
        });
    }

    getCartProducts(user: User): Promise<ProductInCart[]> {
        return new Promise<ProductInCart[]>((resolve, reject) => {
            this.getCartId(user)
                .then(cartId => {
                    const findCartSql = `
                        SELECT *
                        FROM productsInCart
                        WHERE id = ?
                    `;
                    db.all(findCartSql, [cartId], (err: Error, rows: any[]) => {
                        if (err) {
                            return reject(err);
                        }
    
                        if (!rows || rows.length === 0) {
                            resolve([]);
                        } else {
                            try {
                                const products = rows.map((row) => new ProductInCart(row.model, row.quantity, row.category, row.price));
                                resolve(products);
                            } catch (e) {
                                reject(new Error('Error processing products data'));
                            }
                        }
                    });
                })
                .catch(err => reject(err));
        });
    }

    createCart(user: User): Promise<Cart> {
        return new Promise<Cart>((resolve, reject) => {
            const insertCartSql = `
                INSERT INTO carts (customer, paid, paymentDate, total)
                VALUES (?, ?, ?, ?)
            `;
            const currentCart = {
                customer: user.username,
                paid: false,
                paymentDate: "",
                total: 0
            };
    
            // Uso di function() {} invece di arrow function per accedere a `this` all'interno del callback
            db.run(insertCartSql, [currentCart.customer, currentCart.paid, null, currentCart.total], function(err: Error | null) {
                if (err) {
                    return reject(err);
                }
    
                // this.lastID contiene l'id del carrello appena inserito
                const newCartId = this.lastID;
                const sql = "SELECT * FROM carts WHERE id = ?";
    
                db.get(sql, [newCartId], async (err: Error, row: any) => {
                    if (err) {
                        return reject(err);
                    }
                    try {
                        const cart = new Cart(row.customer, row.paid, row.paymentDate, row.total, []);
                        resolve(cart);
                    } catch (err) {
                        reject(err);
                    }
                });
            });
        });
    }

    getCart(user: User): Promise<Cart> {
        return new Promise<Cart>((resolve, reject) => {
            try {
                const sql = "SELECT * FROM carts WHERE customer = ? AND paid = ?"
                db.get(sql, [user.username, false], async (err: Error, row: any) => {
                    if (err){ reject(err);}
                    else if (!row){
                        try {
                            const newCart = new Cart(user.username, false, null, 0, []);
                            resolve(newCart);
                        } catch (err) {
                            reject(err);
                        }
                             }
                    else {
                        const cart = new Cart (row.customer, row.paid, row.paymentDate, row.total, await this.getCartProducts(user));
                        resolve(cart);
                    }
                    
                })
            } catch (err) {
                reject(err);
            }
        });
    }

    /**Funzione che serve per aggiungere in un carrello un prodotto che in esso non è già presente, quindi impostando la sua
     * quantità a 1 e aggiorna il totale del carrello
     * @params user id = id del carrello a cui aggiungere user = utente model = prodotto da aggiungere
     * @returns una promise che indica se l'aggiunta è andata a buon fine 
    */ 
    async addProductCart(id: number, user: User, model: string): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            Promise.all([this.takeCategory(model), this.takePrice(model)])
                .then(async ([category, price]) => {
                    const sql = 'INSERT INTO productsInCart (id, customer, model, price, category, quantity) VALUES (?, ?, ?, ?, ?, ?)';
                    const sqlCart = 'UPDATE carts SET total = total + ? WHERE id = ?';
                    
                    
                    // Esegui l'inserimento del prodotto nel carrello
                    db.run(sql, [id, user.username, model, price, category, 1], function (err: Error | null) {
                        if (err) {
                            reject(err); 
                        } else {
                            
                            // Esegui l'aggiornamento del totale del carrello
                            db.run(sqlCart, [price, id],(err: Error | null) => {
                                if (err) {
                                    console.error("Error updating cart total: ", err);
                                    reject(err);
                                } else {
                                    resolve(true);
                                }
                            });
                        }
                    });
                })
                .catch(error => {
                    reject(error); // Reject se una qualsiasi promise fallisce
                });
        });
    }


    /**Funzione direttamente chiamata dal DAO, se lo user non ha un carrello ne crea uno, se il prodotto da
     * aggiungere non esiste o ha disponibilità < 1 ritorna con errore
     * @params user = utente a cui aggiungere il prodotto nel carrello corrente product = prodotto da aggiungere
     * @returns una promise true se è stato aggiunto correttamente se no lancia un errore
    */ 
    async addToCart(user: User, product: string): Promise<boolean> {
        try {
            // Ottieni l'id del carrello dell'utente
            const cartId = await this.getCartId(user);
            //Ottengo la disponibilità attuale del prodotto nel magazzino 
            const prQuantity = await this.takeQuantity(product);

            if(prQuantity < 1){
                throw (new EmptyProductStockError())
            }
            
            // Controlla se il prodotto è già presente nel carrello
            const sql = 'SELECT COUNT(*) AS count FROM productsInCart WHERE id = ? AND model = ?';
            const params = [cartId, product];
    
            return new Promise<boolean>((resolve, reject) => {

                //se la quantità è minore di 1 lancio un errore poichè sto cercando di aggiungere qualcosa non presente in negozio 
                


                db.get(sql, params, async (err: Error | null, row: any) => {
                    if (err) {
                        console.error("Error checking product in cart:", err);
                        reject(err);
                        return;
                    }
                    if (row.count > 0) {
                        // Se il prodotto esiste già nel carrello, chiama la funzione per cambiare la quantità
                        await this.changeQuantityOnCarts(cartId, product);
                    } else {
                        // Se il prodotto non esiste nel carrello, chiama la funzione per aggiungerlo
                        await this.addProductCart(cartId, user, product);
                    }
                    resolve(true); // Operazione completata con successo
                });
            });
        } catch (error) {
            // Gestione degli errori
            console.error("Error adding product to cart:", error);
            throw error;
        }
    }
    

    async takePrice(model: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const sql = 'SELECT * FROM products WHERE model = ?';
            db.get(sql, [model], (err: Error | null, row: any) => {
                if (err) {
                    return reject(err);
                }
                // Verifica se 'row' è definito e ha la proprietà 'sellingPrice'
                if (row && row.sellingPrice !== undefined) {
                    resolve(row.sellingPrice);
                } else {
                    reject(new Error(`Product with model '${model}' not found or price not available`));
                }
            });
        });
    }

    async takeCategory(model: string): Promise<Category> {
        return new Promise<Category>((resolve, reject) => {
            const sql = 'SELECT * FROM products WHERE model = ?';
            db.get(sql, [model], (err: Error | null, row: any) => {
                if (err) {
                    return reject(err);
                }
                // Verifica se 'row' è definito e ha la proprietà 'sellingPrice'
                if (row && row.category !== undefined) {
                    resolve(row.category);
                } else {
                    reject(new Error(`Product with model '${model}' not found or category not available`));
                }
            });
        });
    }

    async takeQuantity(model: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const sql = 'SELECT * FROM products WHERE model = ?';
            db.get(sql, [model], (err: Error | null, row: any) => {
                if (err) {
                    return reject(err);
                }
                // Verifica se 'row' è definito e ha la proprietà 'quantity'
                if (row && row.quantity !== undefined) {
                    resolve(row.quantity);
                } else {
                    reject(new Error(`Product with model '${model}' not found or quantity not available`));
                }
            });
        });
    }


    /**Funzione che incrementa la quantità di un prodotto nel carrello di un customer e ne aggiorna il totale
     * @params cartId = Id del carrello a cui si vuole aggiungere un prodotto product = prodotto che si vuole aggiungere
     * @returns una promise che indica solamente se è andata a buon fine la transazione oppure lancia un errore
    */
    async changeQuantityOnCarts(cartId: number, product: string): Promise<void> {
        try {
            // Query per aumentare la quantità del prodotto nel carrello
            const sql = 'UPDATE productsInCart SET quantity = quantity + 1 WHERE id = ? AND model = ?';
            const params = [cartId, product];
    
            // Ottieni il costo del prodotto
            const price = await this.takePrice(product);
    
            // Esegui la query per aumentare la quantità del prodotto nel carrello
            await new Promise<void>((resolve, reject) => {
                db.run(sql, params, async (err: Error | null) => {
                    if (err) {
                        console.error("Error changing quantity:", err);
                        reject(err);
                        return;
                    }
    
                    // Esegui la query per aggiornare il totale del carrello
                    const sqlCart = 'UPDATE carts SET total = total + ? WHERE id = ?';
                    const cartParams = [price, cartId];
                    db.run(sqlCart, cartParams, (err: Error | null) => {
                        if (err) {
                            console.error("Error updating cart total:", err);
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                });
            });
        } catch (error) {
            // Gestione degli errori
            console.error("Error changing quantity and updating cart total:", error);
            throw error;
        }
    }
    
    getProduct(model: string): Promise<Product>{
        return new Promise<Product> ((resolve,reject) => {
            const sql = 'SELECT * FROM products WHERE model = ? ';

            db.get(sql, model, (err:Error, row:any) => {
                if(err) reject(err);
                if(!row)
                    reject(new ProductNotFoundError());
                else
                    resolve( new Product(row.sellingPrice, row.model, row.category, row.arrivalDate, row.details, row.quantity));
            });

        });
    }

    /**
     * Funzione che esegue il checkout del carrello di un utente, fallisce se il carrello è vuoto o uno dei prodotti
     * non esiste o non ha abbastanza quantità disponibile per per accontentare l'ordine 
     * @param user = utente a cui effettuare il chekout del carrello
     * @returns una promise che indica che la transazione è andata a buon fine 
     */

    async checkoutCart(user: User): Promise<boolean> {
        let transactionStarted = false;
    
        try {
            const cart = await new Promise<any>((resolve, reject) => {
                const sql = 'SELECT * FROM carts WHERE customer = ? AND paid = ?';
                db.get(sql, [user.username, false], (err: Error | null, row: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!row) {
                        return reject(new CartNotFoundError());
                    }
                    resolve(row);
                });
            });
    
            const cartId = cart.id;
            const cartItems = await this.getCartProducts(user);
    
            if (cartItems.length < 1) {
                throw new EmptyCartError();
            }
    
            for (const item of cartItems) {
                const product = await this.getProduct(item.model);
                if (product.quantity < item.quantity) {
                    throw new LowProductStockError();
                }
            }
    
            await new Promise<void>((resolve, reject) => {
                db.run('BEGIN TRANSACTION', (err: Error | null) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    transactionStarted = true; // La transazione è iniziata
                    resolve();
                });
            });
    
            for (const item of cartItems) {
                const updateProductSql = 'UPDATE products SET quantity = quantity - ? WHERE model = ?';
                const updateProductParams = [item.quantity, item.model];
                await new Promise<void>((resolve, reject) => {
                    db.run(updateProductSql, updateProductParams, (err: Error | null) => {
                        if (err) {
                            console.error("Error updating product quantity:", err);
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                });
            }
    
            const updateCartSql = 'UPDATE carts SET paid = ?, paymentDate = ? WHERE id = ?';
            const updateCartParams = [true, new Date().toISOString().split('T')[0], cartId];
            await new Promise<void>((resolve, reject) => {
                db.run(updateCartSql, updateCartParams, (err: Error | null) => {
                    if (err) {
                        console.error("Error updating cart:", err);
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
    
            await new Promise<void>((resolve, reject) => {
                db.run('COMMIT', (err: Error | null) => {
                    if (err) {
                        console.error("Error committing transaction:", err);
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
    
            return true;
        } catch (error) {
            if (transactionStarted) {
                await new Promise<void>((resolve, reject) => {
                    db.run('ROLLBACK', (err: Error | null) => {
                        if (err) {
                            console.error("Error rolling back transaction:", err);
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                });
            }
    
            console.error("Error checking out cart:", error);
            throw error;
        }
    }
    
    async getProductsById(cartId: number): Promise<ProductInCart[]> {
        const sql = 'SELECT * FROM productsInCart WHERE id = ?';
    
        return new Promise<ProductInCart[]>((resolve, reject) => {
            db.all(sql, [cartId], async (err: Error, rows: any[]) => {
                if (err) {
                    return reject(err);
                }
                if (!rows || rows.length === 0) {
                    return resolve([]);
                }
                try {
                    const products = rows.map(row => new ProductInCart(row.model, row.quantity, row.category, row.price));
                    resolve(products);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    /**
     * Funzione che ritorna tutti i carrelli passati di un utente a cui è stato fatto il checkout,
     * non tiene in considerazione quindi il carrello corrente
     * @param user = utente di cui mostrare i carrelli
     * @returns una promise che si risolve con un vettore di carrelli 
     */
    async getCustomerCarts(user: User): Promise<Cart[]> {
        const sql = 'SELECT * FROM carts WHERE customer = ? AND paid = ?';
    
        return new Promise<Cart[]>((resolve, reject) => {
            db.all(sql, [user.username, true], async (err: Error, rows: any[]) => {
                if (err) {
                    return reject(err);
                }
                if (!rows || rows.length === 0) {
                    return resolve([]);
                }
                try {
                    const promises = rows.map(async (row) => {
                        const products = await this.getProductsById(row.id);
                        return new Cart(row.customer, true, row.paymentDate, row.total, products);
                    });
    
                    const result = await Promise.all(promises);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }


    async removeProductFromCart(user: User, product: string): Promise<Boolean> {
        try {
            const cart = await new Promise<any>((resolve, reject) => {
                const sql = 'SELECT * FROM carts WHERE customer = ? AND paid = ?';
                db.get(sql, [user.username, false], (err: Error , row: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!row) {
                        return reject(new CartNotFoundError());
                    }
                    resolve(row);
                });
            });
            const cartId = cart.id;
    
            return new Promise<Boolean>((resolve, reject) => {
                // Verifica se il prodotto è presente nel carrello
                const checkProductSql = 'SELECT quantity FROM productsInCart WHERE id = ? AND model = ?';
                db.get(checkProductSql, [cartId, product], (err: Error | null, row: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!row) {
                        // Il prodotto non è presente nel carrello
                        return reject(new ProductNotInCartError());
                    }
    
                    const quantity = row.quantity;
    
                    if (quantity > 1) {
                        // Se la quantità è maggiore di 1, decrementa la quantità
                        const updateProductSql = 'UPDATE productsInCart SET quantity = quantity - 1 WHERE id = ? AND model = ?';
                        db.run(updateProductSql, [cartId, product], async (err: Error | null) => {
                            if (err) {
                                return reject(err);
                            }
                            
                            // Aggiorna il totale del carrello
                            try {
                                const price = await this.takePrice(product);
                                const updateCartSql = 'UPDATE carts SET total = total - ? WHERE id = ?';
                                db.run(updateCartSql, [price, cartId], (err: Error | null) => {
                                    if (err) {
                                        return reject(err);
                                    }
                                    resolve(true);
                                });
                            } catch (priceError) {
                                return reject(priceError);
                            }
                        });
                    } else {
                        // Se la quantità è 1, elimina la riga
                        const deleteProductSql = 'DELETE FROM productsInCart WHERE id = ? AND model = ?';
                        db.run(deleteProductSql, [cartId, product], async (err: Error | null) => {
                            if (err) {
                                return reject(err);
                            }
    
                            // Aggiorna il totale del carrello
                            try {
                                const price = await this.takePrice(product);
                                const updateCartSql = 'UPDATE carts SET total = total - ? WHERE id = ?';
                                db.run(updateCartSql, [price, cartId], (err: Error | null) => {
                                    if (err) {
                                        return reject(err);
                                    }
                                    resolve(true);
                                });
                            } catch (priceError) {
                                return reject(priceError);
                            }
                        });
                    }
                });
            });
        } catch (error) {
            console.error("Error removing product from cart:", error);
            throw error;
        }
    }

    async clearCart(user: User): Promise<Boolean> {
        try {
            const cart = await new Promise<any>((resolve, reject) => {
                const sql = 'SELECT * FROM carts WHERE customer = ? AND paid = ?';
                db.get(sql, [user.username, false], (err: Error , row: any) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!row) {
                        return reject(new CartNotFoundError());
                    }
                    resolve(row);
                });
            });
            const cartId = cart.id;
    
            await new Promise<void>((resolve, reject) => {
                const sqlDeleteProducts = 'DELETE FROM productsInCart WHERE id = ?';
                db.run(sqlDeleteProducts, [cartId], (err: Error | null) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
    
            await new Promise<void>((resolve, reject) => {
                const sqlUpdateCartTotal = 'DELETE FROM carts WHERE id = ?';
                db.run(sqlUpdateCartTotal, [cartId], (err: Error | null) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
    
            return true;
        } catch (error) {
            console.error("Error clearing cart:", error);
            throw error;
        }
    }

    
    
    async deleteAllCarts(): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            // Inizia una transazione per assicurarsi che entrambe le operazioni vengano eseguite insieme
            db.run('BEGIN TRANSACTION;', (beginErr: Error | null) => {
                if (beginErr) {
                    return reject(beginErr);
                }
    
                // Prima elimina tutte le righe dalla tabella productsInCart
                const sqlDeleteProducts = 'DELETE FROM productsInCart';
                db.run(sqlDeleteProducts, (deleteProductsErr: Error | null) => {
                    if (deleteProductsErr) {
                        db.run('ROLLBACK;', (rollbackErr: Error | null) => {
                            if (rollbackErr) {
                                console.error('Error during rollback:', rollbackErr);
                            }
                            return reject(deleteProductsErr);
                        });
                        return reject(deleteProductsErr);
                    }
    
                    // Poi elimina tutte le righe dalla tabella carts
                    const sqlDeleteCarts = 'DELETE FROM carts';
                    db.run(sqlDeleteCarts, (deleteCartsErr: Error | null) => {
                        if (deleteCartsErr) {
                            db.run('ROLLBACK;', (rollbackErr: Error | null) => {
                                if (rollbackErr) {
                                    console.error('Error during rollback:', rollbackErr);
                                }
                                return reject(deleteCartsErr);
                            });
                            return reject(deleteCartsErr);
                        }
    
                        // Commit della transazione se entrambe le operazioni sono andate a buon fine
                        db.run('COMMIT;', (commitErr: Error | null) => {
                            if (commitErr) {
                                return reject(commitErr);
                            }
                            resolve(true);
                        });
                    });
                });
            });
        });
    }


    async getAllCarts(): Promise<Cart[]> {
        const sql = 'SELECT * FROM carts';
        
        return new Promise<Cart[]>((resolve, reject) => {
            db.all(sql, async (err: Error, rows: any[]) => {
                if (err) {
                    return reject(err);
                }
                if (!rows || rows.length === 0) {
                    return resolve([]);
                }
                try {
                   
                    const promises = rows.map(async (row) => {
                        const products = await this.getProductsById(row.id);
                        return new Cart(row.customer, row.paid, row.paymentDate, row.total, products);
                    });
    
                    const result = await Promise.all(promises);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
}

export default CartDAO