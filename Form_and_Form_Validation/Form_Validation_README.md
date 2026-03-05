# Form and Form Validation (JavaScript)

This project demonstrates basic **HTML Form Handling and Validation
using JavaScript**. It shows how to read form values and validate user
input such as **Email and Password** using **Regular Expressions
(Regex)**.

------------------------------------------------------------------------

## Features

-   Read form input values
-   Prevent default form submission
-   Email validation using Regex
-   Password validation using Regex
-   Display validation error messages
-   Simple login form UI

------------------------------------------------------------------------

## Technologies Used

-   HTML5
-   CSS3
-   JavaScript (Vanilla JS)

------------------------------------------------------------------------

## Project Structure

    Form_and_Form_Validation
    │
    ├── Reading_values
    │   ├── index.html
    │   └── form.js
    │
    ├── practice
    │   ├── email_password_valid.html
    │   └── email_password_valid.js

------------------------------------------------------------------------

## Email Validation Regex

``` javascript
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
```

Example: `example@gmail.com`

------------------------------------------------------------------------

## Password Validation Regex

``` javascript
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$%^&*])[A-Za-z\d!@$%^&*]{8,}$/
```

Password requirements:

-   At least 1 lowercase letter
-   At least 1 uppercase letter
-   At least 1 number
-   At least 1 special character
-   Minimum 8 characters

------------------------------------------------------------------------

## How to Run

1.  Download or clone the repository
2.  Open the project folder
3.  Open `index.html` in your browser
4.  Try entering email and password to test validation

------------------------------------------------------------------------

## Author

**Vishal Kumar Jha**

GitHub:\
https://github.com/vishalkumarjha192
