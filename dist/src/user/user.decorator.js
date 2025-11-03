"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
// src/auth/decorators/current-user.decorator.ts
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // make sure your JWT guard sets req.user
});
//# sourceMappingURL=user.decorator.js.map