import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('pong')
export class PongController {
	
	private paddleX: number = 0;
	private paddleSpeed = 9;// todo キャンバスに対しての大きさ
	private callCnt = 0;

	@Get('/paddlePosX')
	getPaddlePositionQ(@Query('direction') direction: string): { paddlePosX: number } {
		if (direction === 'left') {
			  this.paddleX -= this.paddleSpeed;
		} else if (direction === 'right') {
			this.paddleX += this.paddleSpeed;
		}
	
		return { paddlePosX: this.paddleX };
	}

	@Get('/paddlePosX')
	async getPaddlePosition(): Promise<{ paddlePosX: number }> {
  		return { paddlePosX: this.paddleX };
	}

	@Post('/paddlePosX')
	async setPaddlePosition(@Body() body: { paddlePosX: number }): Promise<void> {
		this.paddleX = body.paddlePosX;
	}

	/*
	@Get()
	getPaddlePositionTest(): { x: number } {	
		return { x: this.paddleX };
	}*/

}
