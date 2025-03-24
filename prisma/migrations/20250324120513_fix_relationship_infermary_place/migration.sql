-- DropForeignKey
ALTER TABLE `InfermaryAdmission` DROP FOREIGN KEY `InfermaryAdmission_infermaryPlaceId_fkey`;

-- DropIndex
DROP INDEX `InfermaryAdmission_infermaryPlaceId_key` ON `InfermaryAdmission`;

-- AddForeignKey
ALTER TABLE `InfermaryAdmission` ADD CONSTRAINT `InfermaryAdmission_infermaryPlaceId_fkey` FOREIGN KEY (`infermaryPlaceId`) REFERENCES `InfermaryPlace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
