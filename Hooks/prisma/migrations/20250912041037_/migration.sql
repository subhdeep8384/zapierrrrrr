/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AvailableAction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AvailableAction_name_key" ON "AvailableAction"("name");
