import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EmailValidationService {
    constructor(private readonly prismaService: PrismaService) { }

    async checkUserEmailAlreadyExists(email: string): Promise<boolean> {
        const admin = await this.prismaService.admin.findUnique({
            where: { email },
        });

        const recepcionist = await this.prismaService.recepcionist.findUnique({
            where: { email },
        });

        const healthProfessional = await this.prismaService.healthProfessional.findUnique({
            where: { email },
        });

        return !!(admin || recepcionist || healthProfessional);
    }
}