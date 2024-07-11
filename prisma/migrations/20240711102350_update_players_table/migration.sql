/*
  Warnings:

  - You are about to drop the column `riotId` on the `searchPlayers` table. All the data in the column will be lost.
  - Added the required column `name` to the `searchPlayers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `searchPlayers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "searchPlayers" DROP COLUMN "riotId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "searchPlayers_name_idx" ON "searchPlayers"("name");

-- CreateIndex
CREATE INDEX "searchPlayers_name_tag_idx" ON "searchPlayers"("name", "tag");
