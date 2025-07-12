/*
  Warnings:

  - A unique constraint covering the columns `[idUser,idLesson]` on the table `Bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bookings_idUser_idLesson_key" ON "Bookings"("idUser", "idLesson");
