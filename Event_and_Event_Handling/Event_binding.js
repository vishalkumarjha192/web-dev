// let h1=document.createElement("h1");
// h1.textContent="Hello I am vishal"
// document.body.prepend(h1);

// addEventListener
// let h1=document.querySelector("h1");
// h1.addEventListener("click",click);


// function click(){
//   h1.style.color="red";
// }


// removeEventListener
// h1.removeEventListener("click",click)


// document.getElementById("myInput").addEventListener("input",function (e){
//   console.log("you typed : ", e.target.value );
// })



let h=document.querySelector("h1");
const inp=document.querySelector("input");
inp.addEventListener("keydown", function(e){
  // console.log(e.key)

  if(e.key ===' '){
    h.textContent="SPC";
  }else{
    h.textContent=e.key;
  }
})

