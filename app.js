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
let array = [];
let newResult;
let operator;


// Keyboard Support
// Works only for numbers not operation Buttons
window.addEventListener('keydown' , e=> {
    currentInput = e.key;
    if(currentInput === "Escape" || currentInput === "Shift" || currentInput === "Control" || currentInput === 'Alt') return;
    if (currentInput === 'F1' || currentInput === 'F2' || currentInput === 'F3' || currentInput === 'F4' || currentInput === 'F5' || currentInput === 'F6' || currentInput === 'F7' || currentInput === "F8" || currentInput === "F9" || currentInput === "F10" || currentInput === "F11" || currentInput === "F12") return;

    if(currentInput === "Backspace") {
        display.textContent = display.textContent.substring(0, display.textContent.length-1)
        return;
    }
    if(currentInput === "=") return;
    display.textContent += currentInput;
   

})


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


 // Create a function for all calculations
 function calcAll (e) {
    // When there is no input firstNumber is null and we do not have any result of any calculation
    
    if(firstNumber === null && !result) {

        currentOperation = e.target.dataset.operation;
        firstNumber = Number(display.textContent);
        console.log("1- We set firstNumber and currentOperation for the first time here")
        // Clear the display after every operation
        display.textContent = "";
        

        } else if (firstNumber !== null && !result ) {
            // Here we have the firstNumber but no calculation made yet so we set secondNumber
            // After that it takes firstNumber and secondNumber and make a calculation down there where we have firstNumber && secondNumber 
            secondNumber = Number(display.textContent)
            // Then clear the display again
            console.log("2- Set the secondNumber")
            display.textContent = ''
        } else if (result){
            currentOperation = e.target.dataset.operation;
            firstNumber = Number(display.textContent);
            display.textContent = "";
        
        }
        
        // After we set the secondNumber in the step 2, we make calculation based on these 2 numbers below
        if (firstNumber && secondNumber ) {
            if(!result && isNextOperationComplete === false) {
            newResult = operate(currentOperation, firstNumber, secondNumber);
            console.log("3- Here we have newResult from the calculation of firstNumber and secondNumber we got in step 2")

            // Then we set firstNumber to newResult so that we can use this result for the next operation as firstNumber.
            firstNumber = newResult;

            // we set nextOperation because we cannot use currentOperation since it belongs to the previous one.
            nextOperation = e.target.dataset.operation;

            // We had a calculation and an operation is made without using "=" key. so we set isNextOperationComplete to true which was false by default.
            isNextOperationComplete = true;

            
        
           
        }

        else if(firstNumber === newResult) {
            currentOperation = e.target.dataset.operation;
            console.log('currentOperation : ', currentOperation);
            console.log('nextOperation: ', nextOperation);
            console.log('firstNumber: ', firstNumber);
            // the else if in step 2 fires here because we set the secondNumber using display.textContent again
            // And we already had set first number getting the newResult and they were equal so we use that firstNumber and secondNumber to get a new
            // firstNumber and we got the secondNumber from step 2 so we have a new operation here and set the isNextOperationComplete to false because we set it to true
            // in the previous operation
            console.log('secondNumber: ', secondNumber);
            firstNumber =operate(nextOperation, firstNumber,secondNumber);
            isNextOperationComplete = false;
        }

        
    }
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
    if(display.textContent.includes('.')) return; // Guard Clause to prevent adding more than one decimal point
    display.textContent += `${decimalPoint.innerText}`
})

// Operation buttons
operationButtons.forEach(button => {
    // Add an event listener to each button and call calcAll function on them
    button.addEventListener('click', calcAll)
})



// Equal button
function calcEqual() {

    equal.addEventListener('click', e => {
        secondNumber = Number(display.textContent)
    if (isNextOperationComplete === true) {
        result = operate(nextOperation, firstNumber, secondNumber);
       
        // Check if the result is an integer. If it is no decimal, if not add 1 decimal
         display.textContent = Number.isInteger(result) ? result : result.toFixed(1);
        
        isNextOperationComplete = false;
        
        
    } else {

        // Make the calculation
        result = operate(currentOperation, firstNumber, secondNumber);
        
        // Check if the result is an integer. If it is no decimal, if not add 1 decimal
        display.textContent = Number.isInteger(result) ? result : result.toFixed(1);

        
        if(display.textContent.includes('Infinity') || display.textContent.includes('NaN')) {
            display.textContent = "Sorry that's invalid"
            setTimeout(()=> alert('Press AC to start over'),1000);
            setTimeout(cleanAll, 3000);
        }
        firstNumber = result
        
    }

})
}

calcEqual();


// Delete function
deleteBtn.addEventListener('click', () => {
    display.textContent = display.textContent.substring(0, display.textContent.length-1)

})

// AC => use cleanAll callback function
function allClear() {

    acBtn.addEventListener('click', cleanAll);
}

allClear();

// Clean everything
function cleanAll () {
        display.textContent = "";
        firstNumber = null;
        secondNumber = null;
        currentOperation = ""
        nextOperation = ""
        currentInput = ""
        result = ""
        isNextOperationComplete = false;
}