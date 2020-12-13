import moviesArray from "./movies.json";

function getMoviesFromLocalStorage() {
    try {
        return JSON.parse(localStorage.getItem('movies'));
    } catch (e) {
        return [];
    }
}

function getMovies() {
    let movies = [];

    if (getMoviesFromLocalStorage() !== null) {
        movies = getMoviesFromLocalStorage()
    } else {
        movies = JSON.stringify(moviesArray);
        localStorage.setItem('movies', movies);
    }

    return movies;
}

function setFilmsToLocalStorage(array) {
    const moviesJson = JSON.stringify(array);
    localStorage.setItem('movies', moviesJson);
}

export { getMovies, setFilmsToLocalStorage };