-- CreateEnum
CREATE TYPE "LessonStatus" AS ENUM ('planned', 'done', 'cancelled');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('student', 'teacher', 'admin');

-- CreateTable
CREATE TABLE "Bookings" (
    "idBooking" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "idUser" INTEGER,
    "idLesson" INTEGER,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("idBooking")
);

-- CreateTable
CREATE TABLE "Lessons" (
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
    "idTeacher" INTEGER,

    CONSTRAINT "Lessons_pkey" PRIMARY KEY ("idLesson")
);

-- CreateTable
CREATE TABLE "Pricings" (
    "idPricing" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "nbLessons" INTEGER NOT NULL,

    CONSTRAINT "Pricings_pkey" PRIMARY KEY ("idPricing")
);

-- CreateTable
CREATE TABLE "Users" (
    "idUser" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "languages" TEXT,
    "nationality" TEXT,
    "description" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'student',
    "nbLessons" INTEGER DEFAULT 0,
    "links" JSONB,
    "rating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "_UsersToLessons" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UsersToLessons_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "_UsersToLessons_B_index" ON "_UsersToLessons"("B");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_idLesson_fkey" FOREIGN KEY ("idLesson") REFERENCES "Lessons"("idLesson") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_idTeacher_fkey" FOREIGN KEY ("idTeacher") REFERENCES "Users"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersToLessons" ADD CONSTRAINT "_UsersToLessons_A_fkey" FOREIGN KEY ("A") REFERENCES "Lessons"("idLesson") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersToLessons" ADD CONSTRAINT "_UsersToLessons_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;
