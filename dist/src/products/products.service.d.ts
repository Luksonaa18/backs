import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    create(dto: CreateProductDto): Promise<Product>;
    private escapeRegex;
    findAll(query?: any): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, dto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
}
