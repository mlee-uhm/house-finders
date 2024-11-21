/*
  Warnings:

  - Added the required column `landlord` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "landlord" TEXT NOT NULL;
