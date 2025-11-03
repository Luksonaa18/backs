import { CreateCheckoutDto } from 'src/dto/create-checkout.dto';
export declare class CheckoutService {
    private resend;
    constructor();
    sendOrderEmail(dto: CreateCheckoutDto): Promise<{
        message: string;
    }>;
}
