// const crypto = require("crypto");

// // step - 1 hash algo

// const algo = crypto.createHash("shake256");

// const data = algo.update("vishal");
// console.log(data)



const fs=require("fs");

// 1. read file

fs.readFile("./1.txt",{encoding:"utf-8"}, (err,data) => { 
  if(err){
    console.log("Something is worng ")
  } else {
    console.log(data);
  }
});




