/*
  Warnings:

  - You are about to drop the column `date` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "date",
DROP COLUMN "user",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
