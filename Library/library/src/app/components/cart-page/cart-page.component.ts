import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBorrowRegister } from 'src/app/interfaces/IBorrowRegister';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import { User } from 'src/app/models/User';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  cart!:Cart;

  constructor(private cartService:CartService, private bookService:BookService, private router:Router){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  ngOnInit(): void {

  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.book.id);
  }

  borrow(){
    const userJSON = localStorage.getItem('User');
    const user = JSON.parse(userJSON!) as User;
    const today = new Date();
    this.cart.items.forEach(book => {
      const borrow :IBorrowRegister = {
        bookId: book.book.id,
        borrowDate: today.toLocaleDateString(),
        userId: user.id
      };
      this.bookService.borrowBooks(borrow).subscribe(_ => {
        this.router.navigateByUrl('/borrowings/' + user.id);
      });
    })
    this.cartService.clearCart();
  }
}
