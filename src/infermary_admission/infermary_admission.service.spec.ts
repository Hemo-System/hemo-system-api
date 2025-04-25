import { Test, TestingModule } from '@nestjs/testing';
import { InfermaryAdmissionService } from './infermary_admission.service';

describe('InfermaryAdmissionService', () => {
  let service: InfermaryAdmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfermaryAdmissionService],
    }).compile();

    service = module.get<InfermaryAdmissionService>(InfermaryAdmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
