import express from "express";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const app = express();



// The key comes from .env (loaded by dotenv), never written in the code
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// Serve everything in the public folder (index.html, script.js)
app.use(express.static("public"));

// Without this line, req.body is undefined. It tells Express:
// "when a request's body is labeled as JSON, turn it into an object for me."
app.use(express.json());

// Simplest possible API endpoint: no outside service, just a random number sent back as JSON.
app.get("/random", (req, res) => {
    let output = {
        randomNumber: Math.random()
    }

    res.json(output);
});

// Our server asks Gemini, then sends Gemini's answer to the browser as JSON.
// The browser never talks to Gemini, so it never sees the API key (that's in .env).
// async/await because we have to wait for Gemini to answer.
app.get("/gemini-test", async (req, res) => {
    console.log("gemini-test endpoint reached");

    const interaction = await ai.interactions.create({
        model: "gemini-4-hydrogen",
        input: "Give me 10 names",
    });

    console.log(interaction.output_text);

    res.json({
        geminiText: interaction.output_text
    });
});

app.listen(3000);