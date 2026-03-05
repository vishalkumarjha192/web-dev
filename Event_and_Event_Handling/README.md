# 📌 Event and Event Handling in JavaScript

A beginner-friendly collection of examples demonstrating **JavaScript
DOM Events**, **Event Handling**, **Event Bubbling**, **Event
Capturing**, and **Event Delegation**.

This project contains multiple small examples to understand how
different browser events work and how to handle them using JavaScript.

------------------------------------------------------------------------

# 📂 Project Structure

    Event_and_Event_Handling
    │
    ├── common_event
    │   ├── change_event
    │   ├── click_event
    │   ├── input_event
    │   ├── key_event
    │   ├── mouse_event
    │   └── submit_event
    │
    ├── event_bubbling
    │   ├── bubbling_example
    │   ├── capturing_example
    │   └── event_delegation_example
    │
    └── practice
        └── character_counter

------------------------------------------------------------------------

# ⚡ Topics Covered

### 1️⃣ Change Event

Triggered when the value of an input element changes.

Example: - Selecting a name from a dropdown - Displaying the selected
value dynamically

Features: - `change` event - `event.target.value` - Updating DOM text

------------------------------------------------------------------------

### 2️⃣ Click Event

Triggered when a user clicks on an element.

Example: - Custom file upload button - Clicking button opens file input

Concepts: - `click` event - Trigger hidden file input - Display selected
file name

------------------------------------------------------------------------

### 3️⃣ Input Event

Triggered whenever the value of an input field changes.

Example: - Real-time logging of typed text

Concepts: - `input` event - Live input tracking

------------------------------------------------------------------------

### 4️⃣ Keyboard Events

Detect keyboard actions using: - `keydown` - `keyup`

Example:

``` javascript
window.addEventListener("keydown", function(e){
  console.log(e.key);
});
```

------------------------------------------------------------------------

### 5️⃣ Mouse Events

Examples: - `mouseover` - `mouseout` - `mousemove`

Features: - Change color on hover - Move element based on mouse position

------------------------------------------------------------------------

### 6️⃣ Form Submit Event

Prevent default form submission and dynamically create a profile card.

Concepts: - `submit` event - `event.preventDefault()` - DOM element
creation

------------------------------------------------------------------------

# 🔄 Event Propagation

JavaScript events propagate in two phases.

## Event Bubbling

Events travel from **child → parent**

Example order:

    Button → Div C → Div B → Div A

Example code:

``` javascript
btn.addEventListener("click", function(){
  console.log("button clicked");
});
```

------------------------------------------------------------------------

## Event Capturing

Events travel from **parent → child**

Example order:

    Div A → Div B → Div C → Button

Enable capturing:

``` javascript
element.addEventListener("click", handler, true);
```

------------------------------------------------------------------------

# 🎯 Event Delegation

Handling events using a **parent element** instead of multiple child
elements.

Example:

``` javascript
document.querySelector("ul").addEventListener("click", function(e){
  e.target.classList.toggle("lt");
});
```

Advantages: - Better performance - Less code - Handles dynamically added
elements

------------------------------------------------------------------------

# 🧪 Practice Project

## Live Character Counter

A small project that counts remaining characters in an input field.

Features: - Live character tracking - Input length restriction - Color
change when limit exceeded

Example:

``` javascript
let left = 20 - inp.value.length;
```

------------------------------------------------------------------------

# 🛠 Technologies Used

-   HTML5
-   CSS3
-   JavaScript (DOM)


# 👨‍💻 Author

**Vishal Kumar Jha**
GitHub: https://github.com/vishalkumarjha192
