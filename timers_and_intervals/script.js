let count=10;

let interval=setInterval(function(){
  if(count>=1){
    console.log(count);
    count--;
    // inp.textContent=count;
    
  }else{
    clearInterval(interval)
  }
},1000);



// timeer
// let count=document.querySelector("input");

// let btn=document.querySelector("button");

// let hi=document.querySelector("h1");

// btn.addEventListener("click",function(){
//   // console.log(count.value);
//   count.style.display="none";
//   // hi.style.display="initial";
//   btn.style.display="none";
// // })

// let interval=setInterval(function(){
// if(count.value >= 1){
//   count--;
//   hi.textContent=count.value;
//   console.log(count.value);
// }else{
//   clearInterval(interval)
// }},1000);


