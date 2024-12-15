/*
  Warnings:

  - The values [excellent,good,fair,poor] on the enum `Condition` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Condition_new" AS ENUM ('AVAILABLE', 'PENDING', 'UNAVAILABLE');
ALTER TABLE "Property" ALTER COLUMN "condition" TYPE "Condition_new" USING ("condition"::text::"Condition_new");
ALTER TABLE "Stuff" ALTER COLUMN "condition" TYPE "Condition_new" USING ("condition"::text::"Condition_new");
ALTER TYPE "Condition" RENAME TO "Condition_old";
ALTER TYPE "Condition_new" RENAME TO "Condition";
DROP TYPE "Condition_old";
COMMIT;

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "images" SET DEFAULT ARRAY[]::TEXT[];
