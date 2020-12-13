import html from "./index.html";
import "../../style.css";
import {renderTemplate} from "../../template-utils";
import {getHistory} from "../../app-history";
import ModalForm from "../modal-form/modal-form";
import { getMovies, setFilmsToLocalStorage } from "../../localstorage";
const history = getHistory();

class MovieCard {
    constructor(props) {
        this.id = props.movie.id || "";
        this.image = props.movie.image || "";
        this.title = props.movie.title || "";
        this.titleOriginal = props.movie.titleOriginal || "";
        this.text = props.movie.text || "";
        this.rating = props.movie.rating || "";
        this.year = props.movie.year || "";
        this.country = props.movie.country || "";
        this.slogan = props.movie.slogan || "";
        this.director = props.movie.director || "";
        this.producer = props.movie.producer || "";
        this.scenario = props.movie.scenario || "";
        this.roles = props.movie.roles || "";
        this.operator = props.movie.operator || "";
        this.composer = props.movie.composer || "";
        this.movie = renderTemplate(html,props.movie)
        this.movieEdited = props.movieEdited
    }

    openFilm(event) {
        event.preventDefault();
        history.push(event.target.href);
    }

    deleteFilm(event) {
        event.preventDefault();   
        const filmsArray = getMovies();
        const newFilmsArray = filmsArray.filter( movie => movie.id !== this.id);
        setFilmsToLocalStorage(newFilmsArray);
        this.movieEdited();        
    }

    editFilm() {
        const editMovie = new ModalForm( {
            editedInfo: {
                id: this.id,
                title: this.title,
                titleOriginal: this.titleOriginal,
                image: this.image,
                text: this.text,
                rating: this.rating,
                year: this.year,
                country: this.country,
                slogan: this.slogan,
                director: this.director,
                producer: this.producer,
                scenario: this.scenario,
                roles: this.roles,
                operator: this.operator,
                composer: this.composer },
            movieEdited: this.movieEdited,
            modalTitle: "Редактировать фильм"
        });
        editMovie.render();
    }

    render() {
        const editButton = this.movie.querySelector(".btn-edit");
        editButton.addEventListener("click", this.editFilm.bind(this))

        const openButton = this.movie.querySelector(".more");
        openButton.addEventListener("click", this.openFilm.bind(this))

        const deleteButton = this.movie.querySelector(".btn-delete");
        deleteButton.addEventListener("click", this.deleteFilm.bind(this))

        return this.movie
    }
}

export default MovieCard;
