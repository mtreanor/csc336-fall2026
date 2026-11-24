// Before running: make a .env file in this folder with your connection string:
//     MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/
//
// IMPORTANT: in the MongoDB Atlas dashboard, go to Network Access and add the IP address
// 0.0.0.0/0 (allow access from anywhere). Otherwise nothing will work: Atlas blocks every
// computer that isn't on that list, including Render's servers and your own laptop when
// you switch Wi-Fi networks. Your username and password still protect the database.

import express from "express";
import "dotenv/config";
import { MongoClient } from "mongodb";

const app = express();

// Serve index.html and script.js from the public folder
app.use(express.static("public"));

// Connect to MongoDB once, when the server starts. Every route below reuses this connection.
// The connection string has our password in it, so it comes from .env, not the code.
let client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

// A database holds collections, and a collection holds documents (plain objects).
// Neither one has to exist yet: Mongo creates them the first time we insert something.
let database = client.db("gameDB");
let scores = database.collection("scores");

// Two ways to send data in a URL:
//   Route parameter: /test/42        → req.params.id is "42"   (part of the path, required)
//   Query parameter: /test/42?foo=7  → req.query.foo is "7"    (after the ?, optional)
// Both always arrive as strings, so Number(...) turns "7" into the number 7.
app.get("/test/:id", (req, res) => {
    console.log("test: " + req.params.id);
    console.log(Number(req.query.foo));

    let data = {test:"Mike (from the server)"};
    res.json(data);
});

// Visiting /add/mike/50 saves { name: "mike", score: "50" } in the scores collection.
// (Using GET to save data keeps this demo simple: you can try it from the address bar.
// A real app would use POST with a JSON body, like the 11/20 example.)
app.get("/add/:name/:score", async (req, res) => {
    let name = req.params.name;
    let score = req.params.score;

    console.log(`${name}: ${score}`);

    // Note: score is still a string here ("50"). To sort scores correctly,
    // save Number(score) instead. Otherwise "9" sorts above "10".
    let document = {
        name: name,
        score: score
    }

    // insertOne waits for Atlas to save the document, then tells us the _id Mongo gave it
    let result = await scores.insertOne(document);

    // Send the new _id back so the page can show it
    res.json({ id: result.insertedId });
});

app.listen(3000);
