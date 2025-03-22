import { Test, TestingModule } from '@nestjs/testing';
import { PacientService } from './pacient.service';

describe('PacientService', () => {
  let service: PacientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacientService],
    }).compile();

    service = module.get<PacientService>(PacientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
