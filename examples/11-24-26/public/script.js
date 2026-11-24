let buttonElement = document.querySelector("#buttonElement");
buttonElement.addEventListener("click", async (e) => {
    let response = await fetch("/add/mike/103434");
    let data = await response.json();

    document.querySelector("#serverDataDiv").innerHTML = data.id;
});