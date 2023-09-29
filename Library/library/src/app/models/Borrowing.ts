import { ObjectId } from "mongodb";

export class Borrowing{
  _id!:string;
  borrowDate!:string;
  userId!:ObjectId;
  bookId!:ObjectId;
}
