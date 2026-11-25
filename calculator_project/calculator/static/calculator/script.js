const display = document.getElementById("display");

let currentInput = "0";
let previousInput = null;
let operator = null;
let resetScreen = false;

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {
    if (resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else {
        currentInput = currentInput === "0"
            ? number
            : currentInput + number;
    }

    updateDisplay();
}

function appendDecimal() {
    if (resetScreen) {
        currentInput = "0";
        resetScreen = false;
    }

    if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

function chooseOperator(op) {
    if (operator !== null && !resetScreen) {
        calculate();
    }

    previousInput = parseFloat(currentInput);
    operator = op;
    resetScreen = true;
}

function calculate() {
    if (operator === null || previousInput === null) {
        return;
    }

    const secondInput = parseFloat(currentInput);
    let result;

    switch (operator) {

        case "+":
            result = previousInput + secondInput;
            break;

        case "-":
            result = previousInput - secondInput;
            break;

        case "*":
            result = previousInput * secondInput;
            break;

        case "/":
            if (secondInput === 0) {
                currentInput = "Cannot divide by zero";
                previousInput = null;
                operator = null;
                resetScreen = true;
                updateDisplay();
                return;
            }

            result = previousInput / secondInput;
            break;

        case "%":
            result = previousInput % secondInput;
            break;
    }

    currentInput = String(Number(result.toPrecision(12)));

    previousInput = null;
    operator = null;
    resetScreen = true;

    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    previousInput = null;
    operator = null;
    resetScreen = false;

    updateDisplay();
}

function deleteLast() {
    if (resetScreen) {
        return;
    }

    currentInput = currentInput.length > 1
        ? currentInput.slice(0, -1)
        : "0";

    updateDisplay();
}

function toggleSign() {
    if (currentInput === "0") {
        return;
    }

    currentInput = String(-parseFloat(currentInput));

    updateDisplay();
}