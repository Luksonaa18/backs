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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const resend_1 = require("resend");
let CheckoutService = class CheckoutService {
    constructor() {
        this.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
    }
    async sendOrderEmail(dto) {
        const { user, cartItems, total } = dto;
        if (!user?.email || !cartItems?.length) {
            throw new common_1.BadRequestException('Invalid data');
        }
        const itemsHTML = cartItems
            .map((item) => `
      <tr>
        <td style="padding:6px; border-bottom:1px solid #ccc;">${item.name}</td>
        <td style="text-align:center; border-bottom:1px solid #ccc;">${item.quantity}</td>
        <td style="text-align:right; border-bottom:1px solid #ccc;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `)
            .join('');
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; font-size: 14px;">
        <h2>Thank you for your order, ${user.name}!</h2>
        <p>Here is your order summary:</p>
        <table style="width:100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align:left; padding:6px; border-bottom:1px solid #ccc;">Product</th>
              <th style="text-align:center; padding:6px; border-bottom:1px solid #ccc;">Qty</th>
              <th style="text-align:right; padding:6px; border-bottom:1px solid #ccc;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>
        <p><strong>Total: $${total.toFixed(2)}</strong></p>
        <p>Order Time: ${new Date().toLocaleString()}</p>
      </div>
    `;
        try {
            await this.resend.emails.send({
                from: 'lukazhozhadze53@gmail.com',
                to: user.email,
                subject: 'Your Order Confirmation',
                html: htmlContent,
            });
            return { message: 'Email sent successfully' };
        }
        catch (err) {
            console.error('❌ Error sending email:', err);
            throw new common_1.InternalServerErrorException('Failed to send email');
        }
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map