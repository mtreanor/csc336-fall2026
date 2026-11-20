import "dotenv/config";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

let app = express();
let port = process.env.PORT || 3000;

// Serve index.html (and anything else) from the public folder
app.use(express.static("public"));

// Turns a JSON request body into an object, so req.body.todoText works
app.use(express.json());

// The connection string has our password in it, so it lives in .env
let client = new MongoClient(process.env.MONGODB_URI);

// Connect once, before the server starts. Every route below reuses this connection.
await client.connect();
console.log("Connected to MongoDB");

// A database holds collections. A collection holds documents (just objects).
// Neither has to exist yet: Mongo creates them the first time we insert.
let database = client.db("csc336");
let todos = database.collection("todos");


// ADD a to-do. The browser sends { todoText: "..." } (see public/index.html)
app.post("/todo", async (req, res) => {
    let newTodo = {
        text: req.body.todoText
    };

    // Mongo gives every new document a unique _id
    await todos.insertOne(newTodo);

    // Every request needs a response, or the browser's fetch waits forever
    res.json({ message: "Added: " + newTodo.text });
});


app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});
