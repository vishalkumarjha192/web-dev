// npm init -y
// npm i socket.io

const { Socket } = require("dgram");
const express = require("express");
const http =require("http");

const {Server} = require("socket.io");

const app = express();
const httpserver = http.createServer(app);

const io = new Server(httpserver);

io.on("connection", (Socket)=>{
  // sending
  Socket.emit("gyankibaat", "Welcome to socket.io server");

  //  Reading
  Socket.on("kuchbhi", (msg)=>{
    console.log(msg);
  });
});

httpserver.listen(8080, () => {
  console.log("Server started")
})