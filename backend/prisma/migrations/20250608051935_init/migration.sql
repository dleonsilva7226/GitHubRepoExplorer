/*
  Warnings:

  - You are about to drop the column `owner` on the `FavoriteRepo` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `FavoriteRepo` table. All the data in the column will be lost.
  - Added the required column `language` to the `FavoriteRepo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repoUrl` to the `FavoriteRepo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starCount` to the `FavoriteRepo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteRepo" DROP COLUMN "owner",
DROP COLUMN "url",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "repoUrl" TEXT NOT NULL,
ADD COLUMN     "starCount" INTEGER NOT NULL;
