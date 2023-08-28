
import { useEffect, useState } from "react";

const PongWithBack = () => {
  const [paddleX, setPaddleX] = useState(0);
  const [timerId, setTimerId] = useState<number | null>(null);

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
	
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (timerId !== null) return;

      let direction = "";
      if (e.key === "ArrowLeft") direction = "left";
      if (e.key === "ArrowRight") direction = "right";

      if (direction != "") {
        setTimerId(
          window.setInterval(async () => {
            const res = await fetch(`http://localhost:5000/pong/paddlePosX?direction=${direction}`);
            
            const data = await res.json();
            setPaddleX(data.x);
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

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [timerId]);

  return <canvas id="canvas" width="450" height="600"></canvas>;
};

export default PongWithBack;