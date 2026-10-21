// map over an ARRAY OF OBJECTS, the shape most real data comes in
// (products in A4/A5, and soon data from fetch).
document.addEventListener("DOMContentLoaded", () => {

    let data = [
        {
            name: "MIke"
        },
        {
            name: "BUddY"
        }
    ];

    let lowerCasedData = data.map( (obj) => {
        obj.name = obj.name.toLowerCase();
        return obj;
    });
    // NOTE: The above modifies the source data (which is *probably*
    // not what you want). The reason is because obj is a reference to
    // an object, and we are directly modifying it with
    // obj.name = obj.name.toLowerCase().
    //
    // map gave us a new ARRAY, but the objects inside it are the same
    // objects that are in data, not copies.
    //
    // Here's how you do it while just "extracting"
    // what you care about from a list of objects.
    let lowerCaseData = data.map( (obj) => {
        return obj.name.toLowerCase();
    });

    // Below is the equivalent using a minified arrow function syntax
    // let lowerCaseData = data.map( obj => obj.name.toLowerCase());

    console.log(lowerCaseData); // ["mike", "buddy"]
    console.log("Data: ");
    // Already lowercase: the first map above changed the originals
    console.log(data);


});
