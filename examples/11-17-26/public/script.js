let randomButton = document.querySelector("#randomButton");
let geminiButton = document.querySelector("#geminiButton");

// Button 1: ask our server for a random number
randomButton.addEventListener("click", async () => {
    let response = await fetch("/random");
    let data = await response.json();

    // The server sent { randomNumber: 0.123... }
    document.querySelector("#randomOutput").innerHTML = data.randomNumber;
});

// Button 2: ask our server, which asks Gemini, for some names
geminiButton.addEventListener("click", async () => {
    let geminiOutput = document.querySelector("#geminiOutput");

    // Gemini takes a few seconds, so show something while we wait
    geminiOutput.innerHTML = "Asking Gemini...";

    let response = await fetch("/gemini-test");
    let data = await response.json();

    console.log(data.geminiText);

    // The server sent { geminiText: "..." }
    geminiOutput.innerHTML = data.geminiText;
});
