import { AwsService } from './aws.service';
export declare class AwsController {
    private readonly awsService;
    constructor(awsService: AwsService);
    upload(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
