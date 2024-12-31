let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousValue = '';
let resultDisplayed = false;

function appendValue(value) {
  if (resultDisplayed) {
    // Reset the current input after a calculation if the user presses a number
    currentInput = '';
    resultDisplayed = false;
  }
  if (currentInput.length < 12) {
    currentInput += value;
    updateDisplay(currentInput);
  }
}

function appendOperator(op) {
  if (currentInput) {
    if (operator && previousValue) {
      // If there's already an operator, calculate the result first
      calculate();
    }
    previousValue = currentInput;
    currentInput = '';
    operator = op;
    updateDisplay(previousValue + ' ' + operator); // Show operator on screen
  } else if (previousValue) {
    // If no new number is entered but an operator is pressed, update the operator
    operator = op;
    updateDisplay(previousValue + ' ' + operator);
  }
}

function calculate() {
  if (previousValue && currentInput && operator) {
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        result = curr !== 0 ? prev / curr : 'Error';
        break;
      default:
        break;
    }

    currentInput = result.toString();
    previousValue = '';
    operator = '';
    resultDisplayed = true; // Mark result as displayed
    updateDisplay(currentInput);
  }
}

function clearDisplay() {
  currentInput = '';
  previousValue = '';
  operator = '';
  resultDisplayed = false;
  updateDisplay('0');
}

function updateDisplay(value) {
  display.textContent = value;
}
