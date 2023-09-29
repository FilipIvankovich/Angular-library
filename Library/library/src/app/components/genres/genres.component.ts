import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/Genre';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit{

  genres?:Genre[];
  constructor(bookService:BookService){
    bookService.getAllGenres().subscribe(serverGenres => {
      this.genres = serverGenres;
    });
  }

  ngOnInit(): void {

  }
}
