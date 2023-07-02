export declare class PongController {
    private paddleY;
    private paddleSpeed;
    private callCnt;
    getPaddlePositionQ(direction: string): {
        paddlePosY: number;
    };
    getPaddlePosition(): Promise<{
        paddlePosY: number;
    }>;
    setPaddlePosition(body: {
        paddlePosY: number;
    }): Promise<void>;
}
