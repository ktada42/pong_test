export declare class PongController {
    private paddleX;
    private paddleSpeed;
    private callCnt;
    getPaddlePositionQ(direction: string): {
        paddlePosX: number;
    };
    getPaddlePosition(): Promise<{
        paddlePosX: number;
    }>;
    setPaddlePosition(body: {
        paddlePosX: number;
    }): Promise<void>;
}
