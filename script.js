// DOM Elements
const currentOperandElement = document.querySelector(".current-operand");
const previousOperandElement = document.querySelector(".previous-operand");
const errorMessageElement = document.querySelector(".error-message");

//Calculate state
let currentOperand = "0";
let previousOperand = "";
let operation = undefined;
let resetCurrentOperand = false;

//Basic math functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
};

// Operate function
const operate = (operator, a, b) => {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    default:
      return 0;
  }
};

// Update display
const updateDisplay = () => {
  currentOperandElement.textContent = currentOperand;
  if (operation !== null) {
    previousOperandElement.textContent = `${previousOperand} ${operation}`;
  } else {
    previousOperandElement.textContent = previousOperand;
  }
};

// Clear display
const clearDisplay = () => {
  currentOperand = "0";
  previousOperand = "";
  operation = undefined;
  resetCurrentOperand = false;
  errorMessageElement.textContent = "";
  updateDisplay();
};

// Delete last digit
const deleteDigit = () => {
  if (currentOperand.length === 1) {
    currentOperand = "0";
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }

  updateDisplay();
};

// Append number
const appendNumber = (number) => {
  // If current operand is 0 or reset flag is set, replace it
  if (currentOperand === "0" || resetCurrentOperand) {
    currentOperand = number;
    resetCurrentOperand = false;
  } else {
    // Prevent number from getting too long
    if (currentOperand.length < 12) {
      currentOperand += number;
    }
  }

  updateDisplay();
};

//Append decimal point
const appendDecimal = () => {
  if (resetCurrentOperand) {
    currentOperand = "0.";
    resetCurrentOperand = false;
  } else if (!currentOperand.includes(".")) {
    currentOperand += ".";
  }

  updateDisplay();
};

// Choose operation
const chooseOperation = (nextOperation) => {
  // If we already have an operation and numbers, calculate first
  if (previousOperand !== "" && !resetCurrentOperand) {
    calculate();
  }

  // If current operand is empty, use 0
  if (currentOperand === "") {
    currentOperand = "0";
  }

  previousOperand = currentOperand;
  operation = nextOperation;
  resetCurrentOperand = true;
  errorMessageElement.textContent = "";
  updateDisplay();
};

// Calculate result
const calculate = () => {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  //Check if we have both numbers and an operation
  if (isNaN(prev) || isNaN(current) || operation === undefined) return;

  try {
    computation = operate(operation, prev, current);

    // Round long decimals to avoid overflow
    if (!Number.isInteger(computation)) {
      computation = Math.round(computation * 100000000) / 100000000;
    }

    // Check for very large numbers
    if (computation.toString().length > 12) {
      computation = computation.toExponential(6);
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = "";
    resetCurrentOperand = true;
    errorMessageElement.textContent = "";
  } catch (error) {
    currentOperand = "0";
    previousOperand = "";
    operation = undefined;
    errorMessageElement.textContent = error.message;
  }

  updateDisplay();
};

// Event listeners for buttons
document.querySelectorAll("[data-number]").forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.getAttribute("data-number"));
  });
});
