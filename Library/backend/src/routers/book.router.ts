import { Router } from "express";
import { sample_books, sample_genres } from "../data";
import asyncHandler from 'express-async-handler';
import { Book, BookModel } from "../models/book.model";
import { Borrowing, BorrowingModel } from "../models/borrowing.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) =>{
        const booksCount = await BookModel.countDocuments();
        if(booksCount > 0){
            res.send("Seed is already done!");
            return;
        }
        
        await BookModel.create(sample_books);
        res.send("Seed is done!");
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const books = await BookModel.find();
        res.send(books);
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async(req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const books = await BookModel.find({name: {$regex:searchRegex}});
        res.send(books);
    }
))

router.get("/genres", asyncHandler(
    async (req, res) =>{
        const genres = await BookModel.aggregate([
            {
                $unwind:'$genres'
            },
            {
                $group:{
                    _id: '$genres',
                    count: {$sum: 1}
                }
            },
            {
                $project:{
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1});

        const all = {
            name: 'All',
            count: await BookModel.countDocuments()
        }

        genres.unshift(all);
        res.send(genres);
    }
))

router.get("/genre/:genre", asyncHandler(
    async(req, res) =>{
        const books = await BookModel.find({genres: req.params.genre})
        res.send(books);
    }
))

router.get("/book/:id", asyncHandler(
    async(req, res) =>{
        const book = await BookModel.findById(req.params.id)
        res.send(book);
    }
))

router.post("/", asyncHandler(
    async(req, res) => {
        var {name, author, genres, imageUrl, details, pageNo, publishDate} = req.body;
        const newBook:Book = {
            name: name,
            author: author,
            genres: genres,
            imageUrl: imageUrl,
            details: details,
            pageNo: pageNo,
            publishDate: publishDate

        }
        const dbBook = await BookModel.create(newBook);
        res.send(dbBook);
    }
))

router.delete("/:bookId", asyncHandler(
    async(req, res) => {
        const result = await BookModel.deleteOne({_id: req.params.bookId});
        res.send(result);
    }
))

export default router;