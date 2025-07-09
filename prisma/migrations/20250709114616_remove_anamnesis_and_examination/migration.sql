/*
  Warnings:

  - You are about to drop the `Anamnesis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Examination` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Anamnesis` DROP FOREIGN KEY `Anamnesis_consultationHistoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Examination` DROP FOREIGN KEY `Examination_consultationHistoryId_fkey`;

-- DropTable
DROP TABLE `Anamnesis`;

-- DropTable
DROP TABLE `Examination`;
