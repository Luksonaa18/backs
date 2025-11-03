export declare class EmailService {
    private resend;
    sendOrderEmail(to: string, userName: string, cartItems: any[], total: number): Promise<void>;
}
