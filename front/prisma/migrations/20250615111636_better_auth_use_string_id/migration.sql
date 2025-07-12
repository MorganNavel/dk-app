/*
  Warnings:

  - The primary key for the `_UsersToBookings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_UsersToLessons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

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

-- AlterTable
ALTER TABLE "Bookings" ALTER COLUMN "idUser" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Lessons" ALTER COLUMN "idTeacher" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_UsersToBookings" DROP CONSTRAINT "_UsersToBookings_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_UsersToBookings_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_UsersToLessons" DROP CONSTRAINT "_UsersToLessons_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_UsersToLessons_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_new_seq";

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
