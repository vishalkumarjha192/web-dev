// console.log("hello");

//1s = 1000 milisecond

// setTimeout
// setTimeout run only one time after given time.
let tm=setTimeout( function(){
  console.log("Hello after 2 second");
},2000);


// clearTimeout
clearTimeout(tm);

// setInterval
// setTnterval run every given time intrtval.
let it=setInterval( function(){
  console.log("Run every 1 second");
},1000);

// clearInterval
clearInterval(it);


