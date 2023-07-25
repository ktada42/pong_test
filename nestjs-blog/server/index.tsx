const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
	},
});

const PORT = 5000;

let ballx = 0;
let bally = 0;

let balldx = 1;
let balldy = 1;


let paddle_y = 0;

let paddledy = 1;

//todo frontendと共有する(現状両方のファイルに直に書いているため値を変更するときはどちらも変えないといけない)
// const canvasHeight = 400;
// const canvasWidth = 600;
// const paddleHeight = canvasHeight / 4.5;
// const paddleWidth = paddleHeight / 9.5;
// const lPaddleX = paddleWidth * 2.5;
// const rPaddleX = canvasWidth - paddleWidth * 2.5 - paddleWidth;
// const startPaddleY = canvasHeight / 2.0 - paddleHeight / 2.0;


// interface Position {
// 	x: number;
// 	y: number;
// }

// const ballSize = paddleWidth *1.5;


//クライアントと通信
io.on("connection", (socket)=> {
	console.log("クライアントと接続しました！");

	const emit_update_game = async ()=>{
		await new Promise(() => {
			io.emit("update_game", {ballPos:{x : ballx, y : bally}, paddleY :paddle_y});
			if (ballx + balldx < 0 || ballx + balldx >600)
			{
				balldx *= -1;
			}
			if (bally + balldy < 0 || bally + balldy >400)
			{
				balldy *= -1;
			}
			ballx += balldx;
			bally += balldy;	
			
			if (paddle_y + paddledy < 0 || paddle_y + paddledy >400)
			{
				paddledy *= -1;
			}
			paddle_y += paddledy;
		});
	};
	
	setInterval(async () => {
		await emit_update_game();
	}, 50);

	//クライアントから受信
	socket.on("send_message", (data)=>{
		console.log(data);

		//クライアントへ送信
		io.emit("recieved_message", data);
	});

	socket.on("post_paddle", (data)=>{
	//	console.log("api post_paddle");
	//	console.log(data);
	});

	socket.on("disconnect", ()=>{
		console.log("クライアントと接続が切れました");
	})
});



server.listen(PORT, ()=> console.log(`server is running on ${PORT}`));
