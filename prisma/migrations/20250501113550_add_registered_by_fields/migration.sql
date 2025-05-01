/*
  Warnings:

  - Added the required column `registeredByAdmin` to the `HealthProfessional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registeredByAdmin` to the `HealthProfessionalScale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registeredByAdmin` to the `Nurse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registeredByRecepcionist` to the `Pacient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registeredByAdmin` to the `Recepcionist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `HealthProfessional` ADD COLUMN `registeredByAdmin` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `HealthProfessionalScale` ADD COLUMN `registeredByAdmin` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Nurse` ADD COLUMN `registeredByAdmin` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Pacient` ADD COLUMN `registeredByRecepcionist` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Recepcionist` ADD COLUMN `registeredByAdmin` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Pacient` ADD CONSTRAINT `Pacient_registeredByRecepcionist_fkey` FOREIGN KEY (`registeredByRecepcionist`) REFERENCES `Recepcionist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recepcionist` ADD CONSTRAINT `Recepcionist_registeredByAdmin_fkey` FOREIGN KEY (`registeredByAdmin`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthProfessional` ADD CONSTRAINT `HealthProfessional_registeredByAdmin_fkey` FOREIGN KEY (`registeredByAdmin`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthProfessionalScale` ADD CONSTRAINT `HealthProfessionalScale_registeredByAdmin_fkey` FOREIGN KEY (`registeredByAdmin`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nurse` ADD CONSTRAINT `Nurse_registeredByAdmin_fkey` FOREIGN KEY (`registeredByAdmin`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
