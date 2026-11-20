// // npm init -y
// // npm i socket.io

// const { Socket } = require("dgram");
// const express = require("express");
// const http =require("http");

// const {Server} = require("socket.io");

// const app = express();
// const httpserver = http.createServer(app);

// const io = new Server(httpserver);

// io.on("connection", (Socket)=>{
//   // sending
//   Socket.emit("gyankibaat", "Welcome to socket.io server");

//   Socket.broadcast.emit("join", "New user joined the chat");

//   //  Reading
//   Socket.on("kuchbhi", (msg)=>{
//     console.log(msg);
//   });

//   Socket.on("disconnect", ()=>{
//     count--;
//     console.log("Active users: ", count);
//   }
// });

// httpserver.listen(8080, () => {
//   console.log("Server started")
// })



// npm init -y
// npm install express socket.io

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpserver = http.createServer(app);

const io = new Server(httpserver, {
  cors: {
    origin: "*"
  }
});

let count = 0;

io.on("connection", (socket) => {

  count++;

  console.log("New user connected:", socket.id);
  console.log("Active users:", count);

  // Sending message to connected client
  socket.emit("gyankibaat", "Welcome to Socket.IO server");

  // Notify other users
  socket.broadcast.emit("join", "New user joined the chat");

  // Reading message from client
  socket.on("kuchbhi", (msg) => {
    console.log("Message from client:", msg);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    count--;

    console.log("User disconnected:", socket.id);
    console.log("Active users:", count);
  });

});

httpserver.listen(8080, () => {
  console.log("Server started on port 8080");
});
