import { Test, TestingModule } from '@nestjs/testing';
import { HealthProfessionalController } from './health_professional.controller';
import { HealthProfessionalService } from './health_professional.service';

describe('HealthProfessionalController', () => {
  let controller: HealthProfessionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthProfessionalController],
      providers: [HealthProfessionalService],
    }).compile();

    controller = module.get<HealthProfessionalController>(
      HealthProfessionalController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
