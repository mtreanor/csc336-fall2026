// FUNCTIONS: from the function keyword down to a one-line arrow

// 1. A "normal" function definition
function getExcited1(str) {
    return str + "!!!";
}
console.log("1. " + getExcited1("Hello"));

// 2. Function as "variable". The function has no name of its own, it's a
// value stored in a variable, the same way a number or string would be.
let getExcited2 = function(str) {
    return str + "!!!";
}
console.log("2. " + getExcited2("Hello"));

// 2.5. Same thing on one line. Line breaks don't matter to JavaScript.
let getExcited2_5 = function(str) { return str + "!!!" };
console.log("2.5 " + getExcited2_5("Hello"));

// 3. Arrow function. Drop the word function, add => after the parameters.
let getExcited3 = (str) => { return str + "!!!" };
console.log("3. " + getExcited3("Hello"));

// 3.5. Minimized arrow function (one argument, one line of code).
// One parameter means the parentheses are optional. One expression means
// the braces and return are optional too: whatever is after => gets returned.
let getExcited3_5 = str => str + "!!!";
console.log("3.5 " + getExcited3_5("Hello"));


// EVENT LISTENERS: same ideas, but now the browser calls the function.
// One button per version, so you can click each and watch the console.

let rootDiv = document.querySelector("#root");

// Makes a button with some text and puts it on the page. Each version below
// uses it and then attaches its own listener to the button it hands back.
function makeButton(text) {
    let button = document.createElement("button");
    button.innerHTML = text;
    rootDiv.append(button);
    return button;
}

// 1. Named function, handed to addEventListener by name (no parentheses:
// we're handing the function over, not calling it).
let button1 = makeButton("1. Named function");
function clicked() {
    console.log("CLICKED 1");
}
button1.addEventListener("click", clicked);

// 2.5. Function stored in a variable, handed over the same way.
let button2_5 = makeButton("2.5. Function in a variable");
let clicked2_5 = function() { console.log("CLICKED 2.5"); }
button2_5.addEventListener("click", clicked2_5);

// 3. Anonymous function, written right where it's handed over.
// No name and no variable: addEventListener is the only thing that has it.
let button3 = makeButton("3. Anonymous function");
button3.addEventListener("click", function() { console.log("CLICKED 3"); });

// 3. Anonymous arrow function. The browser always passes in an event, we
// just aren't using it here.
let button3_arrow = makeButton("3. Anonymous arrow function");
button3_arrow.addEventListener("click", (event) => { console.log("CLICKED 3 (arrow)") });

// 3.5. Minimized arrow function (one argument, one line of code).
let button3_5 = makeButton("3.5. Minimized arrow function");
button3_5.addEventListener("click", e => console.log("CLICKED 3.5"));

// When you want to do more than one line of code, the braces come back.
// This one changes its own text to a random number from 0 to 4.
let buttonMultiLine = makeButton("More than one line");
buttonMultiLine.addEventListener("click", e => {
    // This is the code body of the event handler
    let rand = Math.floor(Math.random() * 5);
    buttonMultiLine.innerHTML = rand;
});


// SORT: sort calls our function with two items, a and b, and uses what it
// returns to decide their order. 
// 
// Long version, spelled out with if/else. Gets its own array so you can
// see it work before the short version below sorts numbers.
let moreNumbers = [10, 4, 6, 7, 3, -1];
moreNumbers.sort((a, b) => {
    if (a > b) {
        return 1;
    } else if (b > a) {
        return -1;
    }
    return 0;
});
console.log("sorted (long version): " + moreNumbers);

// Short "clever" version. a - b is negative when a is smaller, positive when a is
// bigger, and 0 when they're equal, exactly what the long version returns.
let numbers = [10, 4, 6, 7, 3, -1];
console.log("before sort: " + numbers);
numbers.sort((a, b) => a - b);
console.log("sorted (short version): " + numbers);


// MAP: calls our function once per element and builds a new array out of
// whatever it returns. The original array is left alone.

let doubledNumbers1 = numbers.map(function(element) {
    return element * 2
});
console.log("doubled (function): " + doubledNumbers1);

let doubledNumbers2 = numbers.map(element => element * 2);
console.log("doubled (arrow): " + doubledNumbers2);

// map also hands our function a second argument, the index, if we ask for it.
let scaledByIndexNumbers = numbers.map((element, index) => element * index);
console.log("scaled by index: " + scaledByIndexNumbers);


// FOUR WAYS TO LOOP THROUGH AN ARRAY: all four print the same thing.

// 1. while loop
console.log("1. while loop");
let i = 0;
while (i < numbers.length) {
    let number = numbers[i];
    console.log(number);
    i++;
}

// 2. for loop (convenient so you don't forget to bump the iterator variable)
console.log("2. for loop");
for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    console.log(number);
}

// 3. for...of
console.log("3. for...of");
for (let number of numbers) {
    console.log(number);
}

// 4. Array function. forEach doesn't return anything, it just calls our
// function once per element.
console.log("4. forEach");
numbers.forEach(element => console.log(element));
numbers.forEach((element, index) => console.log("numbers[" + index + "] = " + element));
