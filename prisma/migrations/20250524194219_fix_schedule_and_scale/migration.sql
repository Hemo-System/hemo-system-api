/*
  Warnings:

  - You are about to drop the column `exit` on the `HealthProfessionalScale` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `HealthProfessionalScale` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `healthPrefessionalId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `Schedule` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(6))` to `Enum(EnumId(5))`.
  - A unique constraint covering the columns `[dayOfWeek,startTime,endTime,healthProfessionalId,validFrom]` on the table `HealthProfessionalScale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[scheduledAt,healthProfessionalId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dayOfWeek` to the `HealthProfessionalScale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `HealthProfessionalScale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `HealthProfessionalScale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthProfessionalId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledAt` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledDate` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledTime` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Schedule` DROP FOREIGN KEY `Schedule_healthPrefessionalId_fkey`;

-- DropIndex
DROP INDEX `HealthProfessionalScale_start_exit_healthProfessionalId_key` ON `HealthProfessionalScale`;

-- DropIndex
DROP INDEX `Schedule_date_healthPrefessionalId_key` ON `Schedule`;

-- DropIndex
DROP INDEX `Schedule_healthPrefessionalId_fkey` ON `Schedule`;

-- AlterTable
ALTER TABLE `HealthProfessionalScale` DROP COLUMN `exit`,
    DROP COLUMN `start`,
    ADD COLUMN `dayOfWeek` ENUM('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturdey') NOT NULL,
    ADD COLUMN `endTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `startTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `validFrom` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `validTo` DATETIME(3) NULL,
    MODIFY `isPlantonist` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `date`,
    DROP COLUMN `healthPrefessionalId`,
    ADD COLUMN `cancelReason` VARCHAR(191) NULL,
    ADD COLUMN `healthProfessionalId` INTEGER NOT NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL,
    ADD COLUMN `scheduledAt` DATETIME(3) NOT NULL,
    ADD COLUMN `scheduledDate` DATETIME(3) NOT NULL,
    ADD COLUMN `scheduledTime` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('scheduled', 'confirmed', 'inProgress', 'completed', 'cancelled', 'noShow') NOT NULL DEFAULT 'scheduled';

-- CreateIndex
CREATE INDEX `HealthProfessionalScale_healthProfessionalId_dayOfWeek_isAct_idx` ON `HealthProfessionalScale`(`healthProfessionalId`, `dayOfWeek`, `isActive`);

-- CreateIndex
CREATE INDEX `HealthProfessionalScale_dayOfWeek_isPlantonist_isActive_idx` ON `HealthProfessionalScale`(`dayOfWeek`, `isPlantonist`, `isActive`);

-- CreateIndex
CREATE UNIQUE INDEX `HealthProfessionalScale_dayOfWeek_startTime_endTime_healthPr_key` ON `HealthProfessionalScale`(`dayOfWeek`, `startTime`, `endTime`, `healthProfessionalId`, `validFrom`);

-- CreateIndex
CREATE INDEX `Schedule_healthProfessionalId_scheduledAt_idx` ON `Schedule`(`healthProfessionalId`, `scheduledAt`);

-- CreateIndex
CREATE INDEX `Schedule_pacientId_scheduledAt_idx` ON `Schedule`(`pacientId`, `scheduledAt`);

-- CreateIndex
CREATE INDEX `Schedule_status_scheduledAt_idx` ON `Schedule`(`status`, `scheduledAt`);

-- CreateIndex
CREATE UNIQUE INDEX `Schedule_scheduledAt_healthProfessionalId_key` ON `Schedule`(`scheduledAt`, `healthProfessionalId`);

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_healthProfessionalId_fkey` FOREIGN KEY (`healthProfessionalId`) REFERENCES `HealthProfessional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
