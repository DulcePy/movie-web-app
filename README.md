# Movie Ratings Web App 🎬

A modern web application for discovering and exploring trending movies using The Movie Database (TMDB) API. Built with vanilla JavaScript and styled with Tailwind CSS.

## 🌟 Features

- Browse trending movies with detailed information
- Real-time movie search functionality
- Responsive design that works on all devices
- Random movie recommendations in the aside section
- Clean and modern user interface

## 🛠 Technologies Used

- HTML5
- JavaScript (ES6+)
- Tailwind CSS
- Font Awesome Icons
- TMDB API

## 📦 Project Structure

```
movie-web-app/
├── services/
│   └── movieAPI.js       # API service handlers
├── utils/
│   └── movieUtils.js     # Utility functions
├── images/
│   └── icons/
├── style/
│   └── style.css
├── config.js             # API configuration
├── index.html
└── script.js            # Main application logic
```

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/DulcePy/movie-web-app.git
   ```

2. Create a `config.js` file in the root directory with your TMDB API key:

   ```javascript
   const config = {
     API_KEY: "your_tmdb_api_key_here",
   };
   export default config;
   ```

3. Serve the project using a local server (due to ES6 modules requirements)

## 🔑 API Key Setup

To run this project, you'll need a TMDB API key:

1. Visit [TMDB website](https://www.themoviedb.org/)
2. Create an account and request an API key
3. Add the key to your `config.js` file

## 💻 Development

The project uses a modular architecture:

- `movieAPI.js`: Handles all API interactions
- `movieUtils.js`: Contains utility functions for data formatting
- `script.js`: Main application logic using class-based organization

## 🎨 Styling

The project uses Tailwind CSS for styling, providing:

- Responsive design
- Modern UI components
- Efficient CSS development
- Custom animations and transitions

## 👩‍💻 Author

- **Dulce Figueredo** - [GitHub](https://github.com/DulcePy) | [LinkedIn](https://www.linkedin.com/in/dulce-figueredo-py)

