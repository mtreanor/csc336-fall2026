// Run this with: node server.js (after npm install)
// Then visit http://localhost:3000
// The same server as 2-http-routes, rewritten with Express, plus PUT and DELETE.

// Express is someone else's code (like p5 was), but we get it with
// "npm install express" instead of a <script> tag.
import express from "express";

let app = express();
let port = 3000;

let team = [
    { name: "pikachu", type: "electric", hp: 35 },
    { name: "snorlax", type: "normal", hp: 160 },
    { name: "jolteon", type: "electric", hp: 65 },
    { name: "bulbasaur", type: "grass", hp: 45 }
];

// Replaces the "read index.html and send it" if statement. Any file in
// public/ gets sent as-is, script.js included, with the right Content-Type.
app.use(express.static("public"));

// Replaces collecting the chunks and JSON.parse. Turns JSON the browser
// sends into an object in req.body. Without this, req.body is undefined.
app.use(express.json());


// A route: "when a GET request for /api/team comes in, run this function."
// No if statements: Express checks the method and URL for us.
app.get("/api/team", (req, res) => {
    console.log("GET the team");

    // res.json stringifies and sets the Content-Type header for us
    res.json(team);
});


// POST (create): same URL as the GET above, different method.
app.post("/api/team", (req, res) => {
    let newPokemon = req.body;
    console.log("POST: adding " + newPokemon.name);

    team.push(newPokemon);
    res.json(team);
});


// PUT (update): replace one Pokemon with the new version the browser sends.
// :name is a route parameter. For /api/team/pikachu, req.params.name is "pikachu".
app.put("/api/team/:name", (req, res) => {
    let name = req.params.name;
    let updatedPokemon = req.body;
    console.log("PUT: updating " + name);

    for (let i = 0; i < team.length; i++) {
        if (team[i].name === name) {
            team[i] = updatedPokemon;
            res.json(team);
            // Done: leave the function so we don't also send the 404 below
            return;
        }
    }

    // Only gets here if no Pokemon had that name
    res.status(404).json({ error: "No pokemon named " + name });
});


// DELETE (remove): no body needed, the URL says which one.
app.delete("/api/team/:name", (req, res) => {
    let name = req.params.name;
    console.log("DELETE: removing " + name);

    for (let i = 0; i < team.length; i++) {
        if (team[i].name === name) {
            // splice(i, 1) removes 1 element starting at index i
            team.splice(i, 1);
            res.json(team);
            return;
        }
    }

    res.status(404).json({ error: "No pokemon named " + name });
});


// No "else" needed: any request that matches no route gets an automatic 404.

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});
