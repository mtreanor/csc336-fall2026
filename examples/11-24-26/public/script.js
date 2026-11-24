let buttonElement = document.querySelector("#buttonElement");

// Clicking the button asks our server to save a score (name "mike", score 103434).
// The browser never talks to MongoDB directly: it asks our server, and our server asks MongoDB.
buttonElement.addEventListener("click", async (e) => {
    let response = await fetch("/add/mike/103434");
    let data = await response.json();

    // The server sent back { id: "..." }, the _id MongoDB gave the new document
    document.querySelector("#serverDataDiv").innerHTML = data.id;
});
