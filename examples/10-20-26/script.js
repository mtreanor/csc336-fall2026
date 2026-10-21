// A CLASS is a blueprint for making objects. MyArray "wraps" a regular
// array: the real array lives inside each MyArray object, and the methods
// below are how the rest of our code works with it.
class MyArray {
    // Initialize variables in the constructor
    // constructor runs once, when we say new MyArray(). "this" is the
    // brand-new object being built, so this.array gives THAT object its
    // own array.
    constructor() {
        this.array = [];
    }

    // Inside a method, "this" is the object before the dot.
    // For arr.push(4), this is arr, so this.array is arr's array.
    push(val) {
        this.array.push(val);
    }

    get(index) {
        return this.array[index];
    }

    // fn is a callback: whoever calls forEach hands us a function, and we
    // call it once for every element. That's all forEach really is.
    forEach(fn) {
        for (let i = 0; i < this.array.length; i += 1) {
            fn(this.array[i]);
        }
    }

    // filter keeps the elements where the callback returns true.
    // It builds a NEW array and leaves this.array alone.
    filter(functionToRunOnEachElementOfArray) {
        let arrayOfElementsThatSatisfyGivenFunction = [];
        // for...of hands us each element directly, no index needed
        for (let element of this.array) {
            if(functionToRunOnEachElementOfArray(element)) {
                arrayOfElementsThatSatisfyGivenFunction.push(element);
            }
        }
        return arrayOfElementsThatSatisfyGivenFunction;
    }

    // map builds a NEW array out of whatever the callback returns for
    // each element. Same length as the original, different values.
    // (filter and map hand back plain arrays here, not MyArrays.)
    map(fn) {
        let newArray = [];
        for (let element of this.array) {
            newArray.push(fn(element));
        }
        return newArray;
    }
}

document.addEventListener("DOMContentLoaded", () => {

    // new makes one MyArray object from the blueprint
    let arr = new MyArray();
    arr.push(4);
    arr.push(-1);
    arr.push(9);
    arr.push(2);

    // let mapExample = arr.map( e => e * 2 );
    // ** is "to the power of", so e ** 2 squares each element
    let mapExample = arr.map( (e) => {
        let newValue = e ** 2;
        return newValue;
    });
    console.log(mapExample); // [16, 1, 81, 4]


    // Should be [4, 9, 2]. Try console.log(greaterThenOneArray) to check.
    let greaterThenOneArray = arr.filter((currentElement) => {
        if (currentElement > 1) {
            return true;
        }
        return false;
    });

    // Our forEach calls this arrow function once per element
    arr.forEach((current) => {
        console.log(current);
    });

});
