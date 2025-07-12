/*
  Warnings:

  - You are about to drop the column `date` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Billing` table. All the data in the column will be lost.
  - Added the required column `priceCad` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceEur` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceGbp` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceKrw` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceOriginal` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceUsd` to the `Billing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "date",
DROP COLUMN "price",
ADD COLUMN     "priceCad" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceEur" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceGbp" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceKrw" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceOriginal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceUsd" DOUBLE PRECISION NOT NULL;
