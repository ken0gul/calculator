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
let otherArray = []
let newResult;

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
    if(operator === 'add') return add(num1,num2);
    if(operator === 'minus') return subtract(num1,num2)
    if(operator === 'multiply') return multiply(num1,num2)
    if(operator === 'divide') return divide(num1,num2)
 }

 // Creating populate function
 function populate() {
    numbers.forEach(number => {
        number.addEventListener('click', e => {
      
            // Return data-id of any number as a string when clicked
            currentInput = e.target.dataset.id;
           
         
            // Concatenate it to displayValue
            displayValue  += currentInput;
            // Convert displayValue to a number
            displayValue = +displayValue;
            console.log(displayValue)
            // Display it on the screen
                    display.textContent = displayValue;
            // Store it into otherArray to be able to calculate it immediately
            otherArray.push(displayValue);

            // Make the calculation with the first two numbers of otherArray
            let [num1, num2] = [...otherArray];
            // Store the output into newResult
            newResult = operate(currentOperation, num1, num2);
            console.log('New Result: ' + newResult)
        })
    })
    // Return displayValu to use it outside the function
    return displayValue;
 }

 populate()


 // Creating operator buttons
 function calc() {
    // Listen for click events when clicked any button that include math symbols
     button.forEach(button => {
         button.addEventListener('click', e=> {
            
            if(!currentInput) return; // Guard Clause to aviod clicking without any input
                // if click event's data-id equals to one of math symbols
                // assign them accordingly and store them into operator variable
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

                    // Display displayValue and math symbol like below
                    display.textContent =  `${displayValue} ${operator} `
                    // Push displayValue to our original array
                    array.push(displayValue);
                 
                    
                    
                    // Reset display value to an empty string before moving on
                    displayValue =  '';
                
                   
                    // If not pressed equal but want to calculate 
                    // Check if it is equal button
                    if(array.length > 1) {
                    if(e.target.dataset.id !== 'equal') {
                        displayValue = newResult;
                        display.textContent =  `${displayValue} ${operator} `
                        
                        array.push(displayValue);
                        array.length = 0;
                        otherArray.length = 0;
                        currentInput = '';
                   
                        }
                    }
                    })
        })
    }

    calc()


    // Equal operator
    // Creating equal function
    function calcEqual() {

        equal.addEventListener('click' , (e) =>  {
            array.push(displayValue);

       
            let [num1, num2, ...num] = array;
            
            //More destructuring
            
            let result =operate(currentOperation, num1, num2)
            
            display.textContent = result;
            displayValue = result;
            
            if(result) {
                
                // Reset array 
                array.length =0 ;   
                let numbers = [];
                for (let number of num ) {
                    numbers.push(number);
                    console.log(numbers)
            let [num1, num2, ...num] = numbers.slice(-2);
            result = operate(currentOperation, num1, num2);
            display.textContent = result;
            
            
        }

    }
    
    
})
return result;

}
calcEqual()


// Reset Button 

function resetCalc() {
        ac.addEventListener('click', () => {
            displayValue = '';
            display.textContent = '';
            array.length = 0;
            currentInput = "";
            result = "";
            otherArray.length = 0;
        })
    }
    resetCalc();