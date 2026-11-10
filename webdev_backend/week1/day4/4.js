const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end("Welcome to home page");
  } else if (req.url == "/about") {
    res.end("Welcome to About page");
  } else if (req.url == "/login") {
    res.end("Welcome to login page");
  } else {
    res.end("Not Found");
  }
});

server.listen(8080, () => {
  console.log("Server is running at port 8080");
});