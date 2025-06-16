import { PrismaClient } from '@prisma/client';
import { NextFunction } from 'express';
import { Request, Response } from 'express';

export const getUserFavRepoData = async (req: Request, res: Response, next: NextFunction, prisma: PrismaClient): Promise<void> => {
  try {
    const userId: number | undefined = req.user?.user.id; // Assuming user ID is stored in req.user after authentication
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID not found.' });
      return;
    }

    const favorites = await prisma.favoriteRepo.
    findMany({
      where: { userId: userId },
      select: {
        id: true,
        name: true,
        description: true,
        starCount: true,
        repoUrl: true,
        language: true,
      },
    });

    if (!favorites || favorites.length === 0) {
      res.status(404).json({ message: 'No favorite repositories found.' });
      return;
    }

    res.status(200).json(favorites);
    return;
  } catch (error) {
    console.error('Error fetching favorite repositories:', error);
    res.status(500).json({ message: 'Internal server error.' });
    return;
  }
}
