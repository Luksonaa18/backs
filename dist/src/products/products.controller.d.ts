import { ProductsService } from './products.service';
import { Product } from './schema/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AwsService } from 'src/aws/aws.service';
export declare class ProductsController {
    private readonly productsService;
    private readonly awsService;
    constructor(productsService: ProductsService, awsService: AwsService);
    findAll(search?: string, minPrice?: string, maxPrice?: string, category?: string): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(files: Express.Multer.File[], body: CreateProductDto): Promise<Product>;
    update(id: string, files: Express.Multer.File[], body: UpdateProductDto): Promise<Product>;
    delete(id: string): Promise<Product>;
}
