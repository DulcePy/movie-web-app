import config from "../config.js";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = config.API_KEY;

export const movieAPI = {
  async fetchMovies(endpoint, page = 1) {
    try {
      const response = await fetch(
        `${BASE_URL}${endpoint}?api_key=${API_KEY}&page=${page}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  async searchMovies(query) {
    if (!query?.trim()) return null;
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      console.error("Error searching movies:", error);
      throw error;
    }
  },

  getTrendingMovies() {
    return this.fetchMovies("/trending/all/week");
  },
};
