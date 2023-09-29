import { Schema, model } from "mongoose";

export interface Book{
    name:string;
    author:string;
    genres:string[];
    imageUrl:string;
    details:string;
    pageNo:number;
    publishDate:string;
}

export const BookSchema = new Schema<Book>(
    {
        name: {type: String, required: true},
        author: {type: String, required: true},
        genres: {type: [String], required: true},
        imageUrl: {type: String, required: true},
        details: {type: String, required: true},
        pageNo: {type: Number, required: true},
        publishDate: {type: String, required: true}
    }, {
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals:true
        },
        timestamps: true
    }
);

export const BookModel = model<Book>('book', BookSchema);