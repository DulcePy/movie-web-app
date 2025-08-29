export const movieUtils = {
  formatYear(releaseDate) {
    return releaseDate ? releaseDate.split("-")[0] : "N/A";
  },

  formatLanguage(language) {
    return language ? language.toUpperCase() : "N/A";
  },

  truncateText(text, maxLength = 100) {
    return text
      ? text.length > maxLength
        ? `${text.slice(0, maxLength)}...`
        : text
      : "No description available";
  },

  shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  },
};
