/*
  Warnings:

  - You are about to drop the `Bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lessons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_idLesson_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_idUser_fkey";

-- DropForeignKey
ALTER TABLE "Lessons" DROP CONSTRAINT "Lessons_idTeacher_fkey";

-- DropTable
DROP TABLE "Bookings";

-- DropTable
DROP TABLE "Lessons";

-- CreateTable
CREATE TABLE "Booking" (
    "idBooking" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "idUser" TEXT NOT NULL,
    "idLesson" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("idBooking")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "idLesson" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "startDate" TIMESTAMP(0) NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 50,
    "earned" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "LessonStatus" NOT NULL DEFAULT 'planned',
    "groupSize" INTEGER NOT NULL DEFAULT 2,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "idTeacher" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("idLesson")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_idUser_idLesson_key" ON "Booking"("idUser", "idLesson");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_idLesson_fkey" FOREIGN KEY ("idLesson") REFERENCES "Lesson"("idLesson") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_idTeacher_fkey" FOREIGN KEY ("idTeacher") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
