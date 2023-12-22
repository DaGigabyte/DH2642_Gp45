import { TMDB_API_KEY, TMDB_BASE_URL } from "./apiConfig";

/* 

---------- TMDB ---------- 
The poster_path returned shall be appended to the following URL: https://image.tmdb.org/t/p/original/ 
in order to get the image corresponding to a paricular movie. 

For more advanced features and customization related to the image generation read here https://developer.themoviedb.org/docs/image-basics

Other interesting properties:

id: the tmdb id of the movie
original_title: the original title of the movie
release_date: the release date of the movie, format is "1997-11-18"

*/

/*
    Retrieves information about a movie given the id from TMDB
    Read more https://developer.themoviedb.org/reference/movie-details
*/
function movieById(id) {
    const endpoint = 'movie/';
    const url = TMDB_BASE_URL + endpoint + id;

    const options = { 
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: TMDB_API_KEY
        }
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('http error, status code: ' + response.status);
            }
            return response.json();
        })
}

/* 
    Retrieves information about movies matching the searchQuery string from TMDB
    Returns an array, if no results are found an empty array is returned
    Read more https://developer.themoviedb.org/reference/search-movie
*/
function searchMovie(searchQuery) {
    const endpoint = 'search/movie?';

    const params = new URLSearchParams();
    params.append('query', searchQuery);
    params.append('include_adult', 'false');
    params.append('page', '1');

    const url = TMDB_BASE_URL + endpoint + params.toString();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: TMDB_API_KEY
        }
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('http error, status code: ' + response.status);
            }
            return response.json();
        })
        .then(result => result.results)
}

function listOfGenre() {
    const url = TMDB_BASE_URL + 'genre/movie/list?language=en';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: TMDB_API_KEY
    }
    };

    return fetch(url, options)
    .then(res => {
        if (!res.ok) {
            throw new Error('http error, status code: ' + res.status);
        }
        return res.json();
    })
    .then(json => {
        return json.genres;
    })
}

export { searchMovie, movieById, listOfGenre }