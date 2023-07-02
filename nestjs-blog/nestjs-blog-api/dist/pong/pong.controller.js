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
const canvasHeight = 400;
const canvasWidth = 600;
const paddleHeight = canvasHeight / 4.5;
const paddleWidth = paddleHeight / 9.5;
const lPaddleX = paddleWidth * 2.5;
const rPaddleX = canvasWidth - paddleWidth * 2.5 - paddleWidth;
const startPaddleY = canvasHeight / 2.0 - paddleHeight / 2.0;
const ballSize = paddleWidth * 1.5;
const startBallSpeed = 9;
const startBallPosition = {
    x: canvasWidth / 2 - ballSize / 2,
    y: canvasHeight / 2 - ballSize / 2,
};
let ballPosition = {
    x: startBallPosition.x,
    y: startBallPosition.y,
};
let ballVX = -1;
let ballVY = -1;
let setedBallVect = false;
let PongController = exports.PongController = class PongController {
    constructor() {
        this.lPaddleY = startPaddleY;
        this.rPaddleY = startPaddleY;
        this.paddleSpeed = 9;
        this.callCnt = 0;
    }
    async getPaddlePosition() {
        let paddleMidY = this.rPaddleY + paddleHeight / 2;
        let ballMidY = ballPosition.y + ballSize / 2;
        if (paddleMidY < ballMidY - paddleHeight / 4) {
            this.rPaddleY += this.paddleSpeed;
        }
        else if (paddleMidY > ballMidY + paddleHeight / 4) {
            this.rPaddleY -= this.paddleSpeed;
        }
        return { paddlePosY: this.rPaddleY };
    }
    async setPaddlePosition(body) {
        this.lPaddleY = body.paddlePosY;
    }
    launchBall() {
        setedBallVect = true;
        ballPosition = {
            x: startBallPosition.x,
            y: startBallPosition.y,
        };
        ballVX = Math.random();
        while (ballVX < 0.6 || ballVX > 0.85) {
            ballVX = Math.random();
        }
        if (Math.random() < 0.5)
            ballVX *= -1;
        ballVY = Math.sqrt(1 - ballVX * ballVX) * (Math.random() < 0.5 ? -1 : 1);
        ballVX *= startBallSpeed;
        ballVY *= startBallSpeed;
    }
    checkBoundWall() {
        if (ballPosition.y + ballVY < 0) {
            ballVY *= -1;
        }
        else if (ballPosition.y + ballVY + ballSize > canvasHeight) {
            ballVY *= -1;
        }
    }
    checkBoundLPaddle(paddleLeft, paddleTop) {
        let paddleBot = paddleTop + paddleHeight;
        let paddleRight = paddleLeft + paddleWidth;
        let ballNx = ballPosition.x + ballVX;
        let ballNy = ballPosition.y + ballVY;
        let ballNTop = ballNy;
        let ballNBot = ballNy + ballSize;
        let ballNLeft = ballNx;
        let ballNRight = ballNx + ballSize;
        let insideY = ((paddleTop < ballNTop && ballNTop < paddleBot)
            || (paddleTop < ballNBot && ballNBot < paddleBot));
        if (!insideY) {
            return;
        }
        if (paddleRight < ballPosition.x && ballNLeft < paddleRight) {
            ballVX *= 1.1;
            ballVY *= 1.1;
            ballVX *= -1;
        }
        else if (ballNLeft < paddleRight && paddleLeft < ballNRight) {
            ballVX *= 1.1;
            ballVY *= 1.1;
            let paddleMidY = (paddleTop + paddleBot) / 2;
            let ballMidY = (ballNTop + ballNBot) / 2;
            if (paddleMidY > ballMidY) {
                ballVY = Math.abs(ballVY) * -1;
            }
            else {
                ballVY = Math.abs(ballVY);
            }
        }
    }
    checkBoundRPaddle(paddleLeft, paddleTop) {
        let paddleBot = paddleTop + paddleHeight;
        let paddleRight = paddleLeft + paddleWidth;
        let ballNx = ballPosition.x + ballVX;
        let ballNy = ballPosition.y + ballVY;
        let ballNTop = ballNy;
        let ballNBot = ballNy + ballSize;
        let ballNLeft = ballNx;
        let ballNRight = ballNx + ballSize;
        let insideY = ((paddleTop < ballNTop && ballNTop < paddleBot)
            || (paddleTop < ballNBot && ballNBot < paddleBot));
        if (!insideY) {
            return;
        }
        if (ballPosition.x < paddleLeft && paddleLeft < ballNRight) {
            ballVX *= 1.1;
            ballVY *= 1.1;
            ballVX *= -1;
        }
        else if (ballNLeft < paddleRight && paddleLeft < ballNRight) {
            ballVX *= 1.1;
            ballVY *= 1.1;
            let paddleMidY = (paddleTop + paddleBot) / 2;
            let ballMidY = (ballNTop + ballNBot) / 2;
            if (paddleMidY > ballMidY) {
                ballVY = Math.abs(ballVY) * -1;
            }
            else {
                ballVY = Math.abs(ballVY);
            }
        }
    }
    moveBall() {
        this.checkBoundWall();
        this.checkBoundLPaddle(lPaddleX, this.lPaddleY);
        this.checkBoundRPaddle(rPaddleX, this.rPaddleY);
        ballPosition.x += ballVX;
        ballPosition.y += ballVY;
    }
    goal() {
        return ballPosition.x < -100 || ballPosition.x + ballSize > canvasWidth + 100;
    }
    async getBallPosition() {
        if (!setedBallVect || this.goal()) {
            this.launchBall();
        }
        this.moveBall();
        return ballPosition;
    }
};
__decorate([
    (0, common_1.Get)('/oppPaddlePosY'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PongController.prototype, "getPaddlePosition", null);
__decorate([
    (0, common_1.Post)('/myPaddlePosY'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PongController.prototype, "setPaddlePosition", null);
__decorate([
    (0, common_1.Get)('/oppBallPos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PongController.prototype, "getBallPosition", null);
exports.PongController = PongController = __decorate([
    (0, common_1.Controller)('pong')
], PongController);
//# sourceMappingURL=pong.controller.js.map