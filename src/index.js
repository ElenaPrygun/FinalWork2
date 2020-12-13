import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./style.css";

import { getHistory } from "./app-history";
import {getMovies} from "./localstorage";
import Header from "./components/header/header";
import WelcomeComponent from "./components/welcomePage/welcomePage";
import Footer from "./components/footer/footer";
import MovieCard from "./components/movie-card/movie-card";
import Movie from "./components/movie/movie";
import NotFound from "./components/notFound/notFound";


getMovies();

const container = document.querySelector(".container");
const mainWrapper = document.createElement("main");
mainWrapper.className = "d-flex flex-wrap justify-content-around align-content-start";
mainWrapper.id = "content";

const header = new Header({ newMovieConfirmed: rewriteMovies });
container.appendChild(header.render());
container.appendChild(mainWrapper);

const welcomeComponent = new WelcomeComponent();
mainWrapper.appendChild(welcomeComponent.render());

const footer = new Footer();
container.appendChild(footer.render());

const notFound = new NotFound();

const history = getHistory();

function renderRoute(path) {
    const movies = getMovies();
    let movieFound = false;

    if (path === "/") {
        mainWrapper.innerHTML = "";
        mainWrapper.appendChild(welcomeComponent.render());
    } else if (path === "/list") {
        mainWrapper.innerHTML = "";
        const listMovies = movies.map(movie => new MovieCard({
            movie: movie,
            movieEdited: rewriteMovies
        }));
        listMovies.forEach( movie =>  mainWrapper.appendChild(movie.render()))
    } else if (path.startsWith("/list-")) {
        const id = path.substr("/list-".length)
        const currentMovie = movies.find(movie => movie.id === id)
        if (currentMovie) {
            mainWrapper.innerHTML = "";
            const movie = new Movie(currentMovie);
            mainWrapper.appendChild(movie.render())
        } else {
            mainWrapper.innerHTML = "";
            mainWrapper.appendChild(notFound.render());
        }
    } else if (path === "/search-") {
        mainWrapper.innerHTML = "";
        const searchInput = document.querySelector("input[name=query]");
        movies.forEach(movie => {
            if ((movie.title.toLowerCase().indexOf(searchInput.value.toLowerCase()) + 1)) {
                const currentMovie = new MovieCard({
                    movie: movie,
                    movieEdited: rewriteMovies
                });
                mainWrapper.appendChild(currentMovie.render())
                movieFound = true;
            }
        });
        if (!movieFound) {
            mainWrapper.innerHTML = "";
            const notFoundFilms = document.createElement("div");
            notFoundFilms.innerText = "Нет совпадений";            
            mainWrapper.appendChild(notFoundFilms);
        }
    } else {
        mainWrapper.innerHTML = "";
        mainWrapper.appendChild(notFound.render());
    }
}

history.listen(listener => {
    renderRoute(listener.location.pathname);
});
renderRoute(history.location.pathname);

function rewriteMovies() {
    mainWrapper.innerHTML = "";
    const movies = getMovies();
    const listMovies = movies.map(movie => new MovieCard({
        movie: movie,
        movieEdited: rewriteMovies
    }));
    listMovies.forEach( movie =>  mainWrapper.appendChild(movie.render()));
}


