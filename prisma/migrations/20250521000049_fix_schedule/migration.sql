-- DropForeignKey
ALTER TABLE `Schedule` DROP FOREIGN KEY `Schedule_recepcionistId_fkey`;

-- DropIndex
DROP INDEX `Schedule_recepcionistId_fkey` ON `Schedule`;

-- AlterTable
ALTER TABLE `Schedule` MODIFY `recepcionistId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_recepcionistId_fkey` FOREIGN KEY (`recepcionistId`) REFERENCES `Recepcionist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
