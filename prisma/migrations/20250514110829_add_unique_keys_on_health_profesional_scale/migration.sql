/*
  Warnings:

  - A unique constraint covering the columns `[date,startHour,healthProfessionalId]` on the table `HealthProfessionalScale` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `HealthProfessionalScale_date_startHour_healthProfessionalId_key` ON `HealthProfessionalScale`(`date`, `startHour`, `healthProfessionalId`);
