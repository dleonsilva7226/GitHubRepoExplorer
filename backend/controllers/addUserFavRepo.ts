import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { AddFavoriteRepoRequest } from "../interfaces/types";

export const addUserFavRepo = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient): Promise<void> => {
    try {
        const body: AddFavoriteRepoRequest = req.body;
        const { githubRepoId, name, description, starCount, language, repoUrl } = body;
        const userId: number | undefined = req.user?.user.id;

        // Validate input
        if (!githubRepoId || typeof githubRepoId !== 'number' || !name || !description || !starCount || typeof starCount !== 'number' || !language || !repoUrl || !userId) {
            res.status(400).json({
                success: false,
                message: "Missing required fields: userId, githubRepoId, name, or repoUrl"
            });
            return;
        }

        // Check if the repository already exists for the user
        const existingRepo = await prisma.favoriteRepo.findUnique({
            where: {
                userId_githubRepoId: {
                    userId: userId,
                    githubRepoId: githubRepoId
                }
            }
        });

        if (existingRepo) {
            res.status(409).json({
                success: false,
                message: "Repository already exists in favorites"
            });
            return;
        }

        // Create new favorite repository entry
        const newFavRepo = await prisma.favoriteRepo.create({
            data: {
                userId,
                githubRepoId,
                name,
                description,
                starCount,
                language,
                repoUrl,
            }
        });

        if (!newFavRepo) {
            res.status(500).json({
                success: false,
                message: "Failed to add favorite repository"
            });
            return;
        }

        // If creation was successful, send a success response
        res.status(200).json({
            success: true,
            message: "Favorite repository added successfully",
        });
        return;
    } catch (error) {
        console.error("Error adding favorite repository:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}