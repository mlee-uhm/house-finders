/*
  Warnings:

  - Changed the type of `sqft` on the `Property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "sqft",
ADD COLUMN     "sqft" INTEGER NOT NULL;
