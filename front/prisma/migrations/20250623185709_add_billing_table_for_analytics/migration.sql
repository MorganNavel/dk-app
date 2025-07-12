/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `earned` on the `Lesson` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BillingStatus" AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "earned";

-- CreateTable
CREATE TABLE "Billing" (
    "idBilling" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUser" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT,
    "paymentReference" TEXT,
    "status" TEXT NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("idBilling")
);
