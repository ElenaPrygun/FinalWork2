import html from "./index.html";
import "../../style.css";
import {renderTemplate} from "../../template-utils";
import { getHistory } from "../../app-history";
import ModalForm from "../modal-form/modal-form";

const history = getHistory();

class Header {
    constructor(props) {
        this.header = renderTemplate(html);
        this.newMovieConfirmed = props.newMovieConfirmed;
    }

    showAllFilms(event) {
        event.preventDefault();
        history.push({ pathname: event.target.href, search: "" });
    }

    addNewFilm = (event) => {
        event.preventDefault();

        const newMovie = new ModalForm({
            newMovieConfirmed: this.newMovieConfirmed,
            modalTitle: "Добавить новый фильм"
        });
        newMovie.render();
    }

    searchFilms = (event) => {
        event.preventDefault();
        const searchInput = this.header.querySelector("input[name=query]");
        history.push({ pathname: "search-", search: `?query=${searchInput.value}` });
        searchInput.value = "";
    }

    render() {
        const allFilmsButton = this.header.querySelector(".all-movies");
        allFilmsButton.addEventListener("click", this.showAllFilms)

        const addNewFilmButton = this.header.querySelector(".add-new-film");
        addNewFilmButton.addEventListener("click", this.addNewFilm)

        const searchFilmForm = this.header.querySelector("#search");
        searchFilmForm.addEventListener("submit", this.searchFilms)

        return this.header;
    }
}


export default Header;