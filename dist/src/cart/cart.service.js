"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_schema_1 = require("./schema/cart.schema");
const products_schema_1 = require("../products/schema/products.schema");
let CartService = class CartService {
    constructor(cartModel, productModel) {
        this.cartModel = cartModel;
        this.productModel = productModel;
    }
    async getCart(userId) {
        let cart = await this.cartModel
            .findOne({ user: userId })
            .populate('items.product');
        if (!cart) {
            cart = await this.cartModel.create({
                user: new mongoose_2.Types.ObjectId(userId),
                items: [],
            });
            await cart.populate('items.product');
        }
        return cart;
    }
    async addToCart(userId, productId, quantity = 1) {
        const product = await this.productModel.findById(productId);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        let cart = await this.cartModel.findOne({ user: userId });
        if (!cart) {
            cart = await this.cartModel.create({
                user: new mongoose_2.Types.ObjectId(userId),
                items: [],
            });
        }
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        }
        else {
            cart.items.push({
                product: new mongoose_2.Types.ObjectId(product._id),
                quantity,
            });
        }
        await cart.save();
        await cart.populate('items.product');
        return cart;
    }
    async removeFromCart(userId, productId) {
        const cart = await this.cartModel.findOne({ user: userId });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found');
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        await cart.save();
        await cart.populate('items.product');
        return cart;
    }
    async clearCart(userId) {
        const cart = await this.cartModel.findOne({ user: userId });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found');
        cart.items = [];
        await cart.save();
        await cart.populate('items.product');
        return cart;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __param(1, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map