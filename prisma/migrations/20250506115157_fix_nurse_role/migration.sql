-- AlterTable
ALTER TABLE `Nurse` MODIFY `role` ENUM('admin', 'recepcionist', 'healthProfessional', 'nurse') NOT NULL DEFAULT 'nurse';
