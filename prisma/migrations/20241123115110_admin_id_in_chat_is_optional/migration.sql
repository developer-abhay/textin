-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_adminId_fkey";

-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "adminId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
