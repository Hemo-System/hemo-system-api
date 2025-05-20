-- DropForeignKey
ALTER TABLE `Pacient` DROP FOREIGN KEY `Pacient_recepcionistId_fkey`;

-- DropIndex
DROP INDEX `Pacient_recepcionistId_fkey` ON `Pacient`;

-- AlterTable
ALTER TABLE `Pacient` ADD COLUMN `adminId` INTEGER NULL,
    MODIFY `recepcionistId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Schedule` ADD COLUMN `adminId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Pacient` ADD CONSTRAINT `Pacient_recepcionistId_fkey` FOREIGN KEY (`recepcionistId`) REFERENCES `Recepcionist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pacient` ADD CONSTRAINT `Pacient_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
