// mouseover
let abcd=document.querySelector(".abcd");
abcd.addEventListener("mouseover",function(){
  abcd.style.backgroundColor="yellow";
})
// mouseout
abcd.addEventListener("mouseout",function(){
  abcd.style.backgroundColor="red";
})

// mousemove
window.addEventListener("mousemove",function(e){
  // console.log(e)
  abcd.style.top=e.clientY + "px";
  abcd.style.left=e.clientX + "px";
})