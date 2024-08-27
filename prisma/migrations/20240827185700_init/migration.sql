/*
  Warnings:

  - You are about to drop the `Measure` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Measure";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Reading" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerCode" TEXT NOT NULL,
    "measureDatetime" DATETIME NOT NULL,
    "measureType" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
