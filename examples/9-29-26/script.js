
// Plain function, called the normal way. Nothing to see here yet.
function sayHello() {
    console.log("Hello");
}

// sayHello with no parens is a value, so we can
// just stick it in another variable. renamedSayHello isn't a copy of the
// function, it's the same function, under a second name.
let renamedSayHello = sayHello;
renamedSayHello(); // it does exactly what sayHello() does

// A callback doesn't have to be for the "everything worked" case. This one
// is for when something goes wrong, repeat below calls it instead of fn
// once we've hit our limit.
function calledRepeatTooManyTimes(howManyTimes) {
    console.log("Called repeat too many times: " + howManyTimes);
}

// On purpose, this lives outside repeat and never resets. It keeps a
// running total across every single call to repeat, not just the current
// one, which is what makes the three calls below do something interesting.
let repeatedCount = 0;
function repeat(fn, count, error_fn) {
    for (let i = 0; i < count; i++) {
        // Before calling fn again, check whether we've already used up our
        // budget of 8 total calls, across every repeat() we've ever run.
        // If we have, call the error callback instead and get out of this
        // loop immediately with return.
        if (repeatedCount >= 8) {
            error_fn(repeatedCount)
            return;
        }
        fn();
        repeatedCount++;
    }
}

// Three calls, each one asking for 3 more rounds. Because repeatedCount is
// shared, it doesn't reset between these: call 1 takes it 0 to 3, call 2
// takes it 3 to 6. Call 3 is the one to watch, it only gets two more
// "Hello"s in before repeatedCount hits 8, and the third round calls
// calledRepeatTooManyTimes instead.
repeat(renamedSayHello, 3, calledRepeatTooManyTimes);
repeat(renamedSayHello, 3, calledRepeatTooManyTimes);
repeat(renamedSayHello, 3, calledRepeatTooManyTimes);



// Now that we've covered an abstract notion of callbacks from the ground
// up, let's revisit Button event listeners.
// Same thing as repeat and calledRepeatTooManyTimes above, just built
// into the browser instead of something we wrote ourselves. The browser
// calls this whenever a click happens and hands it one argument automatically,
// the event. event.target is the actual element that got clicked.
function myClickEventHandler(event) {
    console.log(event.target.innerHTML);
}

let rootDiv = document.querySelector("#root");
let btnEl = document.createElement("button");
btnEl.innerHTML = "CLICK";

rootDiv.append(btnEl);

// Handing over myClickEventHandler by name, no parens, same rule as handing
// renamedSayHello to repeat up above.
btnEl.addEventListener("click", myClickEventHandler);














