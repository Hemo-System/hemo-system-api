import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, Matches } from 'class-validator';

export class CreateHealthProfessionalScaleDto {
    @ApiProperty()
    @IsDateString()
    date: string;

    @ApiProperty()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'startHour must be in the format HH:mm',
    })
    startHour: string;

    @ApiProperty()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'exitHour must be in the format HH:mm',
    })
    exitHour: string;

    @ApiProperty()
    @IsBoolean()
    isPlantonist: boolean;

    @ApiProperty()
    @IsInt()
    healthProfessionalId: number;
}