/*
  Warnings:

  - A unique constraint covering the columns `[senderId,receiverId]` on the table `Requests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Requests" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Friends" (
    "id" TEXT NOT NULL,
    "userId1" TEXT NOT NULL,
    "userId2" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Friends_userId1_userId2_key" ON "Friends"("userId1", "userId2");

-- CreateIndex
CREATE UNIQUE INDEX "Requests_senderId_receiverId_key" ON "Requests"("senderId", "receiverId");

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
