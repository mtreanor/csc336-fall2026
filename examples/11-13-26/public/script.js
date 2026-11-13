let formElement = document.querySelector("#formElement");

formElement.addEventListener("submit", async (e) => {
    // Stop the form from reloading the page, so we can send the data with fetch instead
    e.preventDefault();

    // console.log("Form Submitted!!!!");

    // First version: a GET request with the data in the URL (query parameters).
    // The server reads these with req.query.food and req.query.user.
    // let response = await fetch("http://localhost:3000/food?food=burrito&user=Mike");
    // let jsonFromServer = await response.json();
    // console.log(jsonFromServer);

    let foodInput = document.querySelector("#foodInput");
    let userInput = document.querySelector("#userInput");

    // Second version: put the data in an object and send it in the body of a POST request.
    let dataFromFrontEnd = {
        food: foodInput.value,
        user: userInput.value
    }

    // No "http://localhost:3000" needed: this page came from our server,
    // so "/food" goes back to that same server.
    let response = await fetch("/food", {
        method: "POST",                                  // sending, not just asking
        headers: { "Content-Type": "application/json" }, // "what I'm sending is JSON"
        body: JSON.stringify(dataFromFrontEnd)                 // the data, as a JSON string
    });
});
