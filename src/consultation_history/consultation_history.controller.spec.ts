import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationHistoryController } from './consultation_history.controller';
import { ConsultationHistoryService } from './consultation_history.service';

describe('ConsultationHistoryController', () => {
  let controller: ConsultationHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultationHistoryController],
      providers: [ConsultationHistoryService],
    }).compile();

    controller = module.get<ConsultationHistoryController>(
      ConsultationHistoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
