/*
  Warnings:

  - Added the required column `endDate` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "endDate" TIMESTAMP(0) NOT NULL;
UPDATE "Lesson" SET "endDate" = "startDate" + INTERVAL '1 minute' * COALESCE("duration", 50);

ALTER TABLE "Lesson" ALTER COLUMN "endDate" SET NOT NULL;
