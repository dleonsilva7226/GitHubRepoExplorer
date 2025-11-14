// import { prisma } from '../prisma/prisma';
import express, { NextFunction, Router } from 'express'
import {Request, Response} from 'express'
import { verifyToken } from '../middleware/verifyToken';
import { getUserFavRepoData } from '../controllers/getUserFavRepoData';
import { deleteUserFavRepo } from '../controllers/deleteUserFavRepo';
import { addUserFavRepo } from '../controllers/addUserFavRepo';
import { supabase } from '../lib/supabaseClient';

export const userRouter: Router = express.Router();

userRouter.use(verifyToken);

// GET /favorite-repos - Get all favorite repos for the authenticated user
userRouter.route('/favorite-repos').get(async (req: Request, res: Response, next: NextFunction) => {
    await getUserFavRepoData(req, res, next, supabase);
})

// POST /favorite-repos - Add a favorite repo
userRouter.route('/favorite-repos').post(async (req: Request, res: Response, next: NextFunction) => {
    await addUserFavRepo(req, res, next, supabase);
})

// DELETE /favorite-repos/:id - Delete a favorite repo by githubRepoId
userRouter.route('/favorite-repos/:id').delete(async (req: Request, res: Response, next: NextFunction) => {
    await deleteUserFavRepo(req, res, next, supabase);
})