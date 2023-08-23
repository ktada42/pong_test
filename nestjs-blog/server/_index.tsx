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

const a: number = 3;
console.log("start");

io.on('connect', () => {
  console.log('connected');
});

io.on('disconnect', () => {
  console.log('disconnected');
});

io.on('message', (data) => {
  console.log(data);
});
