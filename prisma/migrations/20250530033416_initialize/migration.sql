-- CreateTable
CREATE TABLE `ConsultationHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diagnosis` VARCHAR(191) NOT NULL,
    `prescription` VARCHAR(191) NOT NULL,
    `status` ENUM('open', 'closed') NOT NULL,
    `scheduleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `ConsultationHistory_scheduleId_key`(`scheduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Anamnesis_consultationHistoryId_key`(`consultationHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Examination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `consultationHistoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Examination_consultationHistoryId_key`(`consultationHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HealthProfessionalScale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isPlantonist` BOOLEAN NOT NULL DEFAULT false,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `healthProfessionalId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `adminId` INTEGER NOT NULL,

    INDEX `HealthProfessionalScale_healthProfessionalId_isActive_idx`(`healthProfessionalId`, `isActive`),
    INDEX `HealthProfessionalScale_isPlantonist_isActive_idx`(`isPlantonist`, `isActive`),
    UNIQUE INDEX `HealthProfessionalScale_date_startTime_endTime_healthProfess_key`(`date`, `startTime`, `endTime`, `healthProfessionalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InfermaryAdmission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vitalSigns` VARCHAR(191) NOT NULL,
    `pacientEvolution` VARCHAR(191) NOT NULL,
    `medicationAdministration` VARCHAR(191) NOT NULL,
    `status` ENUM('open', 'closed') NOT NULL,
    `consultationHistoryId` INTEGER NOT NULL,
    `nurseId` INTEGER NOT NULL,
    `infermaryPlaceId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `InfermaryAdmission_consultationHistoryId_key`(`consultationHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InfermaryPlace` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('bed', 'chair') NOT NULL,
    `isBusy` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pacient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `civilState` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `companionName` VARCHAR(191) NOT NULL,
    `companionCpf` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `recepcionistId` INTEGER NULL,
    `adminId` INTEGER NULL,

    UNIQUE INDEX `Pacient_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('previously', 'immediate') NOT NULL,
    `status` ENUM('scheduled', 'confirmed', 'inProgress', 'completed', 'cancelled', 'noShow') NOT NULL DEFAULT 'scheduled',
    `notes` VARCHAR(191) NULL,
    `cancelReason` VARCHAR(191) NULL,
    `scheduledDate` DATETIME(3) NOT NULL,
    `scheduledTime` VARCHAR(191) NOT NULL,
    `pacientId` INTEGER NOT NULL,
    `healthProfessionalId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `recepcionistId` INTEGER NULL,
    `adminId` INTEGER NULL,

    INDEX `Schedule_healthProfessionalId_scheduledDate_scheduledTime_idx`(`healthProfessionalId`, `scheduledDate`, `scheduledTime`),
    INDEX `Schedule_pacientId_scheduledDate_scheduledTime_idx`(`pacientId`, `scheduledDate`, `scheduledTime`),
    INDEX `Schedule_status_scheduledDate_scheduledTime_idx`(`status`, `scheduledDate`, `scheduledTime`),
    UNIQUE INDEX `Schedule_scheduledDate_scheduledTime_healthProfessionalId_key`(`scheduledDate`, `scheduledTime`, `healthProfessionalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('admin', 'recepcionist', 'healthProfessional', 'nurse') NOT NULL DEFAULT 'admin',
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recepcionist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('admin', 'recepcionist', 'healthProfessional', 'nurse') NOT NULL DEFAULT 'recepcionist',
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `adminId` INTEGER NOT NULL,

    UNIQUE INDEX `Recepcionist_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HealthProfessional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('admin', 'recepcionist', 'healthProfessional', 'nurse') NOT NULL DEFAULT 'healthProfessional',
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `specialty` VARCHAR(191) NOT NULL,
    `professionalRegister` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `adminId` INTEGER NOT NULL,

    UNIQUE INDEX `HealthProfessional_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nurse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('admin', 'recepcionist', 'healthProfessional', 'nurse') NOT NULL DEFAULT 'nurse',
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `coren` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `adminId` INTEGER NOT NULL,

    UNIQUE INDEX `Nurse_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConsultationHistory` ADD CONSTRAINT `ConsultationHistory_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `Schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anamnesis` ADD CONSTRAINT `Anamnesis_consultationHistoryId_fkey` FOREIGN KEY (`consultationHistoryId`) REFERENCES `ConsultationHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Examination` ADD CONSTRAINT `Examination_consultationHistoryId_fkey` FOREIGN KEY (`consultationHistoryId`) REFERENCES `ConsultationHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthProfessionalScale` ADD CONSTRAINT `HealthProfessionalScale_healthProfessionalId_fkey` FOREIGN KEY (`healthProfessionalId`) REFERENCES `HealthProfessional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthProfessionalScale` ADD CONSTRAINT `HealthProfessionalScale_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfermaryAdmission` ADD CONSTRAINT `InfermaryAdmission_consultationHistoryId_fkey` FOREIGN KEY (`consultationHistoryId`) REFERENCES `ConsultationHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfermaryAdmission` ADD CONSTRAINT `InfermaryAdmission_nurseId_fkey` FOREIGN KEY (`nurseId`) REFERENCES `Nurse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfermaryAdmission` ADD CONSTRAINT `InfermaryAdmission_infermaryPlaceId_fkey` FOREIGN KEY (`infermaryPlaceId`) REFERENCES `InfermaryPlace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pacient` ADD CONSTRAINT `Pacient_recepcionistId_fkey` FOREIGN KEY (`recepcionistId`) REFERENCES `Recepcionist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pacient` ADD CONSTRAINT `Pacient_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_pacientId_fkey` FOREIGN KEY (`pacientId`) REFERENCES `Pacient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_healthProfessionalId_fkey` FOREIGN KEY (`healthProfessionalId`) REFERENCES `HealthProfessional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_recepcionistId_fkey` FOREIGN KEY (`recepcionistId`) REFERENCES `Recepcionist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recepcionist` ADD CONSTRAINT `Recepcionist_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthProfessional` ADD CONSTRAINT `HealthProfessional_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nurse` ADD CONSTRAINT `Nurse_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
