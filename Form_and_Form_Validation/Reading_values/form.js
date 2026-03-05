// sample
let nm=document.querySelector("#name");
let form=document.querySelector("form");

// form.addEventListener("submit",function(e){
//   e.preventDefault();
//   if (nm.value.length <= 2){
//     document.querySelector("#hide").style.display = "initial";
//   }else {
//     document.querySelector("#hide").style.display = "none";
//   }
// })

// let email=document.querySelector("#email");
// let password=document.querySelector("#password");
// let gender=document.querySelector("#gender");
// let textarea=document.querySelector("#textarea");


form.addEventListener("submit",function(e){
  e.preventDefault()
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log(regex.test(email))  
})
