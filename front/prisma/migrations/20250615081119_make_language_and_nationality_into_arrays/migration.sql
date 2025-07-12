/*
  Warnings:

  - The `languages` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `nationality` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "languages",
ADD COLUMN     "languages" TEXT[],
DROP COLUMN "nationality",
ADD COLUMN     "nationality" TEXT[];
