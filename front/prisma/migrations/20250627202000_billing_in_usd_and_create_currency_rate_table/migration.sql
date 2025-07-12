/*
  Warnings:

  - You are about to drop the column `currency` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `priceCad` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `priceEur` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `priceGbp` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `priceKrw` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `priceOriginal` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `priceUsd` on the `Billing` table. All the data in the column will be lost.
  - Added the required column `price` to the `Billing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "currency",
DROP COLUMN "priceCad",
DROP COLUMN "priceEur",
DROP COLUMN "priceGbp",
DROP COLUMN "priceKrw",
DROP COLUMN "priceOriginal",
DROP COLUMN "priceUsd",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "CurrencyRate" (
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CurrencyRate_pkey" PRIMARY KEY ("code")
);
