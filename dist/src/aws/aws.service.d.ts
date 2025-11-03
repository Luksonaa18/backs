import { Readable } from 'stream';
export declare class AwsService {
    private s3;
    private bucketName;
    constructor();
    uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
    getFileStream(key: string): Promise<Readable>;
}
