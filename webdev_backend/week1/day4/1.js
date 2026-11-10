const { log } = require("console");
const fs=require("fs");


// // 1. Read opration async manner

// fs.readFile("./1.txt","utf-8", (err,data) => { 
//   if(err){
//     console.log("Something is worng ")
//   } else {
//     console.log(data);
//   }
// });

// // Read opration sync manner

// const syndata = fs.readFileSync("./1.txt","utf-8");
// console.log(syndata)



// 2. write operation

// // async manner
// fs.writeFile("./1.txt","Hello world", (err) => { 
//   if(err){
//     console.log("Something is worng ")
//   } else {
//     console.log("file write successfully");
//   }
// });


// // sync manner
// const syndata = fs.writeFileSync("./1.txt","Hello vishal");
// console.log(syndata)


// 3. update operation

// // async manner
// fs.appendFile("./1.txt","\nHello world", (err) => { 
//   if(err){
//     console.log("Something is worng ")
//   } else {
//     console.log("file write successfully");
//   }
// });


// // // sync manner
// const syndata = fs.appendFileSync("./1.txt","\nHello vishal");
// console.log(syndata)



//  4. Rename file name


// // // async manner
// // const rename= fs.rename("./1.txt","v1.txt",(err)=>{
// //   if(err){
// //     console.log("something is worng")
// //   }else{
// //     console.log("file name updated")
// //   }
// // })


// // // sync manner
// const rename = fs.renameSync("./v1.txt","vv1");
// console.log(syndata)




//  5. Delate file\

// const delateFile = fs.unlink("./vv1", (err)=> {
//     if(err){
//         console.log("something is worng")
//     }else{
//         console.log("file delated successfully")
//     }
// })