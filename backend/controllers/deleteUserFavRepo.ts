import { NextFunction, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { DeleteFavoriteRepoRequest, ErrorResponse } from "../interfaces/types";

export const deleteUserFavRepo = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient): Promise<void> => {
    try {
        const requestBody: DeleteFavoriteRepoRequest = req.body;
        const { githubRepoId } = requestBody;
        const userId = req.user?.user.id; 
        
        //if id is not there
        if ((!userId ||  typeof userId !== 'number') || (!githubRepoId || typeof githubRepoId !== 'number')) {
            const missingIdErrorResponse: ErrorResponse = {
                success: false,
                message: "Missing githubRepoId or userId"
            }
            res.status(404).json(missingIdErrorResponse);
            return;
        }

        //checks if the repo is and if user owns the repo
        const repoExists = await prisma.favoriteRepo.findUnique(
            {
            where: {
                id: githubRepoId,
                userId: userId
            }
        }
        );
        
        if (repoExists === null || repoExists === undefined){
            res.status(404).json({
                success: false,
                message: "non-existent repo id or user does not own favorite repo"
            })
        }


        //check if deletion occurred
        const deletionOccurred: boolean = false;
        const deletedFavRepo = await prisma.favoriteRepo.delete(
            {
                where: {
                    id: githubRepoId
                }
            }
        );

        if (!deletedFavRepo) {
            res.status(404).json({
                success: false,
                message: "Deletion of favorite repository failed."
            });
            return;
        }

        // If deletion was successful, send a success response
        res.status(200).json({
            success: true,
            message: "Favorite repository deleted successfully.",
        });


    } catch (error) {
        console.error('Error deleting favorite repository:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}