import { prisma } from '../prisma/prisma';
import express, { NextFunction, Router } from 'express'
import {Request, Response} from 'express'
import { verifyToken } from '../middleware/verifyToken';
import { getUserFavRepoData } from '../controllers/getUserFavRepoData';
import { deleteUserFavRepo } from '../controllers/deleteUserFavRepo';
import { addUserFavRepo } from '../controllers/addUserFavRepo';

export const userRouter: Router = express.Router();

userRouter.use(verifyToken);

// done - just test
userRouter.route('favorites').get(async (req: Request, res: Response, next: NextFunction) => {
    await getUserFavRepoData(req, res, next, prisma);
})

// done - just test
userRouter.route('favorites').post(async (req: Request, res: Response, next: NextFunction) => {
    await addUserFavRepo(req, res, next, prisma);
})

// done - just test
userRouter.route('favorites/:id').delete(async (req: Request, res: Response, next: NextFunction) => {
    await deleteUserFavRepo(req, res, next, prisma);
})