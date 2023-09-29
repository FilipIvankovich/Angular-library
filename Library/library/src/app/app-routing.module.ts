import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from './components/book-page/book-page.component';
import { HomeComponent } from './components/home/home.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { BorrowingsComponent } from './components/borrowings/borrowings.component';
import { AddBookComponent } from './components/add-book/add-book.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'search/:searchTerm', component:HomeComponent},
  {path:'genre/:genre', component:HomeComponent},
  {path:'book/:id', component:BookPageComponent},
  {path:'cart-page', component:CartPageComponent},
  {path:'login', component:LoginPageComponent},
  {path:'register', component:RegisterPageComponent},
  {path:'borrowings/:userId', component:BorrowingsComponent},
  {path:'addBook', component:AddBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
