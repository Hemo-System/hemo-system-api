/*
  Warnings:

  - Added the required column `status` to the `InfermaryAdmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `InfermaryAdmission` ADD COLUMN `status` ENUM('open', 'closed') NOT NULL;
