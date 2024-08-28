/*
  Warnings:

  - You are about to alter the column `measureValue` on the `Measure` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Measure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerCode" TEXT NOT NULL,
    "measureDatetime" DATETIME NOT NULL,
    "measureType" TEXT NOT NULL,
    "measureValue" REAL,
    "imageUrl" TEXT NOT NULL,
    "hasConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Measure" ("createdAt", "customerCode", "hasConfirmed", "id", "imageUrl", "measureDatetime", "measureType", "measureValue") SELECT "createdAt", "customerCode", "hasConfirmed", "id", "imageUrl", "measureDatetime", "measureType", "measureValue" FROM "Measure";
DROP TABLE "Measure";
ALTER TABLE "new_Measure" RENAME TO "Measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
