import { Injectable } from '@angular/core';
import { Cart } from '../models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/Book';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(book:Book):void{
    let cartItem = this.cart.items.find(item => item.book.id === book.id);

    if(cartItem){
      return;
    }

    this.cart.items.push(new CartItem(book));
    this.setCartToLocalStorage();
  }

  removeFromCart(bookId: string):void{
    this.cart.items = this.cart.items.filter(item => item.book.id != bookId);
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage():void{
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(){
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
