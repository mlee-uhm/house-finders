-- CreateEnum
CREATE TYPE "Subrole" AS ENUM ('LANDLORD', 'RENTER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subrole" "Subrole" NOT NULL DEFAULT 'RENTER';
