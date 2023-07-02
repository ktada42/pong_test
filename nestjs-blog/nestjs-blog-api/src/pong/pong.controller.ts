import { Body, Controller, Get, Post, Query } from '@nestjs/common';


//todo frontendと共有する(現状両方のファイルに直に書いているため値を変更するときはどちらも変えないといけない)
const canvasHeight = 400;
const canvasWidth = 600;
const paddleHeight = canvasHeight / 4.5;
const paddleWidth = paddleHeight / 9.5;
const lPaddleX = paddleWidth * 2.5;
const rPaddleX = canvasWidth - paddleWidth * 2.5 - paddleWidth;
const startPaddleY = canvasHeight / 2.0 - paddleHeight / 2.0;

//todo frontendと共有する
interface Position {
	x: number;
	y: number;
}


const ballSize = paddleWidth *1.5;



const startBallSpeed = 9;

const startBallPosition:Position = {
	x : canvasWidth / 2 - ballSize / 2,
	y : canvasHeight / 2 - ballSize / 2,
}

//参照型なので=startBallPositionとすると値が連動してしまう
let ballPosition:Position = {
	x: startBallPosition.x,
	y: startBallPosition.y,
};
let ballVX = -1;
let ballVY = -1; 
//let ballSpeed = startBallSpeed;
let setedBallVect = false;

@Controller('pong')
export class PongController {
	private lPaddleY: number = startPaddleY;
	private rPaddleY: number = startPaddleY;
	private paddleSpeed = 9;// todo キャンバスに対しての大きさ
	private callCnt = 0;

	//todo directionの型を共有したい (ßup, downみたいな値を直書きしたくない)
	@Get('/oppPaddlePosY')
	async getPaddlePosition(): Promise<{ paddlePosY: number }> {
		let paddleMidY = this.rPaddleY + paddleHeight / 2;
		let ballMidY = ballPosition.y + ballSize / 2;
		if (paddleMidY < ballMidY - paddleHeight / 4)
		{
			this.rPaddleY += this.paddleSpeed;
		}
		else if (paddleMidY > ballMidY + paddleHeight / 4)
		{
			this.rPaddleY -= this.paddleSpeed;
		}
  		return { paddlePosY: this.rPaddleY };
	}

	@Post('/myPaddlePosY')
	async setPaddlePosition(@Body() body: { paddlePosY: number }): Promise<void> {
		this.lPaddleY = body.paddlePosY;
	}

	launchBall(){
		setedBallVect = true;
		ballPosition = {
			x: startBallPosition.x,
			y: startBallPosition.y,
		};
		ballVX = Math.random();
		while (ballVX < 0.6 || ballVX >0.85) {
			ballVX = Math.random();
		}
		if (Math.random() < 0.5)
			ballVX *= -1;
		ballVY = Math.sqrt(1 - ballVX * ballVX) * (Math.random() < 0.5 ? -1 : 1);
		ballVX *= startBallSpeed;
		ballVY *= startBallSpeed;
	}

	
	checkBoundWall()
	{
		if (ballPosition.y + ballVY < 0)
		{
			ballVY  *= -1;
		}
		else if (ballPosition.y + ballVY + ballSize > canvasHeight)
		{
			ballVY *= -1;
		}
	}
	checkBoundLPaddle(paddleLeft:number, paddleTop : number)
	{
		let paddleBot = paddleTop + paddleHeight;
		let paddleRight = paddleLeft + paddleWidth;
		let ballNx = ballPosition.x + ballVX;
		let ballNy = ballPosition.y + ballVY;
		let ballNTop = ballNy;
		let ballNBot = ballNy + ballSize;
		let ballNLeft = ballNx;
		let ballNRight = ballNx + ballSize;
		let insideY =  ((paddleTop < ballNTop && ballNTop < paddleBot)
					||(paddleTop < ballNBot && ballNBot < paddleBot));
		if (!insideY)
		{	
			return;
		}
		if (paddleRight < ballPosition.x && ballNLeft < paddleRight)
		{
			ballVX *= 1.1;
			ballVY *= 1.1;
			ballVX *= -1;
		}
		else if (ballNLeft < paddleRight && paddleLeft < ballNRight)
		{
			ballVX *= 1.1;
			ballVY *= 1.1;
			let paddleMidY = (paddleTop + paddleBot) / 2;
			let ballMidY = (ballNTop + ballNBot) / 2;
			//上からぶつかっている
			if (paddleMidY > ballMidY)
			{
				ballVY = Math.abs(ballVY) * -1;
			}
			else
			{
				ballVY = Math.abs(ballVY);
			}
		}
	}
	checkBoundRPaddle(paddleLeft:number, paddleTop : number)
	{
		let paddleBot = paddleTop + paddleHeight;
		let paddleRight = paddleLeft + paddleWidth;
		let ballNx = ballPosition.x + ballVX;
		let ballNy = ballPosition.y + ballVY;
		let ballNTop = ballNy;
		let ballNBot = ballNy + ballSize;
		let ballNLeft = ballNx;
		let ballNRight = ballNx + ballSize;
		let insideY =  ((paddleTop < ballNTop && ballNTop < paddleBot)
					||(paddleTop < ballNBot && ballNBot < paddleBot));
		if (!insideY)
		{	
			return;
		}
		if (ballPosition.x < paddleLeft && paddleLeft < ballNRight)
		{
			ballVX *= 1.1;
			ballVY *= 1.1;
			ballVX *= -1;
		}
		else if (ballNLeft < paddleRight && paddleLeft < ballNRight)
		{
			ballVX *= 1.1;
			ballVY *= 1.1;
			let paddleMidY = (paddleTop + paddleBot) / 2;
			let ballMidY = (ballNTop + ballNBot) / 2;
			//上からぶつかっている
			if (paddleMidY > ballMidY)
			{
				ballVY = Math.abs(ballVY) * -1;
			}
			else
			{
				ballVY = Math.abs(ballVY);
			}
		}
	}
	moveBall(){
  		this.checkBoundWall();
  		this.checkBoundLPaddle(lPaddleX, this.lPaddleY);
  		this.checkBoundRPaddle(rPaddleX, this.rPaddleY);
		ballPosition.x += ballVX;
		ballPosition.y += ballVY;
  		//checkBoundPaddle();
	}

	goal(){
		return ballPosition.x < -100 || ballPosition.x + ballSize > canvasWidth + 100;
	}

	@Get('/oppBallPos')
	async getBallPosition(): Promise<Position> {
		if (!setedBallVect || this.goal())
		{
			this.launchBall();	
		}
		this.moveBall();
		return ballPosition;
	}
}

/*
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
}
*/
