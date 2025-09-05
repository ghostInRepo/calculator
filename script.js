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
