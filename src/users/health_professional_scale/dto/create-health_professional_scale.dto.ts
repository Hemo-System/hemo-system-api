import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsISO8601, IsNotEmpty, Matches } from 'class-validator';

export class CreateHealthProfessionalScaleDto {
    @ApiProperty()
    @IsISO8601()
    @IsNotEmpty()
    start: string;

    @ApiProperty()
    @IsISO8601()
    @IsNotEmpty()
    finish: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isPlantonist: boolean;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    healthProfessionalId: number;
}