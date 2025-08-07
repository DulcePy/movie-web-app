import config from './config.js';
const apiKey = config.API_KEY;
const apiURL = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&page=3`;

async function fetchTrendingMovies() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching API data: ", error);
  }
}

function displayMovies(movies) {
  const container = document.getElementById("movie-container");
  container.innerHTML = "";

  const limitedMovies = movies.slice(0, 20); // limit to 6 movies

  limitedMovies.forEach((movie) => {
    const year = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
    const language = movie.original_language ? movie.original_language : "N/A";

    const movieElement = document.createElement("div");
    movieElement.className = "hover:scale-105 transition-transform my-3";

    movieElement.innerHTML = `
            <div class="flex flex-col overflow-hidden duration-300">
        <div class="relative">
          <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${
      movie.title
    }" class="rounded-t-lg">
        </div>
      </div>
      <div class="z-10 flex flex-col items-stretch h-fit justify-between bg-gray-900 p-3 rounded-b-lg">
        <div class="cursor-pointer">
          <h2 class="text-gray-100 text-left md:text-[16px] text-sm font-semibold line-clamp-1 w-fit">
            ${movie.title} (${year})
          </h2>
          <div class="mt-2 md:text-[14px] text-[14px] text-zinc-300">
            <h3>
              <span class="text-yellow-400"><i class="fa-solid fa-star"></i></span> Rating: ${movie.vote_average.toFixed(
                1
              )}
            </h3>
            <h3>Language: ${language}</h3>
            <h3>Release: ${year}</h3>
          </div>
        </div>
      </div>
        `;

    container.appendChild(movieElement);
  });
}

fetchTrendingMovies();
