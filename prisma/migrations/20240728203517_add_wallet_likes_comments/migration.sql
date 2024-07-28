/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `newsId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `newsArticleId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_newsId_fkey";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_categoryId_fkey";

-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "createdAt",
DROP COLUMN "newsId",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "newsArticleId" INTEGER NOT NULL,
ADD COLUMN     "user" TEXT NOT NULL;

-- DropTable
DROP TABLE "News";

-- CreateTable
CREATE TABLE "NewsArticle" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "userEmail" TEXT,
    "userWallet" TEXT,
    "categoryId" INTEGER NOT NULL,
    "popularity" TEXT,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsArticle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NewsArticle" ADD CONSTRAINT "NewsArticle_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_newsArticleId_fkey" FOREIGN KEY ("newsArticleId") REFERENCES "NewsArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
