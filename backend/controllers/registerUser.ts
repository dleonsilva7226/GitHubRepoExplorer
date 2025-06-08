import { NextFunction } from "express-serve-static-core"
import {Request, Response} from 'express'
import { newUser, RegisterRequest, UserInfo } from "../interfaces/types"
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient): Promise<void> => {
    const {email, password}: RegisterRequest = req.body;
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Email or password missing"
        })
    }

    //checking if the email is a valid format
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({
            success: false,
            message: "Email not properly formatted"
        })
        return;
    }

    //checks for existing user here
     //query the DB here to check that email address exists
    //code would start on this line
    // inDatabase is a mock result of seeing if we find the user's email in the database
    const currentUser: UserInfo | null = await prisma.user.findUnique({
            where: {
                email: email
            }, select: {
                id: true,
                email: true,
                password: true 
            }
        });
    

    // if currentUser is not null, then the user already exists
    // and we should not allow them to register again
    if (currentUser) {
        res.status(403).json({
            success: false,
            message: "User email already in database" 
        })
        return;
    }
    let newPassword: string;
    const saltRounds = 10;
    const hash: string = await bcrypt.hash(password, saltRounds);

    //save user to database
    const newUser: newUser = await prisma.user.create(   {
        data: {
            email: email,
            password: hash,
        }
    });

    // token creation
    if (!process.env.JWT_SECRET) {
        res.status(500).json({
            success: false,
            message: "JWT secret not set"
        });
        return;
    }

    const token = jwt.sign({ 
        id: newUser.id,
        email: newUser.email
     }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: newUser.id,
            email: newUser.email,
        },
        token: token // This should be replaced with actual token generation logic
    });

    
    





}