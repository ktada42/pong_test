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

//クライアントと通信
io.on("connection", (socket)=> {
	console.log("クライアントと接続しました！");

	//20msごとに現在のボールの位置と相手のパドルの位置を送信する
	setInterval(() => {
		io.emit("update_game", { ballX : 1, ballY : 2, paddleY :3});
	}, 500);

	//クライアントから受信
	socket.on("send_message", (data)=>{
		console.log(data);

		//クライアントへ送信
		io.emit("recieved_message", data);
	});

	socket.on("post_paddle", (data)=>{
		console.log("api post_paddle");
		console.log(data);
	});

	socket.on("disconnect", ()=>{
		console.log("クライアントと接続が切れました");
	})
});



server.listen(PORT, ()=> console.log(`server is running on ${PORT}`));
