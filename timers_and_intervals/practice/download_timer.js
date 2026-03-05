let count =0 ;
let progress =document.querySelector(".progress-bar")
let perventText=document.querySelector(".percent");
let interval = setInterval(function(){
  if(count <=99){
    count++;
    progress.style.width =` ${count}%`
    perventText.textContent=` ${count}%`
  }else{
    document.querySelector("h2").textContent="Downloaded."
    clearInterval(interval)
  }
},100);