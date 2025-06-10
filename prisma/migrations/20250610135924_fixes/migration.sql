/*
  Warnings:

  - The values [nurse] on the enum `HealthProfessional_role` will be removed. If these variants are still used in the database, this will fail.
  - The values [nurse] on the enum `HealthProfessional_role` will be removed. If these variants are still used in the database, this will fail.
  - The values [nurse] on the enum `HealthProfessional_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Admin` MODIFY `role` ENUM('admin', 'recepcionist', 'healthProfessional') NOT NULL DEFAULT 'admin';

-- AlterTable
ALTER TABLE `HealthProfessional` MODIFY `role` ENUM('admin', 'recepcionist', 'healthProfessional') NOT NULL DEFAULT 'healthProfessional';

-- AlterTable
ALTER TABLE `Recepcionist` MODIFY `role` ENUM('admin', 'recepcionist', 'healthProfessional') NOT NULL DEFAULT 'recepcionist';
