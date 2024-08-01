-- AlterTable
ALTER TABLE "User" ADD COLUMN     "token" TEXT,
ALTER COLUMN "walletAddress" DROP NOT NULL;
