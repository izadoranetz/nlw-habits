/*
  Warnings:

  - You are about to drop the column `titke` on the `habits` table. All the data in the column will be lost.
  - Added the required column `title` to the `habits` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_ate" DATETIME NOT NULL
);
INSERT INTO "new_habits" ("created_ate", "id") SELECT "created_ate", "id" FROM "habits";
DROP TABLE "habits";
ALTER TABLE "new_habits" RENAME TO "habits";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
