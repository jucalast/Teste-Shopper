/*
  Warnings:

  - The primary key for the `Measure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `hasConfirmed` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `measureDatetime` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Measure` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Measure` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `measureValue` on the `Measure` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Added the required column `measureDate` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - Made the column `measureValue` on table `Measure` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Measure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerCode" TEXT NOT NULL,
    "measureDate" DATETIME NOT NULL,
    "measureType" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "measureValue" REAL NOT NULL
);
INSERT INTO "new_Measure" ("customerCode", "id", "imageUrl", "measureType", "measureValue") SELECT "customerCode", "id", "imageUrl", "measureType", "measureValue" FROM "Measure";
DROP TABLE "Measure";
ALTER TABLE "new_Measure" RENAME TO "Measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
