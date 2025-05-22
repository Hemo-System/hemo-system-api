/*
  Warnings:

  - A unique constraint covering the columns `[date,healthPrefessionalId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Schedule` MODIFY `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `Schedule_date_healthPrefessionalId_key` ON `Schedule`(`date`, `healthPrefessionalId`);
