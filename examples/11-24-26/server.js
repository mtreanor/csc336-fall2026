import express from "express";
import "dotenv/config";
import { MongoClient } from "mongodb";

const app = express();

app.use(express.static("public"));

let client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
let database = client.db("gameDB");
let scores = database.collection("scores");

app.get("/test/:id", (req, res) => {
    console.log("test: " + req.params.id);
    console.log(Number(req.query.foo));

    let data = {test:"Mike (from the server)"};
    res.json(data);
});

app.get("/add/:name/:score", async (req, res) => {
    let name = req.params.name;
    let score = req.params.score;

    console.log(`${name}: ${score}`);

    let document = {
        name: name,
        score: score
    }
    let result = await scores.insertOne(document);
    
    res.json({ id: result.insertedId });
});

app.listen(3000);