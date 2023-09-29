import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/Book';
import { User } from 'src/app/models/User';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  books:Book[] = [];
  constructor(private bookService: BookService, activatedRoute:ActivatedRoute){
    let booksObservable:Observable<Book[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm){
        booksObservable = this.bookService.getAllBooksBySearch(params.searchTerm);
      } else if(params.genre){
        booksObservable = this.bookService.getAllBooksByGenre(params.genre);
      } else {
        booksObservable = bookService.getAll();
      }
      booksObservable.subscribe((serverBooks) => {
        this.books = serverBooks;
      })
    })
  }

  ngOnInit(): void {
  }
}
