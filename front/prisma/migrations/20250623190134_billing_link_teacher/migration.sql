/*
  Warnings:

  - Added the required column `idTeacher` to the `Billing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Billing" ADD COLUMN     "idTeacher" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_idTeacher_fkey" FOREIGN KEY ("idTeacher") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
