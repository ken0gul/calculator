// Selecting elements
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const acBtn = document.querySelector('[data-ac]');
const decimalPoint = document.querySelector('[data-decimal]');
const equal = document.querySelector('[data-equal]')

// Global Variables
let firstNumber = null;
let secondNumber = null;
let currentOperation;
let nextOperation;
let currentInput;
let result;
let isNextOperationComplete = false;

// Creating calculation functions
// Add
function add(num1,num2) {
    return num1 + num2
}

// Subtract
function subtract (num1,num2) {
    return num1 - num2;
}

//Multiply
function multiply(num1,num2) {
    return num1 * num2;
}

// Divide 
function divide(num1,num2) {
    return num1/num2;
}


// Creating `Operate` function
function operate(operator, num1,num2) {
    if(operator === 'add') return add(num1,num2);
    if(operator === 'minus') return subtract(num1,num2)
    if(operator === 'multiply') return multiply(num1,num2)
    if(operator === 'divide') return divide(num1,num2)
 }


// Numbers
numbers.forEach(number => {
    number.addEventListener('click', e=> { 
               // Display input
               currentInput = e.target.dataset.number;
               display.textContent += currentInput;
               
               
       
    })
})


// Decimal point
decimalPoint.addEventListener('click', () => {
    display.textContent += `${decimalPoint.innerText}`
})

// Operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', e => {
       
        // When there is no input firstNumber is null and we do not have any result
            if(firstNumber === null && !result) {

            currentOperation = e.target.dataset.operation;
            firstNumber = Number(display.textContent);
            display.textContent = "";
            
        } else if (firstNumber !== null && !result ) {
            secondNumber = Number(display.textContent)
            display.textContent = ''
        } else if (result){
            currentOperation = e.target.dataset.operation;
            firstNumber = Number(display.textContent);
            display.textContent = "";
           
        }

        if (firstNumber && secondNumber ) {
            if(!result && isNextOperationComplete === false) {
                firstNumber = operate(currentOperation, firstNumber, secondNumber);
                nextOperation = e.target.dataset.operation;
                isNextOperationComplete = true;
           
            }

            
        }

       

      

    })
})



// Equal button
equal.addEventListener('click', e => {
    secondNumber = Number(display.textContent)
    if (isNextOperationComplete === true) {
        result = operate(nextOperation, firstNumber, secondNumber);
        display.textContent = result;
        isNextOperationComplete = false;
        console.log("First Number : " ,firstNumber);
        console.log("Second Number: " ,secondNumber);
        console.log("Next Operation ", nextOperation)
        console.log("Current Operation ", currentOperation)
    } else {

        // Make the calculation
        result = operate(currentOperation, firstNumber, secondNumber);
        display.textContent = result;
        firstNumber = result;
        console.log("First Number : " ,firstNumber);
        console.log("Second Number: " ,secondNumber);
        console.log("Next Operation ", nextOperation)
    }

})


// Delete function
deleteBtn.addEventListener('click', () => {
    display.textContent = display.textContent.substring(0, display.textContent.length-1)

})

// AC 

acBtn.addEventListener('click', () => {
    display.textContent = "";
    firstNumber = null;
    secondNumber = null;
    currentOperation = ""
    nextOperation = ""
})