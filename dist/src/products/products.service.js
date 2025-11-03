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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const products_schema_1 = require("./schema/products.schema");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(dto) {
        const product = new this.productModel(dto);
        return product.save();
    }
    escapeRegex(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    async findAll(query = {}) {
        const filter = {};
        if (query.search) {
            const escaped = this.escapeRegex(query.search); // ✅ fixed: use this.escapeRegex
            filter.$or = [
                { name: { $regex: escaped, $options: 'i' } },
                { description: { $regex: escaped, $options: 'i' } },
            ];
        }
        if (query.minPrice)
            filter.price = { ...filter.price, $gte: Number(query.minPrice) };
        if (query.maxPrice)
            filter.price = { ...filter.price, $lte: Number(query.maxPrice) };
        if (query.category)
            filter.category = query.category;
        return this.productModel.find(filter).exec();
    }
    async findOne(id) {
        const product = await this.productModel.findById(id).exec();
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async update(id, dto) {
        const updated = await this.productModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!updated)
            throw new common_1.NotFoundException('Product not found');
        return updated;
    }
    async remove(id) {
        const deleted = await this.productModel.findByIdAndDelete(id).exec();
        if (!deleted)
            throw new common_1.NotFoundException('Product not found');
        return deleted;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map