import express, { NextFunction, Router } from 'express';
import { Request, Response } from 'express';
import { registerUser } from '../controllers/registerUser';
import { loginUser } from '../controllers/loginUser';
import { prisma } from '../prisma/prisma';
import { verifyToken } from '../middleware/verifyToken';

export const authRouter: Router = express.Router();

// authentication route - TESTED and works
authRouter.route('/register').post(async (req: Request, res: Response, next: NextFunction) => { await registerUser(req, res, next, prisma); })

// protected route
authRouter.route('/login').post(async (req: Request, res: Response, next: NextFunction) => { await loginUser(req, res, next, prisma); })

// done
authRouter.route('/protect').get(verifyToken, (req: Request, res: Response, next: NextFunction) => { res.status(200).json( req.user ); })