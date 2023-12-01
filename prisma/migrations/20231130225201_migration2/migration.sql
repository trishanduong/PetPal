/*
  Warnings:

  - You are about to drop the column `locationId` on the `DogProfile` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "DogProfile_locationId_key";

-- AlterTable
ALTER TABLE "DogProfile" DROP COLUMN "locationId";
ALTER TABLE "DogProfile" ADD COLUMN     "city" STRING;

-- DropTable
DROP TABLE "Location";
