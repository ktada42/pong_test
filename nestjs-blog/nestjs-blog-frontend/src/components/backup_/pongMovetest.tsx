
import { useEffect, useState } from "react";

const pongMovetest = () => {
  const [paddleX, setPaddleX] = useState(0);
  const [timerId, setTimerId] = useState<number | null>(null);

  const [nowDirection, setNowDirection] = useState('right');
  let turn  = 0;
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
		if (nowDirection == 'left' && paddleX <= 0)
		{
			setNowDirection('right');
			console.log(paddleX, 'setr');
		}
		
		if (nowDirection == 'right' && paddleX + paddleWidth > canvas.width)
		{
			setNowDirection('left');
			console.log(paddleX, 'setl');
		}
		// ここに一定時間ごとに実行したい処理を書く
		const response = await fetch(`http://localhost:5000/pong/paddlePosX?direction=${nowDirection}`);
		const data = await response.json();
		setPaddleX(data.x);
	  }, timerInterval); // 1000ミリ秒ごとに実行
  
	  return () => clearInterval(interval); // コンポーネントのアンマウント時にintervalをクリア
	
  }, [timerId, paddleX]);

  return <canvas id="canvas" width="450" height="600"></canvas>;
};

export default pongMovetest;