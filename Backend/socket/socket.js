import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
	  origin: process.env.FRONTEND_URL,
	  methods: ["GET", "POST"],
	  credentials: true,
	},
  });

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; 

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;
	console.log("User Connected:", socket.id, "with userId:", userId);

	if (userId != "undefined") userSocketMap[userId] = socket.id;

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("User Disconnected:", socket.id, "with userId:", userId);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
