import {getMovies, setFilmsToLocalStorage} from "./localstorage";

export function setEditedFilmsToLocalStorage(props) {
    const filmsArray = getMovies();
    const filmEdited = filmsArray.find(movie => movie.id === props.id);

    if (filmEdited) {
        Object.assign(filmEdited, props.film)
    } else {
        filmsArray.push(props.film);
    }

    setFilmsToLocalStorage(filmsArray);
}