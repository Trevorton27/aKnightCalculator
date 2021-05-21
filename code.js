const calculatorDisplay = document.querySelector('.calculator-display');
const clearButton = document.querySelector('.clear');
const equationSolver = document.querySelector('.equation-solver');
const decimalButton = document.querySelector('.decimal');
const numberButtons = document.querySelectorAll('.number');
const arithmeticOperatorButtons = document.querySelectorAll(
  '.arithmetic-operator'
);
const memoryButtons = document.querySelectorAll('.memory');

let firstOperand = '';
let secondOperand = '';
let arithmeticOperator = '';
let currentResult = 0;
let memoryValue = '';

// Functions
/* decimal check function */
const addDecimalToOperand = (operand) => {
  const operandArray = operand.split('');
  if (operandArray.indexOf('.') === -1) {
    operandArray.push('.');
  }
  return operandArray.join('');
};

/* arithmetic operation function */
const arithmeticOperationCalculator = (
  firstOperand,
  secondOperand,
  arithmeticOperator
) => {
  let arithmeticOperationResult = 0;
  firstOperand = parseFloat(firstOperand);
  secondOperand = parseFloat(secondOperand);
  switch (arithmeticOperator) {
    case '+':
      arithmeticOperationResult = firstOperand + secondOperand;
      break;
    case '-':
      arithmeticOperationResult = firstOperand - secondOperand;
      break;
    case '×':
      arithmeticOperationResult = firstOperand * secondOperand;
      break;
    case '÷':
      arithmeticOperationResult = firstOperand / secondOperand;
      break;
  }
  return arithmeticOperationResult;
};

// Event Listeners
clearButton.addEventListener('click', () => {
  // reset all values
  calculatorDisplay.textContent = 0;
  firstOperand = secondOperand = arithmeticOperator = '';
  currentResult = 0;
});

decimalButton.addEventListener('click', () => {
  if (!arithmeticOperator) {
    firstOperand = addDecimalToOperand(firstOperand);
    calculatorDisplay.textContent = firstOperand;
  } else if (firstOperand && arithmeticOperator) {
    secondOperand = addDecimalToOperand(secondOperand);
    calculatorDisplay.textContent = secondOperand;
  }
});

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener('click', (e) => {
    if (!arithmeticOperator) {
      firstOperand += e.target.textContent;
      calculatorDisplay.textContent = firstOperand;
    }
    if (firstOperand && arithmeticOperator) {
      secondOperand += e.target.textContent;
      calculatorDisplay.textContent = secondOperand;
    }
  });
});

arithmeticOperatorButtons.forEach((arithmeticOperatorButton) => {
  arithmeticOperatorButton.addEventListener('click', (e) => {
    if (firstOperand && secondOperand && arithmeticOperator) {
      // continuous operation feature
      currentResult = parseFloat(
        arithmeticOperationCalculator(
          firstOperand,
          secondOperand,
          arithmeticOperator
        ).toFixed(3)
      );
      calculatorDisplay.textContent = currentResult;
      firstOperand = currentResult.toString();
      arithmeticOperator = e.target.textContent;
      secondOperand = '';
    } else if (firstOperand) {
      arithmeticOperator = e.target.textContent;
    } else if (!firstOperand) {
      firstOperand = currentResult.toString(); // accounts for zero i.e. 7 - 7 = 0 - 7 = -7
      arithmeticOperator = e.target.textContent;
    }
  });
});

equationSolver.addEventListener('click', () => {
  if (firstOperand && secondOperand) {
    currentResult = parseFloat(
      arithmeticOperationCalculator(
        firstOperand,
        secondOperand,
        arithmeticOperator
      ).toFixed(3)
    );
    calculatorDisplay.textContent = currentResult;
    firstOperand = secondOperand = arithmeticOperator = '';
  }
});

memoryButtons.forEach((memoryButton) => {
  memoryButton.addEventListener('click', (e) => {
    let memoryButton = e.target.textContent;
    switch (memoryButton) {
      case 'm+':
        if (firstOperand) {
          memoryValue = calculatorDisplay.textContent;
        }
        break;
      case 'm-':
        memoryValue = '';
        break;
      case 'mr':
        if (!arithmeticOperator) {
          calculatorDisplay.value = memoryValue;
          firstOperand = memoryValue;
          console.log('memoryValue: ', memoryValue);
        } else if (arithmeticOperator && !secondOperand.value) {
          secondOperand = memoryValue;
          calculatorDisplay.value = memoryValue;
          console.log('memoryValue: ', memoryValue);
        }
        firstOperand = memoryValue;
        calculatorDisplay.textContent = memoryValue;
        break;
    }
  });
});

// Continuous Operation

// if firstOperand, secondOperand, and arithmetic operator exists then
