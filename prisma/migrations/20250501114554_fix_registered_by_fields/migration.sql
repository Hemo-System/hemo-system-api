/*
  Warnings:

  - You are about to drop the column `registeredByAdmin` on the `HealthProfessional` table. All the data in the column will be lost.
  - You are about to drop the column `registeredByAdmin` on the `HealthProfessionalScale` table. All the data in the column will be lost.
  - You are about to drop the column `registeredByAdmin` on the `Nurse` table. All the data in the column will be lost.
  - You are about to drop the column `registeredByRecepcionist` on the `Pacient` table. All the data in the column will be lost.
  - You are about to drop the column `registeredByAdmin` on the `Recepcionist` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `HealthProfessional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `HealthProfessionalScale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `Nurse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recepcionistId` to the `Pacient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `Recepcionist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `HealthProfessional` DROP FOREIGN KEY `HealthProfessional_registeredByAdmin_fkey`;

-- DropForeignKey
ALTER TABLE `HealthProfessionalScale` DROP FOREIGN KEY `HealthProfessionalScale_registeredByAdmin_fkey`;

-- DropForeignKey
ALTER TABLE `Nurse` DROP FOREIGN KEY `Nurse_registeredByAdmin_fkey`;

-- DropForeignKey
ALTER TABLE `Pacient` DROP FOREIGN KEY `Pacient_registeredByRecepcionist_fkey`;

-- DropForeignKey
ALTER TABLE `Recepcionist` DROP FOREIGN KEY `Recepcionist_registeredByAdmin_fkey`;

-- DropIndex
DROP INDEX `HealthProfessional_registeredByAdmin_fkey` ON `HealthProfessional`;

-- DropIndex
DROP INDEX `HealthProfessionalScale_registeredByAdmin_fkey` ON `HealthProfessionalScale`;

-- DropIndex
DROP INDEX `Nurse_registeredByAdmin_fkey` ON `Nurse`;

-- DropIndex
DROP INDEX `Pacient_registeredByRecepcionist_fkey` ON `Pacient`;

-- DropIndex
DROP INDEX `Recepcionist_registeredByAdmin_fkey` ON `Recepcionist`;

-- AlterTable
ALTER TABLE `HealthProfessional` DROP COLUMN `registeredByAdmin`,
    ADD COLUMN `adminId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `HealthProfessionalScale` DROP COLUMN `registeredByAdmin`,
    ADD COLUMN `adminId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Nurse` DROP COLUMN `registeredByAdmin`,
    ADD COLUMN `adminId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Pacient` DROP COLUMN `registeredByRecepcionist`,
    ADD COLUMN `recepcionistId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Recepcionist` DROP COLUMN `registeredByAdmin`,
    ADD COLUMN `adminId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Pacient` ADD CONSTRAINT `Pacient_recepcionistId_fkey` FOREIGN KEY (`recepcionistId`) REFERENCES `Recepcionist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recepcionist` ADD CONSTRAINT `Recepcionist_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthProfessional` ADD CONSTRAINT `HealthProfessional_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthProfessionalScale` ADD CONSTRAINT `HealthProfessionalScale_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nurse` ADD CONSTRAINT `Nurse_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
