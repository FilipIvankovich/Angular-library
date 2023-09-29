const BASE_URL = 'http://localhost:5000';

export const BOOKS_URL = BASE_URL + '/api/books';
export const BOOKS_GENRES_URL = BOOKS_URL + '/genres';
export const BOOKS_BY_SEARCH_URL = BOOKS_URL + '/search/';
export const BOOKS_BY_GENRE_URL = BOOKS_URL + '/genre/';
export const BOOK_BY_ID_URL = BOOKS_URL + '/book/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const BORROWINGS_URL = BASE_URL + '/api/borrowings/';
