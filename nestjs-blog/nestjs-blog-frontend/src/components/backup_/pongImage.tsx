import { useEffect, useState } from "react";

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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (timerId !== null) return;
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

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [paddleX, timerId]);

  return <canvas id="canvas" width="450" height="600"></canvas>;
};

export default PongImage;