"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const aws_controller_1 = require("./aws.controller");
describe('AwsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [aws_controller_1.AwsController],
        }).compile();
        controller = module.get(aws_controller_1.AwsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=aws.controller.spec.js.map