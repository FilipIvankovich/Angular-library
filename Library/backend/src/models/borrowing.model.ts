import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

export interface Borrowing{
    borrowDate:string;
    userId:ObjectId;
    bookId:ObjectId;
}

export const BorrowingSchema = new Schema<Borrowing>(
    {
        borrowDate:{type: String, required: true},
        userId:{type: ObjectId, required: true},
        bookId:{type: ObjectId, required: true}
    },
    {
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals:true
        },
        timestamps: true
    }
);

export const BorrowingModel = model<Borrowing>('borrowing', BorrowingSchema);