/*
  Warnings:

  - You are about to drop the column `date` on the `HealthProfessionalScale` table. All the data in the column will be lost.
  - You are about to drop the column `exitHour` on the `HealthProfessionalScale` table. All the data in the column will be lost.
  - You are about to drop the column `startHour` on the `HealthProfessionalScale` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[start,exit,healthProfessionalId]` on the table `HealthProfessionalScale` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `HealthProfessionalScale_date_startHour_healthProfessionalId_key` ON `HealthProfessionalScale`;

-- AlterTable
ALTER TABLE `HealthProfessionalScale` DROP COLUMN `date`,
    DROP COLUMN `exitHour`,
    DROP COLUMN `startHour`,
    ADD COLUMN `exit` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `start` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `HealthProfessionalScale_start_exit_healthProfessionalId_key` ON `HealthProfessionalScale`(`start`, `exit`, `healthProfessionalId`);
