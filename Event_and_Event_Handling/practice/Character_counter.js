let inp=document.querySelector("input");
let sp=document.querySelector("span");

// for character count

// inp.addEventListener("input",function(){

//   // console.log(inp.value.length);
//   sp.textContent= inp.value.length;
  
// })



// for limited cheracter enter

inp.addEventListener("input",function(){

  // console.log(inp.value.length);
  
  let left= 20-inp.value.length;
  if(left < 0){
    sp.textContent=left;
    sp.style.color="red";
  }else{
    sp.textContent=left;
    sp.style.color="black";
  }
  
})

