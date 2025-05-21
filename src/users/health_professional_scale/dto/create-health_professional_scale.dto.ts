import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsISO8601, IsNotEmpty } from 'class-validator';

export class CreateHealthProfessionalScaleDto {
    @ApiProperty()
    @IsISO8601()
    @IsNotEmpty()
    start: string;

    @ApiProperty()
    @IsISO8601()
    @IsNotEmpty()
    exit: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isPlantonist: boolean;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    healthProfessionalId: number;
}