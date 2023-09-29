import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { GenresComponent } from './components/genres/genres.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './components/input-container/input-container.component';
import { InputValidationComponent } from './components/input-validation/input-validation.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { BorrowingsComponent } from './components/borrowings/borrowings.component';
import { AddBookComponent } from './components/add-book/add-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    GenresComponent,
    BookPageComponent,
    CartPageComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    RegisterPageComponent,
    LoadingComponent,
    BorrowingsComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right'
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
