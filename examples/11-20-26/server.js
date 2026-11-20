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

// No duplicate to-dos: a "unique index" on text tells Mongo to refuse any new
// document whose text matches one already in the collection.
// We never write code to check for duplicates ourselves. Mongo enforces the rule,
// for every insert, from every server connected to this database (local and Render).
// This is just one of many things a database takes care of for us. Others: finding
// and sorting quickly even with millions of documents, keeping data safe if the server
// crashes, and handling two requests that try to save at the same moment.
//
// Running this again is harmless: if the index already exists, nothing changes.
// But if the collection ALREADY has duplicates, Mongo won't create the rule and the
// server crashes here with "E11000 duplicate key error". Delete the extra copies first
// (Atlas, Browse Collections), then restart.
await todos.createIndex({ text: 1 }, { unique: true });


// ADD a to-do. The browser sends { todoText: "..." } (see public/index.html)
app.post("/todo", async (req, res) => {
    let newTodo = {
        text: req.body.todoText
    };

    // Mongo gives every new document a unique _id.
    // If this text is already in the collection, insertOne throws an error instead
    // (because of the unique index above). Express catches it and sends back a 500,
    // and the server keeps running. Look for "E11000" in the terminal.
    await todos.insertOne(newTodo);

    // Every request needs a response, or the browser's fetch waits forever
    res.json({ message: "Added: " + newTodo.text });
});


app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});
