import { Injectable } from '@angular/core';
import { sample_books, sample_genres } from 'src/data';
import { Book } from '../models/Book';
import { Genre } from '../models/Genre';
import { HttpClient } from '@angular/common/http';
import { BOOKS_BY_GENRE_URL, BOOKS_BY_SEARCH_URL, BOOKS_GENRES_URL, BOOKS_URL, BOOK_BY_ID_URL, BORROWINGS_URL } from '../constants/urls';
import { Observable } from 'rxjs';
import { Borrowing } from '../models/Borrowing';
import { IBorrowRegister } from '../interfaces/IBorrowRegister';
import { IBookRegister } from '../interfaces/IBookRegister';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Book[]>{
    return this.http.get<Book[]>(BOOKS_URL);
  }

  getAllBooksBySearch(searchTerm: String){
    return this.http.get<Book[]>(BOOKS_BY_SEARCH_URL + searchTerm);
  }

  getAllGenres():Observable<Genre[]>{
    return this.http.get<Genre[]>(BOOKS_GENRES_URL);
  }

  getAllBooksByGenre(genre:string):Observable<Book[]>{
    return genre=="All" ? this.getAll() : this.http.get<Book[]>(BOOKS_BY_GENRE_URL + genre);
  }

  getBookById(bookId: string): Observable<Book>{
    return this.http.get<Book>(BOOK_BY_ID_URL + bookId);
  }

  getAllBorrowings():Observable<Borrowing[]> {
    return this.http.get<Borrowing[]>(BORROWINGS_URL);
  }

  getBorrowings(userId: string): Observable<Borrowing[]> {
    return this.http.get<Borrowing[]>(BORROWINGS_URL + userId);
  }

  getBorrowedBook(bookId: string){
    return this.http.get<Book>(BOOK_BY_ID_URL + bookId);
  }

  deleteBook(id: string){
    return this.http.delete(BORROWINGS_URL + id).subscribe();
  }

  borrowBooks(borrowRegister: IBorrowRegister): Observable<Borrowing>{
    return this.http.post<Borrowing>(BORROWINGS_URL, borrowRegister);
  }

  addBook(bookRegister: IBookRegister): Observable<Book>{
    return this.http.post<Book>(BOOKS_URL, bookRegister);
  }

  removeBook(id: string){
    return this.http.delete(BOOKS_URL + "/" + id);
  }
}
