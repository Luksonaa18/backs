"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const resend_1 = require("resend");
let EmailService = class EmailService {
    constructor() {
        this.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
    }
    async sendOrderEmail(to, userName, cartItems, total) {
        const itemsHTML = cartItems
            .map((item) => `
        <tr>
          <td style="padding:8px;">${item.name}</td>
          <td style="text-align:center;">${item.quantity}</td>
          <td style="text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`)
            .join('');
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; font-size: 14px;">
        <h2>Thank you for your order, ${userName}!</h2>
        <p>Here is your order summary:</p>
        <table style="width:100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border-bottom:1px solid #ccc; padding:8px;">Product</th>
              <th style="border-bottom:1px solid #ccc; padding:8px;">Qty</th>
              <th style="border-bottom:1px solid #ccc; padding:8px;">Price</th>
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
        await this.resend.emails.send({
            from: 'onboarding@resend.dev', // replace with verified Resend sender
            to,
            subject: 'Your Order Confirmation',
            html: htmlContent,
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
//# sourceMappingURL=email.service.js.map