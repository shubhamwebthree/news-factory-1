/*
  Warnings:

  - You are about to drop the column `popularity` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `News` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "popularity",
DROP COLUMN "userEmail";
