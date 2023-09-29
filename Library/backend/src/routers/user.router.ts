import { Router} from "express";
import { sample_users } from "../data";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) =>{
        const usersCount = await UserModel.countDocuments();
        if(usersCount > 0){
            res.send("Seed is already done!");
            return;
        }
        
        await UserModel.create(sample_users);
        res.send("Seed is done!");
    }
))

router.post("/login", asyncHandler(
    async (req, res) => {
        var {email, password} = req.body;
        email = email.toLowerCase();
        const user = await UserModel.findOne({email});
    
        if(user && (await bcrypt.compare(password, user.password))){
            res.send(generateTokenResponse(user));
        } else {
            res.status(HTTP_BAD_REQUEST).send("User email or password is not valid.");
        }
    }
))

router.post('/register', asyncHandler(
    async(req,res) => {
        var {name, email, password} = req.body;
        email = email.toLowerCase();
        const user = await UserModel.findOne({email});
        if (user) {
            res.status(HTTP_BAD_REQUEST).send("User with this email already exists!");
            return;
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser:User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            isAdmin: false
        }
        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));

    }
))

const generateTokenResponse = (user:any) => {
    const token = jwt.sign(
        {email:user.email, isAdmin:user.isAdmin},
        "somerandomtext",
        {expiresIn:"30d"}
    );

    user.token = token;
    return user;
}

export default router;