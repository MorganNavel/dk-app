/*
  Warnings:

  - You are about to drop the `_UsersToBookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UsersToLessons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UsersToBookings" DROP CONSTRAINT "_UsersToBookings_A_fkey";

-- DropForeignKey
ALTER TABLE "_UsersToBookings" DROP CONSTRAINT "_UsersToBookings_B_fkey";

-- DropForeignKey
ALTER TABLE "_UsersToLessons" DROP CONSTRAINT "_UsersToLessons_A_fkey";

-- DropForeignKey
ALTER TABLE "_UsersToLessons" DROP CONSTRAINT "_UsersToLessons_B_fkey";

-- DropTable
DROP TABLE "_UsersToBookings";

-- DropTable
DROP TABLE "_UsersToLessons";
