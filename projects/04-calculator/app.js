// Get the display element
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

// Initialize variables to manage the state of the calculator
let currentInput = '0';
let previousInput = '';
let operator = null;

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const buttonContent = button.textContent;

        // Determine the action based on the button clicked
        if (!action) {
            handleNumber(buttonContent); // Handle number input
        } else if (action === 'clear') {
            clearDisplay(); // Clear the display and reset state
        } else if (action === 'equals') {
            calculate(); // Perform the calculation
        } else if (action === 'percent') {
            calculatePercentage(); // Calculate percentage
        } else if (buttonContent === '.') {
            addDecimal(); // Add decimal point
        } else {
            handleOperator(action); // Handle operator input
        }
    });
});

// Function to handle number inputs
function handleNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number; // Replace initial zero with the input number
    } else {
        currentInput += number; // Append the input number
    }
    updateDisplay(currentInput);
}

// Function to handle operator inputs
function handleOperator(selectedOperator) {
    if (operator !== null) {
        calculate(); // Calculate the result of the previous operation if there's an existing operator
    }
    operator = selectedOperator;
    previousInput = currentInput;
    currentInput = '';
}

// Function to perform calculations
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    // Perform the operation based on the selected operator
    switch (operator) {
        case 'add':
            result = prev + curr;
            break;
        case 'subtract':
            result = prev - curr;
            break;
        case 'multiply':
            result = prev * curr;
            break;
        case 'divide':
            result = curr !== 0 ? prev / curr : 'Error'; // Handle division by zero
            break;
        default:
            return;
    }

    currentInput = result.toString(); // Update the current input with the result
    operator = null; // Reset the operator
    previousInput = ''; // Clear the previous input
    updateDisplay(currentInput); // Update the display with the result
}

// Function to calculate percentages
function calculatePercentage() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }
}

// Function to clear the display and reset state
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay(currentInput);
}

// Function to add a decimal point
function addDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay(currentInput);
}

// Function to update the display
function updateDisplay(value) {
    display.textContent = value.length > 10 ? parseFloat(value).toPrecision(10) : value;
}

// Handle keyboard input for calculator operations
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        handleNumber(key); // Handle number and decimal point input
    } else if (key === 'Enter' || key === '=') {
        calculate(); // Perform calculation on Enter or equals key press
    } else if (key === 'Escape') {
        clearDisplay(); // Clear display on Escape key press
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperator(key === '+' ? 'add' : key === '-' ? 'subtract' : key === '*' ? 'multiply' : 'divide');
    } else if (key === '%') {
        calculatePercentage(); // Calculate percentage on '%' key press
    }
});
