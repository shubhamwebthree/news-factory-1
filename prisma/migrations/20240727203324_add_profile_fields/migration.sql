-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ALTER COLUMN "walletAddress" DROP NOT NULL;
