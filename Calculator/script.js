const display = document.querySelector('.calculator-display');
const keys = document.querySelector('.calculator-keys');

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

// Function to perform the calculation
function calculate(n1, op, n2) {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);

    // Use if-else statements for operations
    if (op === 'add') return num1 + num2;
    if (op === 'subtract') return num1 - num2;
    if (op === 'multiply') return num1 * num2;
    if (op === 'divide') return num1 / num2;

    return num2; // Fallback
}

// Event Listener for all button clicks
keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.value;

    if (action === 'number' || action === 'decimal') {
        if (waitingForSecondValue) {
            display.value = keyContent;
            waitingForSecondValue = false;
        } else {
            // Prevent multiple leading zeros, allow decimal
            display.value = displayedNum === '0' && keyContent !== '.' 
                ? keyContent 
                : displayedNum + keyContent;
        }
    }

    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        // If an operator is pressed, store the current display value and the operator
        if (firstValue && operator && !waitingForSecondValue) {
            // If another operator is pressed after the first calculation, calculate the result first
            const result = calculate(firstValue, operator, displayedNum);
            display.value = result;
            firstValue = result;
        } else {
            firstValue = displayedNum;
        }
        operator = action;
        waitingForSecondValue = true;
    }

    if (action === 'calculate') {
        // Only calculate if a first value and operator exist
        if (firstValue && operator) {
            display.value = calculate(firstValue, operator, displayedNum);
            // Reset for the next calculation
            firstValue = null;
            operator = null;
            waitingForSecondValue = true;
        }
    }

    if (action === 'clear') {
        // Reset all internal state
        display.value = '0';
        firstValue = null;
        operator = null;
        waitingForSecondValue = false;
    }
});