-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Measure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerCode" TEXT NOT NULL,
    "measureDate" DATETIME NOT NULL,
    "measureType" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "measureValue" REAL NOT NULL,
    "hasConfirmed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Measure" ("customerCode", "id", "imageUrl", "measureDate", "measureType", "measureValue") SELECT "customerCode", "id", "imageUrl", "measureDate", "measureType", "measureValue" FROM "Measure";
DROP TABLE "Measure";
ALTER TABLE "new_Measure" RENAME TO "Measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
