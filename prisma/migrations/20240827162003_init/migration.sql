-- CreateTable
CREATE TABLE "Measure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerCode" TEXT NOT NULL,
    "measureDatetime" DATETIME NOT NULL,
    "measureType" TEXT NOT NULL,
    "measureValue" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "hasConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
