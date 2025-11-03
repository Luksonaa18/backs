import { Model } from 'mongoose';
import { Cart, CartDocument } from './schema/cart.schema';
import { ProductDocument } from 'src/products/schema/products.schema';
export declare class CartService {
    private cartModel;
    private productModel;
    constructor(cartModel: Model<CartDocument>, productModel: Model<ProductDocument>);
    getCart(userId: string): Promise<Cart>;
    addToCart(userId: string, productId: string, quantity?: number): Promise<Cart>;
    removeFromCart(userId: string, productId: string): Promise<Cart>;
    clearCart(userId: string): Promise<Cart>;
}
