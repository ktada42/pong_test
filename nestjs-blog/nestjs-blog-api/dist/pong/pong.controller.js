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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongController = void 0;
const common_1 = require("@nestjs/common");
let PongController = exports.PongController = class PongController {
    constructor() {
        this.paddleY = 0;
        this.paddleSpeed = 9;
        this.callCnt = 0;
    }
    getPaddlePositionQ(direction) {
        if (direction === 'up') {
            this.paddleY -= this.paddleSpeed;
        }
        else if (direction === 'down') {
            this.paddleY += this.paddleSpeed;
        }
        return { paddlePosY: this.paddleY };
    }
    async getPaddlePosition() {
        return { paddlePosY: this.paddleY };
    }
    async setPaddlePosition(body) {
        this.paddleY = body.paddlePosY;
    }
};
__decorate([
    (0, common_1.Get)('/paddlePosY'),
    __param(0, (0, common_1.Query)('direction')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], PongController.prototype, "getPaddlePositionQ", null);
__decorate([
    (0, common_1.Get)('/paddlePosY'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PongController.prototype, "getPaddlePosition", null);
__decorate([
    (0, common_1.Post)('/paddlePosY'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PongController.prototype, "setPaddlePosition", null);
exports.PongController = PongController = __decorate([
    (0, common_1.Controller)('pong')
], PongController);
//# sourceMappingURL=pong.controller.js.map