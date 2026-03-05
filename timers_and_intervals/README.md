# ⏱️ Timers and Intervals (JavaScript)

This project demonstrates how JavaScript timers work using `setTimeout()` and `setInterval()`.
It includes simple examples and a small download progress UI to practice how timers are used in real applications.

Timers are commonly used in:
- Countdown timers
- Loading animations
- Progress bars
- Delayed execution
- Auto refresh features

-------------------------------------------------------------------------------------------------
## 🛠 Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)

-------------------------------------------------------------------------------------------------

## 📚 Concepts Covered

### 1️⃣ `setTimeout()`
Runs a function **once** after a specified delay.

```js
setTimeout(function() {
  console.log("Hello after 2 seconds");
}, 2000);
```

-------------------------------------------------------------------------------------------------

### 2️⃣ `clearTimeout()`
Stops a timeout before it executes.

```js
let tm = setTimeout(function() {
  console.log("Hello after 2 seconds");
}, 2000);

clearTimeout(tm);
```

-------------------------------------------------------------------------------------------------

### 3️⃣ `setInterval()`
Runs a function **repeatedly** after a fixed time interval.

```js
setInterval(function() {
  console.log("Run every 1 second");
}, 1000);
```

-------------------------------------------------------------------------------------------------

### 4️⃣ `clearInterval()`
Stops a running interval.

```js
let interval = setInterval(function() {
  console.log("Running...");
}, 1000);

clearInterval(interval);
```

-------------------------------------------------------------------------------------------------

## 💻 Practice Examples

### 1. Countdown Timer
A simple countdown timer that decreases every second using `setInterval()`.

```js
let count = 10;

let interval = setInterval(function() {
  if (count >= 1) {
    console.log(count);
    count--;
  } else {
    clearInterval(interval);
  }
}, 1000);
```

-------------------------------------------------------------------------------------------------

### 2. Input Based Timer
User enters a number and the timer counts down from it.

**Concepts used:**
- `querySelector()`
- Event Listener
- DOM manipulation
- `setInterval()`

-------------------------------------------------------------------------------------------------

### 3. Download Progress Timer
A download progress bar UI that increases percentage using JavaScript timers.

**Features:**
- Animated progress bar
- Percentage counter
- Auto stop at 100%
- Status change to `Downloaded`

```js
let count = 0;

let interval = setInterval(function() {
  if (count <= 99) {
    count++;
  } else {
    clearInterval(interval);
  }
}, 100);
```

-------------------------------------------------------------------------------------------------

## 📂 Project Structure

```
timers_and_intervals
│
├── index.html
├── script.js
│
├── time.html
├── time.js
│
└── practice
    │
    ├── download_timer.html
    └── download_timer.js
```

-------------------------------------------------------------------------------------------------

## ▶️ How to Run

1. Download and Clone the repository
2. Open the project folder.
3. Run any `.html` file in your browser.
4. Open **Developer Tools** (`F12`) to see console output.

-------------------------------------------------------------------------------------------------

## 🎯 Learning Outcome

After completing this project you will understand:

- How JavaScript timers work
- Difference between `setTimeout()` and `setInterval()`
- How to stop timers using `clearTimeout()` and `clearInterval()`
- How to build simple timer-based UI features
- How to update the DOM using timers

-------------------------------------------------------------------------------------------------

## 👨‍💻 Author

**Vishal Kumar Jha**  
GitHub: [vishalkumarjha192](https://github.com/vishalkumarjha192)
