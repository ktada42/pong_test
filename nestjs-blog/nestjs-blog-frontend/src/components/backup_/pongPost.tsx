import { useEffect, useState } from "react";
import axios from 'axios'

const PongImage = () => {
  const [paddleX, setX] = useState(0);
  const [timerId, setTimerId] = useState<number | null>(null);

  const timerInterval = 20;
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
	
	const paddleSpeed = canvas.width / 100;
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
	const postGet = ()=>{
		console.log("post x", paddleX);
	/*	axios.post('http://localhost:5000/pong/paddlePosX', { paddleX })
		.then((res) => {
		//	console.log(res)
		})
		.catch((error) => {
		//	console.error(error)
		});
*/


		// axios.get('http://localhost:5000/pong/paddlePosX')
		// .then((response) => {
		// 	console.log("get x", response.data.x);
		// })
		// .catch((error) => {
		// 	console.log("geterror");
		// 	console.error(error);
		// });
	  };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (timerId !== null) return;

	//			postGet();
      if (e.key === "ArrowLeft") {
        setTimerId(
          window.setInterval(() => {
            setX((paddleX) => {
				let paddleNx = paddleX - paddleSpeed;
				return paddleNx < 0 ? 0 : paddleNx;
			});
          }, timerInterval)
        );
      }
      if (e.key === "ArrowRight") {
        setTimerId(
          window.setInterval(() => {
            setX((paddleX) => {
				let paddleNx = paddleX + paddleSpeed;
				return paddleNx + paddleWidth > canvas.width ? canvas.width - paddleWidth : paddleNx;
			});
          }, timerInterval)
        );
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (timerId === null) return;

      clearInterval(timerId);
      setTimerId(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
	
	postGet();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [paddleX, timerId]);

  return <canvas id="canvas" width="450" height="600"></canvas>;
};

export default PongImage;
/*
import axios from 'axios'
import { useEffect, useState } from "react";

//paddleの動きをfrontでシミュレートする（壁に当たった時など）

const pongPost = () => {
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
	const paddleSpeed = 9;
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
	
	
	// const interval = setInterval(async () => {
	// 	const response = await fetch(`http://localhost:5000/pong/paddlePosX`);
	// 	const data = await response.json();
	// 	setPaddleX(data.x);
	//   }, timerInterval); // 1000ミリ秒ごとに実行

	  const postGet = ()=>{
		console.log("post x", paddleX);
		axios.post('http://localhost:5000/pong/paddlePosX', { paddleX })
		.then((res) => {
			console.log(res)
		})
		.catch((error) => {
			console.error(error)
		});

		// axios.get('http://localhost:5000/pong/paddlePosX')
		// .then((response) => {
		// 	console.log("get x", response.data.x);
		// 	console.log(response);
		// })
		// .catch((error) => {
		// 	console.error(error);
		// });
	  };

	  const handleKeyDown = (e: KeyboardEvent) => {
		if (timerId !== null) return;
		if (e.key === "ArrowLeft") {
		  setTimerId(
			window.setInterval(() => {
				setPaddleX((paddleX) => {
				  let paddleNx = paddleX - paddleSpeed;
				  return paddleNx < 0 ? 0 : paddleNx;
			  });
			}, timerInterval)
		  );
		//   postGet();
			
	
		}
		if (e.key === "ArrowRight") {
		  setTimerId(
			window.setInterval(() => {
				setPaddleX((paddleX) => {
				  let paddleNx = paddleX + paddleSpeed;
				  return paddleNx + paddleWidth > canvas.width ? canvas.width - paddleWidth : paddleNx;
			  });
			}, timerInterval)
		  );
		//   postGet();
		}
	  };
  
	  const handleKeyUp = (e: KeyboardEvent) => {
		if (timerId === null) return;
  
		clearInterval(timerId);
		setTimerId(null);
	  };
  
	  document.addEventListener("keydown", handleKeyDown);
	  document.addEventListener("keyup", handleKeyUp);
  
	  return () => {
		//clearInterval(interval); // コンポーネントのアンマウント時にintervalをクリア
	    document.removeEventListener("keydown", handleKeyDown);
  	    document.removeEventListener("keyup", handleKeyUp);
	}
	
  }, [timerId, paddleX]);

  return <canvas id="canvas" width="450" height="600"></canvas>;
};

export default pongPost;*/