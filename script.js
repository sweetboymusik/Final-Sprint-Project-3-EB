// Final Sprint Project 3
// Reading JSON data and display as HTML using functions
// Dates written: December 07, 2023 - Dec 15, 2023
// Author: Elliott Butt

// define functions
function generate_output(album, format) {
  // extract .json data
  title = album.title;
  artist = album.artist;
  date = new Date(album.releaseDate).getFullYear();
  genres = format_genres(album.genres);
  length = album.length;
  tracks = album.trackCount;
  avgLength = calc_avg_track_length(length, tracks);
  popSongs = album.popSongs[0];
  peak = album.peakRank;
  score = album.criticScore;
  explicit = album.explicit;

  // generate html
  if (format === "html") {
    html = `
    <h3>${title}</h3>
    <p>

    <b>Artist:</b> ${artist} <br>
    <b>Release year:</b> ${date} <br>   
    <b>Genre(s):</b> ${genres} <br>
    <b>Length:</b> ${length} <br>
    <b>Tracks:</b> ${tracks} <br>
    <b>Average track length:</b> ${avgLength} <br>
    <b>Popular song:</b> "${popSongs}" <br>
    <b>Chart peak:</b> #${peak} <br>
    <b>Critic score:</b> ${score}/10 <br>
    <b>Explicit lyrics: </b>${explicit === "true" ? "YES" : "NO"}

    </p>
    <br>
  `;

    return html;
  }

  // generate console logs
  if (format === "console") {
    log = `Artist: ${artist}
Release year: ${date}   
Genre(s): ${genres}
Length: ${length}
Tracks: ${tracks}
Average track length: ${avgLength}
Popular song: "${popSongs}"
Chart peak: #${peak} 
Critic score: ${score}/10
Explicit lyrics: ${explicit === "true" ? "YES" : "NO"}`;

    return log;
  }
}

function format_genres(genres) {
  display = "";

  for (let i = 0; i < genres.length; i++) {
    if (i == genres.length - 1) {
      display += genres[i];
    } else {
      display += genres[i] + ", ";
    }
  }

  return display;
}

function calc_avg_track_length(length, tracks) {
  lenSplit = length.split(":");
  mins = parseInt(lenSplit[0]);
  secs = parseInt(lenSplit[1]);

  secsTotal = mins * 60 + secs;

  avgDeciSecs = secsTotal / tracks;
  avgMins = Math.floor(avgDeciSecs / 60);
  avgSecs = String(Math.floor(avgDeciSecs % 60));

  if (avgSecs.length === 1) {
    avgSecs = `0${avgSecs}`;
  }

  return `${avgMins}:${avgSecs}`;
}

// read data from JSON file using fetch()
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((album) => {
      // display HTML
      let albumContainer = document.createElement("div");
      albumContainer.innerHTML = generate_output(album, "html");
      document.body.appendChild(albumContainer);

      // display console logs
      console.log(generate_output(album, "console"));
    });
  })
  .catch((error) => {
    console.error(error);
  });
