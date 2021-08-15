
const elMovesList = selectElement('.move__list')
const elMovesTemplet = selectElement('#move__template').content;
// Form ellements
const elForm = selectElement('.move__form');
const elInputSearch = selectElement('.move__form__input', elForm);
const elSelectGenres = selectElement('.move__form__select-genre', elForm);
const elSelectSort = selectElement('.move__form__select-sort', elForm);

//renderGenres
function renderGenres(films, element){
    const result = [];

    films.forEach(film => {
        film.genres.forEach(genre => {
            if (!result.includes(genre)) {
                result.push(genre);
            }
        });

    });
    
    result.forEach(genre => {
        const newOption = createDOM('option');
        newOption.value = genre;
        newOption.textContent = genre;

        element.appendChild(newOption);
    })

}

renderGenres(films, elSelectGenres);





//renderMoves
function renderMoves(filmsArr, element) {
    element.innerHTML = null;
    filmsArr.forEach((film) => {
        const movesTemplat = elMovesTemplet.cloneNode(true);

        selectElement('.move__img', movesTemplat).setAttribute('src',film.poster,);
        selectElement('.move__img', movesTemplat).setAttribute('alt',film.title,);
        selectElement('.move__item__headding', movesTemplat).textContent = film.title;
        selectElement('.move__item__description', movesTemplat).textContent = film.overview.split(' ').slice(0, 10).join(' ') + ' ...';
        selectElement('.move__item__date', movesTemplat).textContent = normiliseDate(film.release_date);
        selectElement('.move__item__date', movesTemplat).setAttribute('datetime', normiliseDate(film.release_date));

        const elGenresList = selectElement('.move__ganres-list', movesTemplat);
        elGenresList.innerHTML = null;


        film.genres.forEach(genre => {
            const newLi = createDOM('li');
            newLi.textContent = genre;

            elGenresList.appendChild(newLi);
        });

        element.appendChild(movesTemplat);
    });

};

renderMoves(films, elMovesList);

function sortFilm(filmsArr, format) {

    //qiyin usulda sortlash
    // if (format === 'a-z') {
    //     return filmsArr.sort((a, b) => {
    //         if (a.title > b.title) {
    //             return 1
    //         } else if (a.title < b.title) {
    //             return -1
    //         } else {
    //             return 0
    //         }
    //     })
    // } else if (format === 'z-a') {
    //     return filmsArr.sort((a, b) => {
    //         if (a.title > b.title) {
    //             return -1
    //         } else if (a.title < b.title) {
    //             return 1
    //         } else {
    //             return 0
    //         }
    //     });
    // } else if (format === 'new-old') {
    //     return filmsArr.sort((a, b) => {
    //         if (a.release_date > b.release_date) {
    //             return -1
    //         } else if (a.release_date < b.release_date) {
    //             return 1
    //         } else {
    //             return 0
    //         }

    //     });
    // } else if (format === 'old-new') {
    //     return filmsArr.sort((a, b) => {
    //         if (a.release_date > b.release_date) {
    //             return 1
    //         } else if (a.release_date < b.release_date) {
    //             return -1
    //         } else {
    //             return 0
    //         }

    //     });
    // } else if (format === 'all') {
    //     return filmsArr;
    // }
    
    //oson usulda so'rtlash==========

    const sortAlfb = filmsArr.sort((a, b) => {
        if (a.title > b.title) {
            return 1
        } else if (a.title < b.title) {
            return -1
        } else {
            return 0
        }
    });

    const sortedDate = filmsArr.sort((a, b) => a.release_date - b.release_date);

    if (format === 'a-z') {
        return sortAlfb;
    } else if (format === 'z-a') {
        return sortAlfb.reverse();
    } else if (format === 'old-new') {
        return sortedDate
    } else if (format === 'new-old') {
        return sortedDate.reverse();
    }
}

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    const inputSearchValue = elInputSearch.value.trim();
    const sortValu = elSelectSort.value.trim();
    const selectGenres = elSelectGenres.value.trim();
    
    let foundFilm = [];
    if (selectGenres === 'All') {
        foundFilm = films;
    } else {
        foundFilm = films.filter(film => film.genres.includes(selectGenres));
    }
    
    console.log(foundFilm);
    const regex = new RegExp(inputSearchValue, 'gi');

    const searchedFilms = films.filter((film) => film.title.match(regex));//sorch ishlamadi
    const sortedFilm = sortFilm(foundFilm, sortValu);
    
    renderMoves(sortedFilm, elMovesList);
});