import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from 'src/schedule/entities/schedule.entity';

export class Pacient {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ description: 'Date of birth of the pacient' })
    birthDate: Date;

    @ApiProperty({ description: 'Sex of the pacient (e.g., Male, Female, Other)' })
    sex: string;

    @ApiProperty({ description: 'Civil state of the pacient (e.g., Single, Married)' })
    civilState: string;

    @ApiProperty({ description: 'Address of the pacient' })
    address: string;

    @ApiProperty({ description: 'Unique CPF (Brazilian ID) of the pacient' })
    cpf: string;

    @ApiProperty({ description: 'Name of the pacient\'s companion' })
    companionName: string;

    @ApiProperty({ description: 'CPF of the pacient\'s companion' })
    companionCpf: string;

    @ApiProperty({ description: 'Date when the pacient was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Date when the pacient was last updated' })
    updatedAt: Date;

    @ApiProperty({ description: 'Indicates whether the pacient is active' })
    isActive: boolean;

    @ApiProperty({ description: 'ID of the recepcionist who registered the pacient', nullable: true })
    recepcionistId?: number | null | undefined;

    @ApiProperty({ description: 'ID of the admin who registered the pacient', nullable: true })
    adminId?: number | null | undefined;
}