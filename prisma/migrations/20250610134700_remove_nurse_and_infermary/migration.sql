/*
  Warnings:

  - You are about to drop the `InfermaryAdmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InfermaryPlace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nurse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `InfermaryAdmission` DROP FOREIGN KEY `InfermaryAdmission_consultationHistoryId_fkey`;

-- DropForeignKey
ALTER TABLE `InfermaryAdmission` DROP FOREIGN KEY `InfermaryAdmission_infermaryPlaceId_fkey`;

-- DropForeignKey
ALTER TABLE `InfermaryAdmission` DROP FOREIGN KEY `InfermaryAdmission_nurseId_fkey`;

-- DropForeignKey
ALTER TABLE `Nurse` DROP FOREIGN KEY `Nurse_adminId_fkey`;

-- DropTable
DROP TABLE `InfermaryAdmission`;

-- DropTable
DROP TABLE `InfermaryPlace`;

-- DropTable
DROP TABLE `Nurse`;
