
import { setFips } from "crypto";
import { useEffect, useState } from "react";
import axios from 'axios'

import io from "socket.io-client";

//ゲームの情報として必要なもの
//自分のパドル(x, y)
//相手のパドル(x, y)
//ボール(x, y)

//パドルの横幅縦幅は誰が持つ(とりあえず両方に書く？)
//apiで取得？(固定値だからへんか)

//縦にしたいsws

//一回動くものを作り、後でリファクタ

interface Position {
	x: number;
	y: number;
}

const canvasHeight = 400;
const canvasWidth = 600;
const paddleHeight = canvasHeight / 4.5;
const paddleWidth = paddleHeight / 9.5;
const startPaddleY = canvasHeight / 2.0 - paddleHeight / 2.0;
const paddleSpeed = 9;

const ballSize = paddleWidth *1.5;

const timerInterval = 20;

//記法の是非
const upDirection = 'up';
const downDirection = 'down';

const upKey = 'w';
const downKey = 's';

const keydownEvent = 'keydown';
const keyupEvent = 'keyup';

//todo 左右の位置を取得する
const socket = io("http://localhost:5000");

const pongSocket = () => {
  //const paddleX = paddleWidth * 2.5;
 // const [paddleY, setPaddleY] = useState(canvasHeight / 2 - paddleHeight / 2);
  const [myPaddlePos, setMyPaddlePos] =  useState<Position>({
    x: paddleWidth * 2.5,
    y: startPaddleY
  });

  const [oppPaddlePos, setOppPaddlePos] = useState<Position>({
    x: canvasWidth - paddleWidth * 2.5 - paddleWidth,
    y: startPaddleY
  });

  const [ballPos, setBallPos] = useState<Position>({
	x: canvasWidth / 2 - ballSize / 2,
	y: canvasHeight / 2 - ballSize / 2
  });

  socket.on("update_game", (data)=>{
	//とりあえず相手のパドルとボールを受け取るs
	setBallPos(data.ballPos);
	setOppPaddleY(data.oppPaddleY);
});

  const [dummy_ballPos, setDummyBallPos] = useState<Position>({
	x: canvasWidth / 2 - ballSize / 2,
	y: canvasHeight / 2 - ballSize / 2
  });

  const setMyPaddleY = (ny:number)=>{
	setMyPaddlePos((prev) => ({ 
		x : prev.x,
		y : ny
	}));
  }
  const setOppPaddleY = (ny:number)=>{
	setOppPaddlePos((prev) => ({ 
		x : prev.x,
		y : ny
	}));
  }


   //サーバーから受信
	// socket.on("update_game", (data)=>{
	// 	//とりあえず相手のパドルとボールを受け取るs
	// 	//setDummyBallPos(data.ballPos);
	// 	// setOppPaddleY(data.oppPaddleY);
	// });

  const [isPressingUp, setPressingUp] = useState(false);
  const [isPressingDown, setPressingDown] = useState(false);
  const [frameCnt, setFrameCnt] = useState(0);
  

  //初期のパドルのx座標をapiに決めてもらう

	function drawPaddle(ctx : any, paddlePos : Position){
		ctx.fillStyle = "white";
		ctx.fillRect(paddlePos.x, paddlePos.y, paddleWidth, paddleHeight); 
	}
	function drawBall(ctx : any){
		ctx.fillStyle = "white";
		ctx.fillRect(ballPos.x, ballPos.y, ballSize, ballSize); 
	}

	function clearCanvas(ctx : any){
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}
	function drawCanvas(ctx : any){
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	}

  const drawGame = (ctx: any) => {
	if (ctx) {
	  	clearCanvas(ctx);
		drawCanvas(ctx);
		drawBall(ctx);
		drawPaddle(ctx, myPaddlePos);
		drawPaddle(ctx, oppPaddlePos);
	}
  };

  const handleKeyDown = (e: KeyboardEvent) => {
	if (e.key === upKey) 
	{
		setPressingUp(true);
	}
	if (e.key === downKey) 
	{
		setPressingDown(true);
	}
  };

  const handleKeyUp = (e: KeyboardEvent) => {
	if (e.key === upKey) 
	{
		setPressingUp(false);
	}
	if (e.key === downKey) 
	{
		setPressingDown(false);
	}
  };
  

  //はみ出たらclampするのもあり
	function moveMyPaddle()
	{
		if (isPressingUp && !isPressingDown && myPaddlePos.y - paddleSpeed >= 0)
		{
			setMyPaddleY(myPaddlePos.y - paddleSpeed);
			return true;
		}
		else if (!isPressingUp && isPressingDown && myPaddlePos.y + paddleSpeed + paddleHeight < canvasHeight)
		{
			setMyPaddleY(myPaddlePos.y + paddleSpeed);
			return true;
		}
		else
		{
			return false;
		}
	}
	/*const getBallPos = async (): Promise<Position> => {
		return axios
		  .get('http://localhost:5000/pong/oppBallPos')
		  .then((response) => {
			return response.data;
		  })
		  .catch((error) => {
			console.log('geterror');
			console.error(error);
		  });
	  };*/

	  /*
	const getOppPaddleY = async (): Promise<number> => {
		return axios
		  .get('http://localhost:5000/pong/oppPaddlePosY')
		  .then((response) => {
		//	console.log('get Y', response.data.paddlePosY);
			return response.data.paddlePosY;
		  })
		  .catch((error) => {
			console.log('geterror');
			console.error(error);
			return 0;
		  });
	  };*/
	  //ゲームの状態が送られてくる

		const postMyPaddleY = async ()=>{
			await new Promise(() => {
				socket.emit("post_paddle", {paddleY : myPaddlePos.y});
			});
		};
	  //const postMyPaddleY = async ()=>{
		//todo
		
		/*await axios.post('http://localhost:5000/pong/myPaddlePosY', {paddlePosY: myPaddlePos.y })
		.then((res) => {
			// console.log(res)
		})
		.catch((error) => {
			// console.error(error)
		});
		*/
	  //};

	  //useEffectはそのままで、自分のパドルの位置以外の値を書き換える処理をonでやる

	useEffect(() => {
		// postMyPaddleY();
		// socket.emit("request_game_state");
		 const canvas = document.getElementById("canvas") as HTMLCanvasElement;
		 const ctx = canvas.getContext("2d");
		 let requestId: number;
		 const render = () => {
		   drawGame(ctx);
		   requestId = requestAnimationFrame(render);
		 };
		 render();
		//  const interval = setInterval(async () => {
		// 	 	setFrameCnt(frameCnt + 1);
		//  });
		//一定間隔で自分のパドルの位置をポストする
		const interval = setInterval(async () => {
			setFrameCnt(frameCnt + 1);
			if (moveMyPaddle())
			{
	//			await postMyPaddleY();
			}
			//todo
			//setOppPaddleY(await getOppPaddleY());
			//setBallPos(await getBallPos());
		}, timerInterval); // 1000ミリ秒ごとに実行
		document.addEventListener(keydownEvent, handleKeyDown);
		document.addEventListener(keyupEvent, handleKeyUp);
		return () => 
		{
			document.removeEventListener(keydownEvent, handleKeyDown);
			document.removeEventListener(keyupEvent, handleKeyUp);
			clearInterval(interval); 
		};
	//}, [frameCnt, myPaddlePos, oppPaddlePos]);
	}, [frameCnt]);

	return <canvas id="canvas" width={canvasWidth.toString()} height={canvasHeight.toString()}></canvas>;
};

export default pongSocketBad;
//一定間隔で、post, getをできるかのテスト
//最終的に、矢印キーが押されたら、外部のキーが押されている判定の変数をtrueにして
//その値によって、updateの中でパドルの位置を動かし、postする