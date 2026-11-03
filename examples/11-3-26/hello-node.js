// Run this in a terminal, from this folder: node hello-node.js
// This is JavaScript running on your computer, not in a browser. There's
// no page (no document, no window), but Node can do something the browser
// can't: read and write files right on your computer.

// fs ("file system") comes built into Node. import is how we load it.
import fs from "fs";

// Read the whole file in as one big string. "utf8" means "give me text,
// not raw bytes." The path is relative to where you run node from.
let fileDataString = fs.readFileSync("./data/1886-boy-names.json", "utf8");

// The same JSON.parse from localStorage: turn the string into a real object
let fileData = JSON.parse(fileDataString);

// Pick 10 random names (repeats are possible, since each pick is independent)
let names = [];
for (let i = 0; i < 10; i++) {
    let rand = Math.floor(Math.random() * fileData.names.length);
    names.push(fileData.names[rand]);
}

// Save them to a new file. JSON.stringify turns the array back into a string;
// This creates the file if it doesn't exist, and replaces it if it does.
fs.writeFileSync("./data/random-10-names.json", JSON.stringify(names));

// the null, 3 makes it readable (3 spaces of indentation) instead of one long line.
// fs.writeFileSync("./data/random-10-names.json", JSON.stringify(names, null, 3));
