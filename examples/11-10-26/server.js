// A static file server, built by hand with Node's http module.
// Last class our pages were strings inside if statements.
// Now the server reads real files out of the public/ folder and sends them.
// Run with: node server.js, then visit http://localhost:3000
import http from "http";
import fs from "fs";

// Node calls this function once for EVERY request the browser sends.
// Loading index.html makes a second request, for script.js (check the terminal).
function requestReceived(request, response) {
    console.log("Request received: " + request.url);

    if (request.url === "/") {
        // Read the file's contents from disk, then send them as the response.
        // The path is relative to the folder you ran "node server.js" from.
        let fileData = fs.readFileSync("./public/index.html");

        // The header tells the browser what kind of data is coming.
        let responseConfig = {
            "Content-Type": "text/html"
        }
        response.writeHead(200, responseConfig);
        response.end(fileData);

        // Each request gets exactly ONE response. Without this return, the
        // code below would try to send a second one and crash the server.
        return;
    }

    // Every other URL (including /script.js) gets this message for now.
    // To send script.js, we'd need another if that reads ./public/script.js.
    let responseConfig = {
        "Content-Type": "text/plain"
    }
    response.writeHead(200, responseConfig);
    response.end("This is a message from the server");
}

// We hand Node our function. Node runs it whenever a request arrives.
let server = http.createServer(requestReceived);

server.listen(3000);
