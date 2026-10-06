// Each album gets a dropdown for its genre. Changing the dropdown changes
// that album's object in the albums array. Open the console to watch it.

let rootDiv = document.querySelector("#root");

// Every option in each dropdown comes from this one array.
let genreData = ["unknown","rock", "pop", "hip hop", "jazz", "classical", "audiobook"];


// Every album starts as "unknown" so we can fill in genres from the page.
let albums = [
    {
        artist: "Metallica",
        album: "Black Album",
        genre: "unknown"
    },
    {
        artist: "The Avalanches",
        album: "Since I Left You",
        genre: "unknown"
    },
    {
        artist: "Led Zeppelin",
        album: "II",
        genre: "unknown"
    },
    {
        artist: "Stevie Wonder",
        album: "Inner Visions",
        genre: "unknown"
    }
];



// Builds the HTML for one album and adds it to the page.
function renderAlbum(album) {
    let albumDiv = document.createElement("div");
    albumDiv.classList.add("album");
    rootDiv.append(albumDiv);

    let artistH1 = document.createElement("h1");
    artistH1.innerHTML = album.artist;
    albumDiv.append(artistH1);

    let albumH2 = document.createElement("h2");
    albumH2.innerHTML = album.album;
    albumDiv.append(albumH2);

    // Create the genre select drop down
    let selectElement = document.createElement("select");
    albumDiv.append(selectElement);

    // This is a closure. The listener runs later, when the user picks a
    // genre, long after renderAlbum has returned. It still remembers this
    // call's album and selectElement, so each dropdown changes only its own album.
    selectElement.addEventListener("change", e => {
        // We have a reference to the album object for each album renderAlbum
        // was called for. And we change it "later" (i.e. when the event fires)
        console.log("Changed " + album.album + " from " + album.genre + " to " + selectElement.value);
        album.genre = selectElement.value;
    });   

    // One <option> per genre. value is what selectElement.value gives
    // back; innerHTML is what the user sees. Here they're the same.
    for (let genre of genreData) {
        let optionElement = document.createElement("option");
        optionElement.value = genre;
        optionElement.innerHTML = genre;
        selectElement.append(optionElement);
    }
    
}




// Draw every album. Each call to renderAlbum gets its own album, which
// is what its listener remembers.
for (let album of albums) {
    renderAlbum(album);
}




