import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString, Matches, IsOptional, IsDateString } from 'class-validator';

export class CreateHealthProfessionalScaleDto {
    @ApiProperty({ default: false, description: 'Se é plantonista' })
    @IsBoolean()
    @IsOptional()
    isPlantonist?: boolean;

    @ApiProperty({ description: 'Data da escala no formato ISO', example: '2025-05-29' })
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({ description: 'Horário de início no formato HH:mm', example: '07:30' })
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'startTime must be in HH:mm format' })
    @IsNotEmpty()
    startTime: string;

    @ApiProperty({ description: 'Horário de término no formato HH:mm', example: '17:00' })
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'endTime must be in HH:mm format' })
    @IsNotEmpty()
    endTime: string;

    @ApiProperty({ description: 'ID do profissional de saúde' })
    @IsInt()
    @IsNotEmpty()
    healthProfessionalId: number;
}