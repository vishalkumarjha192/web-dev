// change
let u=document.querySelector("h3");
let v=document.querySelector("select");
addEventListener("change", function(e){
  console.log(e.target.value);
  u.innerText=`${e.target.value} is selected`;
});
