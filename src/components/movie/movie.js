import html from "./index.html";
import "../../style.css";
import {renderTemplate} from "../../template-utils";
import {setEditedFilmsToLocalStorage} from "../../localstorage-utils"

class Movie {
    constructor(movie) {
        this.id = movie.id || "";
        this.like = movie.like || 0;
        this.dislike = movie.dislike || 0;
        this.isLiked = movie.isLiked || "";
        this.roles = movie.roles || "";
        this.movie = renderTemplate(html,movie)
    }

    setDisabledButtons(likeButtons) {
        for(let button of likeButtons) {
            button.disabled = true;
        }
    }

    addLike(likeButtons) {
        for(let button of likeButtons) {
            button.addEventListener("click", (event) => {
                if (button.contains(event.target)) {
                    button.dataset.count++

                    const newFilm = {
                        like: this.movie.querySelector(".btn-like").dataset.count || "0",
                        dislike: this.movie.querySelector(".btn-dislike").dataset.count || "0",
                        isLiked: true,
                    };

                    this.setDisabledButtons(likeButtons);

                    setEditedFilmsToLocalStorage({
                        film: newFilm,
                        id: this.id
                    });
                }
            })
        }
    }

    render() {
        const likeButtons = this.movie.querySelectorAll(".btn-text");
        this.addLike(likeButtons);
        if (this.isLiked) {
            this.setDisabledButtons(likeButtons)
        }

        return this.movie
    }
}

export default Movie;
