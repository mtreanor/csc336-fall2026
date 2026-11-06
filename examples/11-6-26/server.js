// Run this in a terminal, from this folder: node server.js
// Then visit http://localhost:3000 in the browser.
// The program keeps running, waiting for requests. Ctrl+C stops it.

// http comes built into Node (like fs), so there's nothing to install.
import http from "http";

// createServer takes a callback. Node calls it once for EVERY request
// that comes in, and hands it two objects:
//   req = the request (what the browser asked for)
//   res = the response (what we send back)
let server = http.createServer((req, res) => {
    // These print in the TERMINAL, not the browser console. This code runs
    // on the server, and the browser never sees it.
    console.log("Request received!");

    // req.url is the part of the address after localhost:3000.
    // http://localhost:3000/about gives "/about".
    // Notice the browser also asks for "/favicon.ico" (the tab icon) on its own.
    console.log(req.url);

    // The server decides what to send back based on the URL.
    // Every response gets a status code (200 means "OK") and a header saying
    // what kind of content it is. "text/html" lets us send HTML tags.
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("Text <b>from</b> the server. Try <a href='/about'>/about</a> or <a href='/hello/mike'>/hello/mike</a>");

    } else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>About</h1><p>This page was made by a server, not read from a file.</p>");

    } else if (req.url.startsWith("/hello/")) {
        // Part of the URL can be data. For "/hello/mike", everything after
        // "/hello/" is a name. "/hello/" is 7 characters long, so slice(7)
        // gives us the rest of the string.
        let name = req.url.slice(7);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Hello, " + name + "!</h1>");

    } else {
        // Anything else: we don't have a page for it. 404 means "not found".
        // Notice nothing breaks: the server just answers with an error page.
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("Sorry, there is nothing at " + req.url);
    }
});

// Start waiting for requests on port 3000. The terminal doesn't come back
// to a prompt, because the program is still running.
server.listen(3000, () => {
    console.log("Server running at http://localhost:" + 3000);
});
