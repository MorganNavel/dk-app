/*
  Warnings:

  - The `idUser` column on the `Bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_UsersToBookings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_UsersToLessons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `idTeacher` on the `Lessons` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_UsersToBookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_UsersToLessons` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_idUser_fkey";

-- DropForeignKey
ALTER TABLE "Lessons" DROP CONSTRAINT "Lessons_idTeacher_fkey";

-- DropForeignKey
ALTER TABLE "_UsersToBookings" DROP CONSTRAINT "_UsersToBookings_B_fkey";

-- DropForeignKey
ALTER TABLE "_UsersToLessons" DROP CONSTRAINT "_UsersToLessons_B_fkey";

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- Step 1: Add new columns with the correct type
ALTER TABLE "Bookings" ADD COLUMN "idUser_new" INTEGER;
ALTER TABLE "Lessons" ADD COLUMN "idTeacher_new" INTEGER;
ALTER TABLE "_UsersToBookings" ADD COLUMN "B_new" INTEGER;
ALTER TABLE "_UsersToLessons" ADD COLUMN "B_new" INTEGER;
ALTER TABLE "account" ADD COLUMN "userId_new" INTEGER;
ALTER TABLE "session" ADD COLUMN "userId_new" INTEGER;
ALTER TABLE "user" ADD COLUMN "id_new" SERIAL;

-- Step 2: Migrate data (assuming old columns are string and can be cast to integer, otherwise you need a mapping)
-- Example: If you have a mapping table or logic, use it here. Otherwise, adjust as needed.
-- UPDATE "Bookings" SET "idUser_new" = CAST("idUser" AS INTEGER);
-- UPDATE "Lessons" SET "idTeacher_new" = CAST("idTeacher" AS INTEGER);
-- UPDATE "_UsersToBookings" SET "B_new" = CAST("B" AS INTEGER);
-- UPDATE "_UsersToLessons" SET "B_new" = CAST("B" AS INTEGER);
-- UPDATE "account" SET "userId_new" = CAST("userId" AS INTEGER);
-- UPDATE "session" SET "userId_new" = CAST("userId" AS INTEGER);

-- Step 3: Drop constraints, old columns, rename new columns, and recreate constraints
ALTER TABLE "Bookings" DROP COLUMN "idUser";
ALTER TABLE "Bookings" RENAME COLUMN "idUser_new" TO "idUser";

ALTER TABLE "Lessons" DROP COLUMN "idTeacher";
ALTER TABLE "Lessons" RENAME COLUMN "idTeacher_new" TO "idTeacher";

ALTER TABLE "_UsersToBookings" DROP CONSTRAINT "_UsersToBookings_AB_pkey";
ALTER TABLE "_UsersToBookings" DROP COLUMN "B";
ALTER TABLE "_UsersToBookings" RENAME COLUMN "B_new" TO "B";
ALTER TABLE "_UsersToBookings" ADD CONSTRAINT "_UsersToBookings_AB_pkey" PRIMARY KEY ("A", "B");

ALTER TABLE "_UsersToLessons" DROP CONSTRAINT "_UsersToLessons_AB_pkey";
ALTER TABLE "_UsersToLessons" DROP COLUMN "B";
ALTER TABLE "_UsersToLessons" RENAME COLUMN "B_new" TO "B";
ALTER TABLE "_UsersToLessons" ADD CONSTRAINT "_UsersToLessons_AB_pkey" PRIMARY KEY ("A", "B");

ALTER TABLE "account" DROP COLUMN "userId";
ALTER TABLE "account" RENAME COLUMN "userId_new" TO "userId";

ALTER TABLE "session" DROP COLUMN "userId";
ALTER TABLE "session" RENAME COLUMN "userId_new" TO "userId";

ALTER TABLE "user" DROP CONSTRAINT "user_pkey";
ALTER TABLE "user" DROP COLUMN "id";
ALTER TABLE "user" RENAME COLUMN "id_new" TO "id";
ALTER TABLE "user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "_UsersToBookings_B_index" ON "_UsersToBookings"("B");

-- CreateIndex
CREATE INDEX "_UsersToLessons_B_index" ON "_UsersToLessons"("B");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_idTeacher_fkey" FOREIGN KEY ("idTeacher") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersToBookings" ADD CONSTRAINT "_UsersToBookings_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersToLessons" ADD CONSTRAINT "_UsersToLessons_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
