const API_KEY = "8ac5c4d57ba6a4b3dfcf622700447b1e";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDiv = document.getElementById("weatherDisplay");
const historyDiv = document.getElementById("historyContainer");
const consoleOutput = document.getElementById("consoleOutput");

searchBtn.addEventListener("click", getWeather);





// GET WEATHER


async function getWeather(){

const city = cityInput.value.trim();

if(city === ""){
weatherDiv.innerHTML = "<p>Please enter city name</p>";
return;
}

try{

logToConsole("Fetching weather data...");

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

const response = await fetch(url);

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

showWeather(data);

saveHistory(city);

logToConsole("Weather data loaded successfully");

}catch(error){

weatherDiv.innerHTML = `<p style="color:red">${error.message}</p>`;

logToConsole("Error: " + error.message);

}

}



// SHOW WEATHER


function showWeather(data){

weatherDiv.innerHTML = `
<h3>${data.name}, ${data.sys.country}</h3>

<p><strong>Temperature:</strong> ${data.main.temp}°C</p>

<p><strong>Weather:</strong> ${data.weather[0].main}</p>

<p><strong>Humidity:</strong> ${data.main.humidity}%</p>

<p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
`;

}


// LOCAL STORAGE


function saveHistory(city){

let history = JSON.parse(localStorage.getItem("history")) || [];

history = history.filter(c => c.toLowerCase() !== city.toLowerCase());

history.unshift(city);

history = history.slice(0,5);

localStorage.setItem("history",JSON.stringify(history));

showHistory();

}



// SHOW HISTORY


function showHistory(){

let history = JSON.parse(localStorage.getItem("history")) || [];

historyDiv.innerHTML = "";

history.forEach(city => {

let btn = document.createElement("button");

btn.className = "history-item";

btn.innerText = city;

btn.onclick = () => {

cityInput.value = city;

getWeather();

};

historyDiv.appendChild(btn);

});

}


// ENTER KEY SEARCH


cityInput.addEventListener("keypress",(e)=>{

if(e.key === "Enter"){
getWeather();
}

});






// CONSOLE LOGGER


function logToConsole(message) {

const log = document.createElement("div");

log.innerText = message;

consoleOutput.appendChild(log);

consoleOutput.scrollTop = consoleOutput.scrollHeight;

}


// EVENT LOOP DEMO


function demonstrateEventLoop() {

logToConsole("------ Event Loop Demo ------");

console.log("1. Synchronous code");

logToConsole("1️⃣ Sync Code");

setTimeout(() => {

console.log("2. setTimeout callback");

logToConsole("2️⃣ setTimeout (Task Queue)");

},0);

Promise.resolve().then(()=>{

console.log("3. Promise");

logToConsole("3️⃣ Promise.then (Microtask)");

});

console.log("4. More Sync Code");

logToConsole("4️⃣ More Sync Code");

}



// PAGE LOAD


window.addEventListener("DOMContentLoaded", () => {

logToConsole("App Loaded");

showHistory();

demonstrateEventLoop();

});