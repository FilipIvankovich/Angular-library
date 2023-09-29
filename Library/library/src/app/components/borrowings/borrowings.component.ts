import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BORROWINGS_URL } from 'src/app/constants/urls';
import { Book } from 'src/app/models/Book';
import { Borrowing } from 'src/app/models/Borrowing';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-borrowings',
  templateUrl: './borrowings.component.html',
  styleUrls: ['./borrowings.component.css']
})

export class BorrowingsComponent implements OnInit{

  books:Book[] = [];
  borrowings:Borrowing[] = [];
  userId: Number = 0;
  constructor(private bookService: BookService, activatedRoute:ActivatedRoute, private router:Router){
    let borrowingsObservable:Observable<Borrowing[]>;

    activatedRoute.params.subscribe((params) => {
      this.userId = params.userId;
      borrowingsObservable = bookService.getBorrowings(params.userId);
      borrowingsObservable.subscribe((serverBorrowings) => {
        if(serverBorrowings.length != 0){
          this.borrowings = serverBorrowings;

          this.borrowings.forEach(borrowing => {
            bookService.getBookById(borrowing.bookId.toString()).subscribe(serverBook => {
              serverBook.borrowDate = borrowing.borrowDate;
              this.books.push(serverBook);
            });
          })
        }
        else{
          this.borrowings = [];
        }
      });
    })
  }

  delete(bookId: string){
    let borrow = this.borrowings.find(borrowing => borrowing.bookId.toString() == bookId)
    console.log(borrow);
    if(borrow!._id != undefined){
      console.log(borrow!._id);
      this.bookService.deleteBook(borrow!._id);
      location.reload();
    }
  }

  ngOnInit(): void {

  }

}
