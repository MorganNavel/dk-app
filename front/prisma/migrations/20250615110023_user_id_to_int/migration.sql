/*
  Warnings:

  - Made the column `idTeacher` on table `Lessons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `session` required. This step will fail if there are existing NULL values in that column.

*/


DELETE FROM "account" WHERE "userId" IS NULL;
DELETE FROM "Lessons" WHERE "idTeacher" IS NULL;
DELETE FROM "session" WHERE "userId" IS NULL;

-- AlterTable
ALTER TABLE "Lessons" ALTER COLUMN "idTeacher" SET NOT NULL;

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "userId" SET NOT NULL;
