-- CreateTable
CREATE TABLE `ConsultationHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diagnosis` VARCHAR(191) NOT NULL,
    `prescription` VARCHAR(191) NOT NULL,
    `annotations` VARCHAR(191) NOT NULL,
    `evolution` VARCHAR(191) NOT NULL,
    `scheduleId` INTEGER NOT NULL,

    UNIQUE INDEX `ConsultationHistory_scheduleId_key`(`scheduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Examination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `consultationHistoryId` INTEGER NOT NULL,

    UNIQUE INDEX `Examination_consultationHistoryId_key`(`consultationHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InfermaryAdmission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vitalSigns` VARCHAR(191) NOT NULL,
    `pacientEvolution` VARCHAR(191) NOT NULL,
    `medicationAdministration` VARCHAR(191) NOT NULL,
    `consultationHistoryId` INTEGER NOT NULL,
    `nurseId` INTEGER NOT NULL,
    `infermaryPlaceId` INTEGER NOT NULL,

    UNIQUE INDEX `InfermaryAdmission_consultationHistoryId_key`(`consultationHistoryId`),
    UNIQUE INDEX `InfermaryAdmission_infermaryPlaceId_key`(`infermaryPlaceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InfermaryPlace` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('bed', 'chair') NOT NULL,
    `isBusy` BOOLEAN NOT NULL,

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

    UNIQUE INDEX `Pacient_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `hour` VARCHAR(191) NOT NULL,
    `type` ENUM('previously', 'immediate') NOT NULL,
    `status` ENUM('scheduled', 'confirmed', 'canceled', 'consulted') NOT NULL,
    `recepcionistId` INTEGER NOT NULL,
    `pacientId` INTEGER NOT NULL,
    `healthPrefessionalId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

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

    UNIQUE INDEX `HealthProfessional_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HealthProfessionalScale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `startHour` VARCHAR(191) NOT NULL,
    `exitHour` VARCHAR(191) NOT NULL,
    `isPlantonist` BOOLEAN NOT NULL,
    `healthProfessionalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nurse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('admin', 'recepcionist', 'healthProfessional', 'nurse') NOT NULL DEFAULT 'recepcionist',
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `coren` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Nurse_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConsultationHistory` ADD CONSTRAINT `ConsultationHistory_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `Schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Examination` ADD CONSTRAINT `Examination_consultationHistoryId_fkey` FOREIGN KEY (`consultationHistoryId`) REFERENCES `ConsultationHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfermaryAdmission` ADD CONSTRAINT `InfermaryAdmission_consultationHistoryId_fkey` FOREIGN KEY (`consultationHistoryId`) REFERENCES `ConsultationHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfermaryAdmission` ADD CONSTRAINT `InfermaryAdmission_nurseId_fkey` FOREIGN KEY (`nurseId`) REFERENCES `Nurse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfermaryAdmission` ADD CONSTRAINT `InfermaryAdmission_infermaryPlaceId_fkey` FOREIGN KEY (`infermaryPlaceId`) REFERENCES `InfermaryPlace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_recepcionistId_fkey` FOREIGN KEY (`recepcionistId`) REFERENCES `Recepcionist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_pacientId_fkey` FOREIGN KEY (`pacientId`) REFERENCES `Pacient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_healthPrefessionalId_fkey` FOREIGN KEY (`healthPrefessionalId`) REFERENCES `HealthProfessional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HealthProfessionalScale` ADD CONSTRAINT `HealthProfessionalScale_healthProfessionalId_fkey` FOREIGN KEY (`healthProfessionalId`) REFERENCES `HealthProfessional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
