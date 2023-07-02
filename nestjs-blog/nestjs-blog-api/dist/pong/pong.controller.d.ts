interface Position {
    x: number;
    y: number;
}
export declare class PongController {
    private lPaddleY;
    private rPaddleY;
    private paddleSpeed;
    private callCnt;
    getPaddlePosition(): Promise<{
        paddlePosY: number;
    }>;
    setPaddlePosition(body: {
        paddlePosY: number;
    }): Promise<void>;
    launchBall(): void;
    checkBoundWall(): void;
    checkBoundLPaddle(paddleLeft: number, paddleTop: number): void;
    checkBoundRPaddle(paddleLeft: number, paddleTop: number): void;
    moveBall(): void;
    goal(): boolean;
    getBallPosition(): Promise<Position>;
}
export {};
