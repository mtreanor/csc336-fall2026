import express from "express";

const app = express();
const port = 3000;

// Every food anyone sends us. This lives in a variable, so it is
// shared by every request, but restarting the server empties it.
let foods = [];

// Serve everything in the public folder (index.html, script.js)
app.use(express.static("public"));

// Without this line, req.body is undefined. It tells Express:
// "when a request's body is labeled as JSON, turn it into an object for me."
app.use(express.json());

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

// res.json sends a JavaScript object back as JSON
// (and sets the Content-Type header to application/json for us).
// On the front end, response.json() turns it back into an object.
app.get("/demo", (req, res) => {
    console.log("DEMO REQUEST ON SERVER");

    let jsonObj = {
        message: "THIS IS FROM THE SERVER"
    }
    res.json(jsonObj);
});

// Query parameters: the part of the URL after the ?
// Visit http://localhost:3000/food?food=burrito&user=Mike
// Express splits it up into an object for us:
//   req.query = { food: "burrito", user: "Mike" }
// A parameter that isn't in the URL comes back as undefined.
app.get("/food", (req, res) => {
    let foodFromURL = req.query.food;
    let userFromURL = req.query.user;
    foods.push(foodFromURL + " " + userFromURL);
    console.log(foods);

    // Notice we never call res.send or res.json here, so the browser
    // keeps waiting for an answer that never comes.
});

// The same path can have a GET route AND a POST route. They are different routes.
// POST: the browser is SENDING us something, in the request's body
// instead of the URL. express.json() above turned that body into an object.
app.post("/food", (req, res) => {
    console.log(req.body);

    // Again, no response yet. Try adding: res.json(req.body);
});
