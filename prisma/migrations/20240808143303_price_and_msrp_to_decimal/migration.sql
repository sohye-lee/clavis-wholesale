/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(9,2)`.
  - You are about to alter the column `msrp` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(9,2),
ALTER COLUMN "msrp" SET DEFAULT 0,
ALTER COLUMN "msrp" SET DATA TYPE DECIMAL(9,2);
