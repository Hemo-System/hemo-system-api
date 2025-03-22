import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationHistoryService } from './consultation_history.service';

describe('ConsultationHistoryService', () => {
  let service: ConsultationHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultationHistoryService],
    }).compile();

    service = module.get<ConsultationHistoryService>(ConsultationHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
