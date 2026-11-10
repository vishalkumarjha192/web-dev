const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end("Home");
  } 
  else if (req.url == "/about") {
    res.end("About");
  } 
  else if (req.url == "/data") {
    const data = fs.readFileSync("./1.json", "utf-8");
    res.end(data);
  } 
  else {
    res.end("Not Found");
  }
});

// Start server
server.listen(8080, () => {
  console.log("Server running on port 3000");
});