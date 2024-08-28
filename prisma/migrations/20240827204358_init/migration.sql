/*
  Warnings:

  - The primary key for the `Measure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isConfirmed` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `measureUuid` on the `Measure` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Measure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerCode" TEXT NOT NULL,
    "measureDatetime" DATETIME NOT NULL,
    "measureType" TEXT NOT NULL,
    "measureValue" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "hasConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Measure" ("customerCode", "id", "imageUrl", "measureDatetime", "measureType", "measureValue") SELECT "customerCode", "id", "imageUrl", "measureDatetime", "measureType", "measureValue" FROM "Measure";
DROP TABLE "Measure";
ALTER TABLE "new_Measure" RENAME TO "Measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
