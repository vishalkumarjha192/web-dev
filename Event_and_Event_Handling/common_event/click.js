// click 

function hello(){
  alert("done")
}

let x= document.querySelector("button").addEventListener("click",hello);


let btn=document.querySelector("#btn");
let fileinp=document.querySelector("#file");

btn.addEventListener("click",function(){
  fileinp.click();
})

fileinp.addEventListener("change",function(e){
  // console.log(e.target.file[0].name);
  btn.textContent=e.target?.files[0].name
})