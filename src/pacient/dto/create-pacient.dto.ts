import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePacientDto {
    @ApiProperty({ description: 'Name of the pacient' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Date of birth of the pacient no formato ISO', example: '2025-05-29' })
    @IsDateString()
    @IsNotEmpty()
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
}