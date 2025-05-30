import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsDate, IsEnum, IsOptional, IsBoolean, IsDateString, IsNumber } from 'class-validator';

export class CreatePacientDto {
    @ApiProperty({ description: 'Name of the pacient' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Date of birth of the pacient in Brazilian format (DD-MM-YYYY)', example: '01-01-1999' })
    @Transform(({ value }) => {
        const [day, month, year] = value.split('-');
        return new Date(`${year}-${month}-${day}`).toISOString();
    })
    @IsString()
    birthDate: string;

    @ApiProperty({ description: 'Sex of the pacient' })
    @IsString()
    sex: string;

    @ApiProperty({ description: 'Civil state of the pacient' })
    @IsString()
    civilState: string;

    @ApiProperty({ description: 'Address of the pacient' })
    @IsString()
    address: string;

    @ApiProperty({ description: 'Unique CPF (Brazilian ID) of the pacient' })
    @IsString()
    cpf: string;

    @ApiProperty({ description: 'Name of the pacient\'s companion' })
    @IsString()
    companionName: string;

    @ApiProperty({ description: 'CPF of the pacient\'s companion' })
    @IsString()
    companionCpf: string;

    @ApiProperty({ description: 'ID of the recepcionist who registered the pacient', nullable: true })
    @IsNumber()
    @IsOptional()
    recepcionistId?: number | null;

    @ApiProperty({ description: 'ID of the admin who registered the pacient', nullable: true })
    @IsNumber()
    @IsOptional()
    adminId?: number | null;
}