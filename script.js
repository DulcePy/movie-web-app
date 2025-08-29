import { movieAPI } from "./services/movieAPI.js";
import { movieUtils } from "./utils/movieUtils.js";

class MovieApp {
  constructor() {
    this.initializeElements();
    this.addEventListeners();
    this.loadInitialData();
  }

  initializeElements() {
    this.movieContainer = document.getElementById("movie-container");
    this.asideContainer = document.getElementById("aside-card");
    this.searchForm = document.querySelector("#search-form");
    this.searchInput = document.getElementById("search-input");
    this.bannerPoster = document.getElementById("banner-poster");
    this.posterElement = document.getElementById("poster");
    this.posterTitle = document.getElementById("poster-title");
    this.posterDescription = document.getElementById("poster-description");
    this.posterLanguaje = document.getElementById("poster-lang");
    this.posterRating = document.getElementById("poster-rating");
  }

  addEventListeners() {
    this.searchForm.addEventListener("submit", (e) => this.handleSearch(e));
  }

  async loadInitialData() {
    try {
      await Promise.all([this.loadMainMovies(), this.loadAsideMovies()]);
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  }

  async loadMainMovies() {
    try {
      const data = await movieAPI.getTrendingMovies();
      this.displayMovies(data.results);
    } catch (error) {
      console.error("Error loading main movies:", error);
    }
  }

  async loadAsideMovies() {
    try {
      const data = await movieAPI.getTrendingMovies();
      this.displayMoviesAside(data.results);
    } catch (error) {
      console.error("Error loading aside movies:", error);
    }
  }

  displayMovies(movies) {
    if (!movies?.length) return;

    this.movieContainer.innerHTML = "";
    movies.slice(0, 20).forEach((movie) => {
      const movieElement = this.createMovieElement(movie);
      this.movieContainer.appendChild(movieElement);
    });
  }

  createMovieElement(movie) {
    const element = document.createElement("div");
    element.className = "hover:scale-105 transition-transform my-3";

    const year = movieUtils.formatYear(movie.release_date);
    const language = movieUtils.formatLanguage(movie.original_language);

    element.innerHTML = `
      <div class="flex flex-col overflow-hidden duration-300">
        <div class="relative">
          <img class="w-72 h-[80%]" 
            src="https://image.tmdb.org/t/p/w300${movie.poster_path}" 
            alt="${movie.title}" 
            class="rounded-t-lg">
        </div>
      </div>
      <div class="z-10 flex flex-col items-stretch h-fit justify-between bg-gray-900 p-3 rounded-b-lg">
        <div class="cursor-pointer">
          <h2 class="text-gray-100 text-left md:text-[16px] text-sm font-semibold line-clamp-1 w-fit">
            ${movie.title} (${year})
          </h2>
          <div class="mt-2 md:text-[14px] text-[14px] text-zinc-300">
            <h3>
              <span class="text-yellow-400">
                <i class="fa-solid fa-star"></i>
              </span> 
              Rating: ${movie.vote_average?.toFixed(1) ?? "N/A"}
            </h3>
            <h3>Language: <span class="uppercase">${language}</span></h3>
            <h3>Release: ${year}</h3>
          </div>
        </div>
      </div>
    `;

    return element;
  }

  displayMoviesAside(movies) {
    if (!movies?.length) return;

    this.asideContainer.innerHTML = "";
    const randomMovies = movieUtils.shuffleArray(movies).slice(0, 3);

    randomMovies.forEach((movie) => {
      const language = movieUtils.formatLanguage(movie.original_language);

      // Actualizar elementos del banner
      if (this.bannerPoster)
        this.bannerPoster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
      if (this.posterElement)
        this.posterElement.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
      if (this.posterTitle) this.posterTitle.innerHTML = movie.title;
      if (this.posterDescription)
        this.posterDescription.innerHTML = movie.overview;
      if (this.posterLanguaje)
        this.posterLanguaje.innerHTML = `Language: <span class="uppercase">${language}</span>`;
      if (this.posterRating) {
        this.posterRating.innerHTML = `Rating: ${
          movie.vote_average?.toFixed(1) ?? "N/A"
        }`;
      }

      const movieCard = document.createElement("div");
      movieCard.className = "flex items-center gap-4 mb-4";

      movieCard.innerHTML = `
        <img class="w-24 h-[100%]" 
          src="https://image.tmdb.org/t/p/w200${movie.poster_path}" 
          alt="${movie.title}">

        <div class="text-zinc-300">
          <h2 class="text-gray-100 text-left md:text-[16px] text-sm font-semibold line-clamp-1 w-fit">
            ${movie.title}
          </h2>
          <p>${movieUtils.truncateText(movie.overview, 100)}</p>
          <p>Language: <span class="uppercase">${language}</span></p>
          <p>
            <span class="text-yellow-400">
              <i class="fa-solid fa-star"></i>
            </span> 
            Rating: ${movie.vote_average?.toFixed(1) ?? "N/A"}
          </p>
        </div>
      `;

      this.asideContainer.appendChild(movieCard);
    });
  }

  async handleSearch(event) {
    event.preventDefault();
    const query = this.searchInput.value.trim();

    if (!query) return;

    try {
      const data = await movieAPI.searchMovies(query);
      this.displayMovies(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  }
}

new MovieApp();
