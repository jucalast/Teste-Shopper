/*
  Warnings:

  - You are about to drop the `Reading` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reading";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Measure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerCode" TEXT NOT NULL,
    "measureDatetime" DATETIME NOT NULL,
    "measureType" TEXT NOT NULL,
    "measureValue" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "measureUuid" TEXT NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Measure_measureUuid_key" ON "Measure"("measureUuid");

-- CreateIndex
CREATE INDEX "measure_index" ON "Measure"("customerCode", "measureDatetime", "measureType");
