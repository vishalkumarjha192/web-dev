// Attribute manipulation :



// .setAttribute
let a=document.querySelector("a");
a.setAttribute("href","https://www.google.com")

let img=document.querySelector("img");
img.setAttribute("src","https://imgs.search.brave.com/tgAhft3wX3UkI8YTCPOt2SZx1ZUrFN5tx2dFkXrfnBs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM2/ODY0NjQzNS9waG90/by9kZXNpZ24tcHJv/ZmVzc2lvbmFscy13/b3JraW5nLXdpdGgt/cGhvdG9ncmFwaHMt/YW5kLWNvbG9yLXN3/YXRjaGVzLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz0yTU0t/Zk1feFYxNFhHclpD/MjdrX1dBNzhWamlO/OU9mV3l1cWI0eFFn/T1RBPQ")
""


// .getAttribute
let b=document.querySelector("a");
c=b.getAttribute("href");
console.log(c)

let d=document.querySelector("img").getAttribute("src");
console.log(d);



// .removeAttribute

let x=document.querySelector("a").removeAttribute("href");
console.log(x)  // give undefine