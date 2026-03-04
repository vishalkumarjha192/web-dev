// let h1=document.createElement("h1");
// h1.textContent="Hello Vishal";
// console.log(h1);
// // document.body.append(h1)
// document.body.prepend(h1)


// createElement
let h1 = document.createElement("h1");
h1.textContent="i am vishal"




// appendElement
// after script tag use append
// append
// document.body.append(h1)

// for before script tag use prepend
// prepend
document.body.prepend(h1);

// remove
h1.remove()





// appendChild

let h2 = document.createElement("h2");
h2.textContent="inner text"
// document.body.prepend(h2);

let div=document.createElement("div");
div.textContent="Outter div";
document.body.prepend(div);

//child
document.querySelector("div").appendChild(h2)

// also child
// document.querySelector("div").prepend(h2)

// removeChild,

h2.remove()




