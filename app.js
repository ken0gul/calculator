// Selecting Elements
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const button = document.querySelectorAll('button');
const equal = document.querySelector('.equal');
// Global Variables
let array = [];
let object = {};
let currentInput;
let result;
let currentOperation;

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
    return num1 *num2;
}

// Divide 
function divide(num1,num2) {
    return num1/num2;
}


// Creating `Operate` function
function operate(operator, num1,num2) {
    console.log(operator, num1, num2)
    if(operator === 'add') return add(num1,num2);
    if(operator === 'subtract') return subtract(num1,num2)
    if(operator === 'multiply') return multiply(num1,num2)
    if(operator === 'divide') return divide(num1,num2)
 }

 // Creating populate function
 function populate() {
    numbers.forEach(number => {
        number.addEventListener('click', e => {
                if(array.length < 2) {
                    
                    currentInput = Number(e.target.dataset.id);
                    
                    display.textContent += currentInput;
                }

        })
    })
    return currentInput;
 }

 populate()

 // Creating operator buttons
 function calc() {

     button.forEach(button => {
         button.addEventListener('click', e=> {
             currentOperation = e.target.dataset.id
             
             currentInput = Number(display.textContent)
             display.textContent = "";
             array.push(currentInput);
            })
        })
    }

    calc()

    // Equal operator
    equal.addEventListener('click' , () =>  {
        array.push(currentInput);
        let [num1, num2] = array;
        let result =operate(currentOperation, num1, num2)
        display.textContent = result;
       
    })