// p5 + fetch, built up from Tuesday: now each thing on the canvas is a
// Creature (a class), and each Creature gets its own Pokemon from the API.

// Every Creature on the canvas. draw() goes through this list every frame.
let creatures = [];
// Change this to get more Pokemon (#1, #2, #3, ...)
let numCreatures = 1;
// How fast a Creature can drift, in pixels per frame
let randSpeedRange = 0.1;


class Creature {
    constructor(x, y, r, h, id) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.hue = h;
        this.id = id;

        // Each Creature gets its own random direction and speed
        this.velX = random(-randSpeedRange, randSpeedRange);
        this.velY = random(-randSpeedRange, randSpeedRange);
    }

    // Called every frame from draw(): move a little, then draw.
    update() {
        this.x += this.velX;
        this.y += this.velY;

        // fill/stroke only matter for the ellipse version below; image() ignores them
        fill(this.hue, 50, 100);
        noStroke();
        // stroke(255, 255, 255);
        // strokeWeight(5);

        // this.image isn't set in the constructor. setup() adds it after
        // the Pokemon's picture finishes loading.
        image(this.image, this.x, this.y);

        // Before we had Pokemon pictures, each Creature was a colored circle:
        // ellipse(this.x, this.y, this.radius);
    }
}

// Same as Tuesday: two awaits (wait for the server, then for the JSON),
// then hand the data back to whoever called us.
async function getPokemon(id) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    let json = await response.json();  
    return json;
}

// async so we can await inside it. p5 waits for setup to finish before
// it starts calling draw, so every Creature has its image by the first frame.
async function setup() {
    createCanvas(600, 400);
    // HSB: colors as hue (0-360), saturation, brightness, instead of red, green, blue
    colorMode(HSB);
    // Draw images from their center, so x and y are the middle of the Creature
    imageMode(CENTER);
    

    for (let i = 1; i <= numCreatures; i++) {
        // Spread the Creatures out across the canvas, each a different hue
        let x = width / numCreatures * i;
        let hue = 360 / numCreatures * i;
        let creature = new Creature(x, height/2, 60, hue, i);

        // i doubles as the Pokemon's number: Creature 1 is Bulbasaur, 2 is Ivysaur...
        // Each await waits for this Pokemon before the loop moves on to the next.
        creature.data = await getPokemon(i);
        // loadImage downloads the picture, so it needs an await too
        creature.image = await loadImage(creature.data.sprites.front_default);

        creatures.push(creature);
    }

}

// Runs about 60 times a second, forever.
function draw() {
    // Clear the canvas (black), otherwise every frame draws on top of the last
    background(0, 0, 0);

    for (let creature of creatures) {
        creature.update();
    }
}

