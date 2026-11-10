// step -1
const express = require("express");
const fs = require("fs");

// Step -2
const app = express();

// middleware  --> req.body --> parse
app.use(express.json());

// step -3 Routes/Api
app.get("/", (req, res) => {
  res.send({ msg: "welcome to express server" });
});

app.get("/home", (req, res) => {
  res.send({ msg: "welcome to home Page" });
});

// GET API/ Read Route
app.get("/read", (req, res) => {
  const data = fs.readFileSync("./1.json", "utf-8");
  // console.log(data, typeof data);

  // converting json data ---- parse ----> js object
  const jsData = JSON.parse(data);
  console.log(jsData, typeof jsData);

  console.log(jsData.student);

  res.send({ data: jsData });
});

// GET API/ Read Route only for student
app.get("/stread", (req, res) => {
  const data = fs.readFileSync("./1.json", "utf-8");
  // console.log(data, typeof data);

  // converting json data ---- parse ----> js object
  const jsData = JSON.parse(data);
  console.log(jsData, typeof jsData);

  console.log(jsData.student);

  res.send({ data: jsData.student });
});

// GET API/ Read Route only for trainer
app.get("/trread", (req, res) => {
  const data = fs.readFileSync("./1.json", "utf-8");
  // console.log(data, typeof data);

  // converting json data ---- parse ----> js object
  const jsData = JSON.parse(data);
  console.log(jsData, typeof jsData);

  console.log(jsData.trainer);

  res.send({ data: jsData.trainer });
});

app.post("/create", (req, res) => {
  const payload = req.body;
  console.log(payload); // {}

  const data = JSON.parse(fs.readFileSync("./1.json", "utf-8"));  // {}

  const stdata = data.student; // []
  console.log(stdata);
  stdata.push(payload);
  console.log(stdata);

  data.student = stdata;

  fs.writeFileSync("./1.json", JSON.stringify(data));

  res.send({ msg: "New student Created successfully" });
});
app.listen(8080, () => {
  console.log("Server started");
});