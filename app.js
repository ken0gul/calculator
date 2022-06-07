// Selecting Elements
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const button = document.querySelectorAll('button');
const equal = document.querySelector('.equal');
const ac = document.querySelector('.ac');


// Global Variables
let array = [];
let currentInput;
let result;
let currentOperation;
let displayValue = '';

// Creating calculation functions
// Add
function add(num1,num2) {
    return num1 + num2
}

// Subtract
function subtract (num1,num2) {
    return (num1 - num2);
}

//Multiply
function multiply(num1,num2) {
    return (num1 * num2);
}

// Divide 
function divide(num1,num2) {
    return (num1/num2);
}


// Creating `Operate` function
function operate(operator, num1,num2) {
    console.log(operator, num1, num2)
    if(operator === 'add') return add(num1,num2);
    if(operator === 'minus') return subtract(num1,num2)
    if(operator === 'multiply') return multiply(num1,num2)
    if(operator === 'divide') return divide(num1,num2)
 }

 // Creating populate function
 function populate() {
    numbers.forEach(number => {
        number.addEventListener('click', e => {
                
            currentInput = e.target.dataset.id;
            displayValue  += currentInput;
            displayValue = +displayValue;
            display.textContent = displayValue;

        })
    })
    return displayValue;
 }

 populate()
 

 // Creating operator buttons
 function calc() {

     button.forEach(button => {
         button.addEventListener('click', e=> {
              
                



            currentOperation = e.target.dataset.id;
            let operator;
                if(currentOperation === 'add') {
                     operator = '+';
                    }
                if (currentOperation === 'minus') {
                        operator = '-';
                    }
                    
                if (currentOperation === 'multiply') {
                        operator = '*';
                    }
                    
                if (currentOperation === 'divide') {
                        operator = '/';
                    }
                    display.textContent =  `${+displayValue} ${operator} `
                    array.push(displayValue);
                    // Reset display value to an empty string before moving on
                    displayValue =  '';
                
                    

                    

            })
        })
    }

    calc()


    // Equal operator
    equal.addEventListener('click' , (e) =>  {
        array.push(displayValue);

       
        let [num1, num2, ...num] = array;

        //More destructuring

        let result =operate(currentOperation, num1, num2)
        
        console.log(result)
        display.textContent = result;
        displayValue = result;
        console.log(`Array: ` + array)
        
        if(result) {
            // Reset array 
            array.length =0 ;   
            let numbers = [];
         for (let number of num ) {
            numbers.push(number);
            console.log(numbers)
            let [num1, num2, ...num] = numbers.slice(-2);
            result = operate(currentOperation, num1, num2);
            console.log(result)
            display.textContent = result;
            console.log('Array : ' + array);
            
            
         }
        }

        
    })

   
    // Reset Button 

    function resetCalc() {
        ac.addEventListener('click', () => {
            displayValue = '';
            display.textContent = '';
            array.length = 0;
            currentInput = "";
            result = "";
        })
    }
    resetCalc();