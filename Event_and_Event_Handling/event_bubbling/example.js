// let ul=document.querySelector("ul").addEventListener("click", function(){
//   alert("clicked")

// })


// let ul=document.querySelector("ul").addEventListener("click", function(e){
//   console.log(e.target)
// })



// let ul=document.querySelector("ul").addEventListener("click", function(e){
//   e.target.style.textDecoration="line-through"
// })

// let ul=document.querySelector("ul").addEventListener("click", function(e){
//   e.target.classList.add("lt");
// })

let ul=document.querySelector("ul").addEventListener("click", function(e){
  e.target.classList.toggle("lt");
})