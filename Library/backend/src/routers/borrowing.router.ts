import { Router } from "express";
import { sample_books, sample_genres } from "../data";
import asyncHandler from 'express-async-handler';
import { Borrowing, BorrowingModel } from "../models/borrowing.model";

const router = Router();

router.get("/:userId", asyncHandler(
    async(req, res) =>{
        const books = await BorrowingModel.find({userId: req.params.userId});
        res.send(books);
    }
))

router.get("/", asyncHandler(
    async(req, res) =>{
        const books = await BorrowingModel.find();
        res.send(books);
    }
))

router.delete("/:bookId", asyncHandler(
    async(req, res) => {
        const result = await BorrowingModel.deleteOne({_id: req.params.bookId});
        res.send(result);
    }
))

router.post("/", asyncHandler(
    async(req, res) => {
        var {bookId, borrowDate, userId} = req.body;
        const newBorrow:Borrowing = {
            bookId: bookId,
            borrowDate: borrowDate,
            userId: userId
        }
        const dbBorrow = await BorrowingModel.create(newBorrow);
        res.send(dbBorrow);
    }
))

export default router;