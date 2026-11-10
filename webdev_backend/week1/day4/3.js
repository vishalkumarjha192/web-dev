//  http

const http = require("http")

const server = http.createServer((request,Response) => {
  Response.end("Welcome to my node.js")
});

server.listen(8080);