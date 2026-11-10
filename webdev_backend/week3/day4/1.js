// step -1
const express = require("express");
const fs = require("fs");

// Step -2
const app = express();

// Middleware --> req.body --> parse
app.use(express.json());

// step -3 Routes / API

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to Express Server" });
});

app.get("/home", (req, res) => {
  res.send({ msg: "Welcome to Home Page" });
});

// GET API / Read Route
app.get("/read", (req, res) => {
  const data = fs.readFileSync("./1.json", "utf-8");

  // JSON --> JavaScript Object
  const jsData = JSON.parse(data);

  console.log(jsData);
  console.log(typeof jsData);

  console.log(jsData.student);

  res.send({ data: jsData });
});

// GET API / Read Route only for student
app.get("/stread", (req, res) => {
  const data = fs.readFileSync("./1.json", "utf-8");

  const jsData = JSON.parse(data);

  console.log(jsData.student);

  res.send({ data: jsData.student });
});

// GET API / Read Route only for trainer
app.get("/trread", (req, res) => {
  const data = fs.readFileSync("./1.json", "utf-8");

  const jsData = JSON.parse(data);

  console.log(jsData.trainer);

  res.send({ data: jsData.trainer });
});

// POST API / Create Student
app.post("/create", (req, res) => {
  const payload = req.body;

  console.log("New Student:", payload);

  const data = JSON.parse(fs.readFileSync("./1.json", "utf-8"));

  const stdata = data.student;

  // Add new student
  stdata.push(payload);

  data.student = stdata;

  // Save updated data
  fs.writeFileSync("./1.json", JSON.stringify(data, null, 2));

  res.send({
    msg: "New student created successfully",
  });
});

// PUT API / Update Student
app.put("/update/:id", (req, res) => {
  const payload = req.body;

  console.log("Updated Data:", payload);

  const data = JSON.parse(fs.readFileSync("./1.json", "utf-8"));

  const stdata = data.student;

  console.log("Old Student Data:", stdata);

  // Update student using id
  // const updateData = stdata.map((el) => {
  //   if (el.id == req.params.id) {
  //     return payload;
  //   } else {
  //     return el;
  //   }
  // });

  const updateData = stdata.map((el) => {
    if (el.id == req.params.id) {
      return {...el,  ...payload};
    }
  });

  console.log("Updated Student Data:", updateData);

  data.student = updateData;

  // Save updated data
  fs.writeFileSync("./1.json", JSON.stringify(data, null, 2));

  res.send({
    msg: "Student record updated successfully",
  });
});

// Start Server
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
