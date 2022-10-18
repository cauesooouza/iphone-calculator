function timeDisplay() {
    let timeDisplay = document.querySelector('.time');
    let currentTime = new Date();
    timeDisplay.innerHTML =
        `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`
};

timeDisplay();
setInterval(timeDisplay, 30000);

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('[data-number]');
const actionButtons = document.querySelectorAll('[data-action]');

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let result = 0;

function getFirstValue(e) {
    display.innerHTML = "";
    firstValue += e;
    display.innerHTML += firstValue;
}

function getSecondValue(e) {
    if (firstValue != "" && sign != "") {
        secondValue += e;
        display.innerHTML = secondValue;
        secondValue = +secondValue;
    }
}

function checkResult() {
    let textResult = result.toString();
    if (textResult.length >= 8) {
        result = result.toFixed(2);
        display.innerHTML = result
    }
}

numberButtons.forEach(number => number.addEventListener('click', (e) => {
    let value = e.target.textContent;
    if (isFirstValue == false) {
        getFirstValue(value)
    } else if (isSecondValue == false) {
        getSecondValue(value);
    }
}));

actionButtons.forEach(action => action.addEventListener('click', (e) => {
    if (e.target.textContent != '=') {
        if (e.target.textContent == "+") {
            sign = "+"
            isFirstValue = true;
        } else if (e.target.textContent == "-") {
            sign = "-"
            isFirstValue = true;

        } else if (e.target.textContent == "x") {
            sign = "x"
            isFirstValue = true;

        } else if (e.target.textContent == "÷") {
            sign = "÷"
            isFirstValue = true;
        } else if (e.target.textContent == "%") {
            sign = "%"
            isFirstValue = true;
        }
    } else if (e.target.textContent == '=') {
        if (isFirstValue && secondValue) {
            firstValue = Number(firstValue);
            secondValue = Number(secondValue);
            display.innerHTML = "";
            if (sign == "+") {
                result = firstValue + secondValue;
            } else if (sign == "-") {
                result = firstValue - secondValue;
            } else if (sign == "x") {
                result = firstValue * secondValue;
            } else if (sign == "÷") {
                result = firstValue / secondValue;
            } else if (sign == "%") {
                result = firstValue / 100 * secondValue;
            }
            display.innerHTML = result;
            firstValue = result;
            secondValue = "";
            checkResult()
        }
    }
    if (e.target.textContent == "+/-") {
        display.innerHTML = "";
        if (firstValue != "") {
            result = -firstValue;
            firstValue = result;
        } else if (firstValue != "" && secondValue != "" && sign != "") {
            result = -result;
        }
        display.innerHTML = result;
    }
    if (e.target.textContent == 'AC') {
        display.innerHTML = "0"
        firstValue = "";
        isFirstValue = false;
        secondValue = "";
        isSecondValue = false;
    }
    if (e.target.textContent == '.') {
        if (firstValue == "" || firstValue != "" && !firstValue.includes('.') &&  secondValue == "") {
            firstValue += '.'
            display.innerHTML = firstValue;
        } else if (firstValue != "") {
            secondValue += '.'
            display.innerHTML = secondValue;
        }
    }
}))

