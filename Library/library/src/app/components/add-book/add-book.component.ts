import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBookRegister } from 'src/app/interfaces/IBookRegister';
import { BookService } from 'src/app/services/book.service';
import { PasswordsMatchValidator } from 'src/app/validators/password_match_validator';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  registerForm!:FormGroup;
  isSubmitted = false;

  returnUrl = '';

  constructor(private formBuilder:FormBuilder, private bookService:BookService, private activatedRoute:ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      genres: [''],
      imageUrl: ['', [Validators.required]],
      details: ['', [Validators.required]],
      pageNo: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      publishDate: ['', [Validators.required]]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    var genres = document.querySelectorAll('input[name="genres"]:checked');
    let genresVal = new Array<string>;
    genres.forEach((genre) => {
      genresVal.push(genre ? genre.ariaValueText! : '');
    })

    const fv = this.registerForm.value;
    const book :IBookRegister = {
      name: fv.name,
      author: fv.author,
      genres: genresVal,
      imageUrl: fv.imageUrl,
      details: fv.details,
      pageNo: fv.pageNo,
      publishDate: fv.publishDate
    };

    console.log(book);

    this.bookService.addBook(book).subscribe(_ => {
        this.router.navigateByUrl(this.returnUrl);
    })
  }
}
