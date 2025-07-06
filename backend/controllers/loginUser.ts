import { NextFunction } from "express-serve-static-core"
import { Request, Response } from 'express'
import { LoginRequest, UserInfo } from "../interfaces/types";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

//add database stuff here. find a way to get it
export const loginUser = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient): Promise<void> => {
    const { email, password } = req.body as LoginRequest;

    //checking if email or password is missing
    if (!email || !password) {
        res.status(400).json({
            message: "Need to provide email or password"
        });
        return;
    }

    //checking if the email is a valid format
    const emailRegex: RegExp= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({
            message: "Email not properly formatted"
        })
        return;
    }

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

    if (currentUser === null) {
        res.status(403).json(
            {
               success: false,
               message: "Email address not in database" 
            }
        )
        return;
    }


    // token creation
    if (!process.env.JWT_SECRET) {
        res.status(500).json({
            success: false,
            message: "JWT secret not set"
        });
        return;
    }

    //figure out how to do this with http cookies or JWTs
    const token = jwt.sign({ 
            id: currentUser.id,
            email: currentUser.email
     }, process.env.JWT_SECRET, { expiresIn: '2h' });
    

    //this here would be generated from the db and checks if the password is correct
    const hashedPassword: string = currentUser.password;
    bcrypt.compare(password, hashedPassword).then((result: boolean) => {
        if (result) {
            res.status(200).json({
                success: true,
                message: "Correct. User Login Happening Now",
                user: {
                    id: currentUser.id,
                    email: currentUser.email,
                },
                token: token
            })
        } else {
            res.status(403).json({
                success: false, 
                message: 'passwords do not match'
            })
        }
    }).catch((error: Error) => {
        res.status(400).json
        ({   
            success: false,
            message: `Error occurred with password verification`
        })
    });

}