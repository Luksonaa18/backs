import { EmailService } from '../email/email.service';
export declare class CheckoutController {
    private readonly emailService;
    constructor(emailService: EmailService);
    checkout(body: any): Promise<{
        error: string;
        message?: undefined;
    } | {
        message: string;
        error?: undefined;
    }>;
}
