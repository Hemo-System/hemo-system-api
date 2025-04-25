import { Test, TestingModule } from '@nestjs/testing';
import { InfermaryAdmissionController } from './infermary_admission.controller';
import { InfermaryAdmissionService } from './infermary_admission.service';

describe('InfermaryAdmissionController', () => {
  let controller: InfermaryAdmissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfermaryAdmissionController],
      providers: [InfermaryAdmissionService],
    }).compile();

    controller = module.get<InfermaryAdmissionController>(InfermaryAdmissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
