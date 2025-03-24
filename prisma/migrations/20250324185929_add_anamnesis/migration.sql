/*
  Warnings:

  - You are about to drop the column `annotations` on the `ConsultationHistory` table. All the data in the column will be lost.
  - You are about to drop the column `evolution` on the `ConsultationHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ConsultationHistory` DROP COLUMN `annotations`,
    DROP COLUMN `evolution`;

-- CreateTable
CREATE TABLE `Anamnesis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cid` VARCHAR(191) NOT NULL,
    `currentDiseaseDetails` VARCHAR(191) NOT NULL,
    `personalAntecedents` VARCHAR(191) NOT NULL,
    `familyAntecedents` VARCHAR(191) NOT NULL,
    `lifeHabits` VARCHAR(191) NOT NULL,
    `medicationsInUse` VARCHAR(191) NOT NULL,
    `allergies` VARCHAR(191) NOT NULL,
    `previousSurgeries` VARCHAR(191) NOT NULL,
    `observations` VARCHAR(191) NOT NULL,
    `consultationHistoryId` INTEGER NOT NULL,

    UNIQUE INDEX `Anamnesis_consultationHistoryId_key`(`consultationHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Anamnesis` ADD CONSTRAINT `Anamnesis_consultationHistoryId_fkey` FOREIGN KEY (`consultationHistoryId`) REFERENCES `ConsultationHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
