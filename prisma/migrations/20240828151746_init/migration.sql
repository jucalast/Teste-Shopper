/*
  Warnings:

  - You are about to drop the column `customerCode` on the `Measure` table. All the data in the column will be lost.
  - You are about to drop the column `measureType` on the `Measure` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measureTypeId` to the `Measure` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "MeasureType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Measure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "measureDatetime" DATETIME NOT NULL,
    "measureTypeId" TEXT NOT NULL,
    "measureValue" REAL,
    "imageUrl" TEXT NOT NULL,
    "hasConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Measure_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Measure_measureTypeId_fkey" FOREIGN KEY ("measureTypeId") REFERENCES "MeasureType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Measure" ("createdAt", "hasConfirmed", "id", "imageUrl", "measureDatetime", "measureValue") SELECT "createdAt", "hasConfirmed", "id", "imageUrl", "measureDatetime", "measureValue" FROM "Measure";
DROP TABLE "Measure";
ALTER TABLE "new_Measure" RENAME TO "Measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_code_key" ON "Customer"("code");

-- CreateIndex
CREATE UNIQUE INDEX "MeasureType_type_key" ON "MeasureType"("type");
