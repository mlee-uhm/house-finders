/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Property` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "images" TEXT[];

-- CreateTable
CREATE TABLE "Stuff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "condition" "Condition" NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Stuff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_address_key" ON "Property"("address");
