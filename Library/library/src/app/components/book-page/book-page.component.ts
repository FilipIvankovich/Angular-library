import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { Borrowing } from 'src/app/models/Borrowing';
import { User } from 'src/app/models/User';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit{

  book!: Book;
  borrowings!: Borrowing[];
  user!:User;
  returnUrl = '';

  constructor(activatedRoute: ActivatedRoute, private bookService:BookService, private cartService:CartService, private router:Router, userService:UserService){


    activatedRoute.params.subscribe((params) => {
      if(params.id){
        bookService.getBookById(params.id).subscribe(serverBook => {
          this.book = serverBook;
        });
      }
    });

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });

    this.bookService.getAllBorrowings().subscribe(borrowings => {
      this.borrowings = borrowings;
    });
  }

  ngOnInit(): void { }

  addToCart(){
    this.cartService.addToCart(this.book);
    this.router.navigateByUrl('/cart-page')
  }

  get isAuth(){
    return this.user.id;
  }

  removeBook(bookId: string){
    let bookBorrowed = false;
    this.borrowings.forEach(borrowing => {
      if(borrowing.bookId.toString() == bookId){
        bookBorrowed = true;
      }
    })
    if(bookBorrowed){
      alert("A user still has this book \nSo it can't be deleted at the moment.");
    }
    if(!bookBorrowed){
      this.bookService.removeBook(bookId).subscribe(_ => {
        this.router.navigateByUrl(this.returnUrl);
      });
    }
  }
}
