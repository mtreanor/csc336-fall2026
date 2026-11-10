// The same idea as our hand-built server, but using Express.
// Setup: run "npm install" in this folder once, then "node server.js".

// const express = require('express'); // The "commonjs" way
import express from 'express'; // The "module" way (needs "type": "module" in package.json)

const app = express();
const port = 3000;

// This one line replaces all of our readFileSync / Content-Type code.
// Any request that matches a file in public/ gets that file sent back,
// with the right Content-Type. "/" sends public/index.html.
app.use(express.static("public"));

// A route: when a GET request for "/" arrives, run this function.
// Note: you won't see this one in the browser, because express.static
// already answered "/" with index.html. Rename index.html to see it.
app.get('/', (req, res) => {
  res.send('Hello World!');
})

// Visit http://localhost:3000/mike
// No writeHead needed: res.send picks the status and Content-Type for us.
app.get('/mike', (req, res) => {
  res.send('Hello from Mike!');
})

app.listen(port);
