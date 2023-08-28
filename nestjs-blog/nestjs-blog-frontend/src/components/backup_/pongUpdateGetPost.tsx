
import { setFips } from "crypto";
import { useEffect, useState } from "react";
import axios from 'axios'

const pongUpdateGetPost = () => {
  const [paddleX, setPaddleX] = useState(0);
  const [pressingL, setPressingL] = useState(false);
  const [pressingR, setPressingR] = useState(false);
  const [frameCnt, setFrameCnt] = useState(0);

  const timerInterval = 20;

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
	
	const paddleWidth = canvas.width / 4.5;
	const paddleHeight = paddleWidth / 9.5;
	
	const paddleY = canvas.height - paddleHeight * 2.5;

    const draw = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  		ctx.fillStyle = "black";
  		ctx.fillRect(0, 0, canvas.width, canvas.height);
  		ctx.fillStyle = "white";
        ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
      }
    };

    draw();
	
	const interval = setInterval(async () => {

		setFrameCnt(frameCnt + 1);
		let nowDirection = '';
		//少しはみ出るので直す
		if (pressingL && !pressingR && paddleX > 0)
		{
			nowDirection = 'left';
		}
		if (!pressingL && pressingR && paddleX + paddleWidth < canvas.width)
		{
			nowDirection = 'right';
		}
		if (nowDirection == '')return;
		// ここに一定時間ごとに実行したい処理を書く
	//	console.log("query", nowDirection);
		const response = await fetch(`http://localhost:5000/pong/paddlePosX?direction=${nowDirection}`);
		const data = await response.json();
		setPaddleX(data.x);

		/*const post = ()=>{
			console.log("post x", paddleX);
			axios.post('http://localhost:5000/pong/paddlePosX', { paddleX })
			.then((res) => {
			//	console.log(res)
			})
			.catch((error) => {
			//	console.error(error)
			});
		  };
		  const get = ()=>{

			axios.get('http://localhost:5000/pong/paddlePosX')
			.then((response) => {
				console.log("get x", response.data.x);
			})
			.catch((error) => {
				console.log("geterror");
				console.error(error);
			});
		  };
			post();
			get();*/

	  }, timerInterval); // 1000ミリ秒ごとに実行
	  

	  const handleKeyDown = (e: KeyboardEvent) => {
		//console.log("keydown ", e.key);
		if (e.key === "ArrowLeft") {
			setPressingL(true);
		}
		if (e.key === "ArrowRight") {
			setPressingR(true);
		}
	  };
  
	  const handleKeyUp = (e: KeyboardEvent) => {
		//console.log("keyup ", e.key);
		if (e.key === "ArrowLeft") {
			setPressingL(false);
		}
		if (e.key === "ArrowRight") {
			setPressingR(false);
		}
	  };
  
	  document.addEventListener("keydown", handleKeyDown);
	  document.addEventListener("keyup", handleKeyUp);
	  
	  return () => {
		document.removeEventListener("keydown", handleKeyDown);
		document.removeEventListener("keyup", handleKeyUp);
		clearInterval(interval); 
	  };
	
  }, [frameCnt, paddleX]);

  return <canvas id="canvas" width="450" height="600"></canvas>;
};

export default pongUpdateGetPost;
//一定間隔で、post, getをできるかのテスト
//最終的に、矢印キーが押されたら、外部のキーが押されている判定の変数をtrueにして
//その値によって、updateの中でパドルの位置を動かし、postする