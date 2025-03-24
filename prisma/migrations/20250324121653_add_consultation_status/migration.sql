/*
  Warnings:

  - Added the required column `status` to the `ConsultationHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ConsultationHistory` ADD COLUMN `status` ENUM('open', 'closed') NOT NULL;
