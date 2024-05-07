-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "bandColor" TEXT,
ADD COLUMN     "platingColor" TEXT;

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "company" TEXT,
    "email" TEXT NOT NULL,
    "phone" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_email_fkey" FOREIGN KEY ("email") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
