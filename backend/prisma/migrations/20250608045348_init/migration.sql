/*
  Warnings:

  - You are about to drop the column `repoName` on the `FavoriteRepo` table. All the data in the column will be lost.
  - You are about to drop the column `repoUrl` on the `FavoriteRepo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,githubRepoId]` on the table `FavoriteRepo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `githubRepoId` to the `FavoriteRepo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `FavoriteRepo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `FavoriteRepo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `FavoriteRepo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteRepo" DROP COLUMN "repoName",
DROP COLUMN "repoUrl",
ADD COLUMN     "githubRepoId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteRepo_userId_githubRepoId_key" ON "FavoriteRepo"("userId", "githubRepoId");
