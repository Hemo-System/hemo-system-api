import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, Matches } from 'class-validator';

export class CreateHealthProfessionalScaleDto {
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @ApiProperty()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'startHour must be in the format HH:mm',
    })
    @IsNotEmpty()
    startHour: string;

    @ApiProperty()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'exitHour must be in the format HH:mm',
    })
    @IsNotEmpty()
    exitHour: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isPlantonist: boolean;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    healthProfessionalId: number;
}