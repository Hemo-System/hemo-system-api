import { Test, TestingModule } from '@nestjs/testing';
import { PacientController } from './pacient.controller';
import { PacientService } from './pacient.service';

describe('PacientController', () => {
  let controller: PacientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacientController],
      providers: [PacientService],
    }).compile();

    controller = module.get<PacientController>(PacientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
