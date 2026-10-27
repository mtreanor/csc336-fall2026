// p5 + fetch: get a Pokemon from PokeAPI, then draw its picture moving
// across the canvas.

// Holds the Pokemon's position and picture. setup() fills it in,
// draw() uses it every frame.
let pokemon;

// A function that makes an api call and returns the result.
async function getPokemon(id) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    let json = await response.json()  
    return json;
}

// Runs once. It's async so we can await inside it, and p5 waits for it
// to finish before calling draw, so pokemon is ready by the first frame.
async function setup() {
    createCanvas(600, 400);

    let id = 1;
    // getPokemon is async, so it needs an await too (otherwise we'd get a Promise, not the data)
    let pokemonData = await getPokemon(id);
    // load the image (this requires downloading, thus the await)
    let pokemonImage = await loadImage(pokemonData.sprites.front_default);
    pokemon = {
        x: 100,
        y: 200,
        img: pokemonImage,
        id: id
    }
}

// Runs about 60 times a second, forever.
function draw() {
    // clear the background
    background(0);

    // Draw the pokemon
    image(pokemon.img, pokemon.x, pokemon.y);

    // Update pokemon's position (a little each frame = animation)
    pokemon.x += 0.3;
}
