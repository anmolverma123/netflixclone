class NetflixApp {

  constructor() {
    this.API_KEY = "fa233739";

    this.trailers = {
      "Avengers": "https://www.youtube.com/embed/TcMBFSGVi1c",
      "Batman": "https://www.youtube.com/embed/mqqft2x_Aa4",
      "Spider-Man": "https://www.youtube.com/embed/JfVOs4VSpmA",
      "Iron Man": "https://www.youtube.com/embed/8ugaeA-nMTc",
      "Joker": "https://www.youtube.com/embed/zAGVQLHvwOY",
      "Inception": "https://www.youtube.com/embed/YoHD9XEInc0",
      "Interstellar": "https://www.youtube.com/embed/zSWdZVtXT7E",
      "Jawan": "https://www.youtube.com/embed/COv52Qyctws",
      "Pathaan": "https://www.youtube.com/embed/vqu4z34wENw",
      "Animal": "https://www.youtube.com/embed/Dydmpfo68DA",
      "Dunki": "https://www.youtube.com/embed/RU4lEmhHTF4",
      "Salaar": "https://www.youtube.com/embed/bUR_FKt7Iso",
      "Tiger 3": "https://www.youtube.com/embed/vEjTUDjjU6A",
      "Gadar 2": "https://www.youtube.com/embed/bA4fEo6GjwI",
      "Rocky Aur Rani Kii Prem Kahaani": "https://www.youtube.com/embed/6mdxy3zohEk",
      "Bhool Bhulaiyaa 2": "https://www.youtube.com/embed/P2KRKxAb2ek",
      "Adipurush": "https://www.youtube.com/embed/scNmYjoR-qM"
    };

    this.createSearchBar();
    this.loadDefaultMovies();
  }

  createSearchBar() {
    const section = document.querySelector(".section");
    const box = document.createElement("div");

    box.style.cssText = `
      margin:30px 0;
      display:flex;
      gap:12px;
      justify-content:center;
      align-items:center;
    `;

    box.innerHTML = `
      <input id="movieSearch"
        placeholder="Search movies..."
        style="
          padding:12px 16px;
          width:320px;
          border-radius:6px;
          border:1px solid #333;
          background:#111;
          color:white;
          font-size:14px;
          outline:none;
        ">
      <button id="searchBtn"
        style="
          padding:12px 20px;
          background:#e50914;
          border:none;
          color:white;
          font-weight:600;
          border-radius:6px;
          cursor:pointer;
        ">
        Search
      </button>
    `;

    section.prepend(box);

    document.getElementById("searchBtn").onclick = () => this.handleSearch();
  }

  handleSearch() {
    const value = document.getElementById("movieSearch").value.trim();
    if (!value) {
      this.loadDefaultMovies();
    } else {
      this.searchMovie(value);
    }
  }

  async searchMovie(name) {
    const url = `https://www.omdbapi.com/?s=${name}&apikey=${this.API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      this.renderMovies(data.Search);
    } else {
      alert("Movie not found");
    }
  }

  async loadDefaultMovies() {
    const movies = [
      "Avengers",
      "Batman",
      "Spider Man",
      "Iron Man",
      "Joker",
      "Inception",
      "Interstellar",
      "Jawan",
      "Pathaan",
      "Animal",
      "Dunki",
      "Tiger 3",
      "Gadar 2"
    ];

    const list = [];

    for (let m of movies) {
      const url = `https://www.omdbapi.com/?t=${m}&apikey=${this.API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") list.push(data);
    }

    this.renderMovies(list);
  }

  renderMovies(movies) {
    const track = document.querySelector(".carousel-track");
    track.innerHTML = "";

    movies.forEach(movie => {
      const title = movie.Title;
      const thumb = document.createElement("div");
      thumb.className = "thumbnail";

      thumb.innerHTML = `
        <img src="${movie.Poster}">
        <button style="
          margin-top:8px;
          padding:6px 10px;
          background:#e50914;
          border:none;
          color:white;
          cursor:pointer;
          border-radius:4px;">
          ▶ Play
        </button>
      `;

      thumb.querySelector("button").onclick = () => this.playTrailer(title);
      track.appendChild(thumb);
    });
  }

  playTrailer(title) {
    let link = null;

    if (this.trailers[title]) {
      link = this.trailers[title];
    } else {
      for (let key in this.trailers) {
        if (title.includes(key)) {
          link = this.trailers[key];
          break;
        }
      }
    }

    if (!link) {
      const q = encodeURIComponent(title + " official trailer");
      window.open(`https://www.youtube.com/results?search_query=${q}`, "_blank");
      return;
    }

    window.open(link.replace("/embed/", "/watch?v="), "_blank");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new NetflixApp();
});
