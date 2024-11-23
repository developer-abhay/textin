/*
  Warnings:

  - The values [APPROVED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `adminId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
ALTER TABLE "Requests" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Requests" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Requests" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "adminId" TEXT NOT NULL,
ADD COLUMN     "groupAvatar" TEXT,
ADD COLUMN     "groupName" TEXT,
ADD COLUMN     "isGroup" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
