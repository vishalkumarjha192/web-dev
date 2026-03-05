
//keyup






//keydown
let dom=document.querySelector("h1");
window.addEventListener("keydown",function(e){
  console.log("hello",e);
  if(e.key===" "){
    dom.textContent="SPC";
  }else{
    dom.textContent=e.key;
  }
})

window.addEventListener("keydown", function(data){
  console.log(data.key);
  
})