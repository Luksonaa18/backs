import { CartService } from './cart.service';
import { Request } from 'express';
interface JwtRequest extends Request {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: JwtRequest): Promise<import("./schema/cart.schema").Cart>;
    addToCart(req: JwtRequest, body: {
        productId: string;
        quantity?: number;
    }): Promise<import("./schema/cart.schema").Cart>;
    removeFromCart(req: JwtRequest, productId: string): Promise<import("./schema/cart.schema").Cart>;
    clearCart(req: JwtRequest): Promise<import("./schema/cart.schema").Cart>;
}
export {};
