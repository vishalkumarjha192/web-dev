// step 1 : 

const express = require("express");

// step 2 :

const app =express();

// step 3 : routers/api

app.get("/",(req,res)=>{
  res.send({asg : "Welcome to express server"})
});

app.get("/home",(req,res)=>{
  res.send({asg : "Welcome to home page"})
});

app.get("/about",(req,res)=>{
  res.send({asg : "Welcome to about page"})
});

app.listen(8000,()=>{
  console.log("server started...")
});