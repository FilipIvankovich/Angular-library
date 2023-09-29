export class Book{
  id!:string;
  name!:string;
  author!:string;
  genres!:string[];
  imageUrl!:string;
  details!:string;
  pageNo!:number;
  publishDate!:string;
  borrowDate?:string;
}
