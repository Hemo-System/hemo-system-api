import { Test, TestingModule } from '@nestjs/testing';
import { RecepcionistController } from './recepcionist.controller';
import { RecepcionistService } from './recepcionist.service';

describe('RecepcionistController', () => {
  let controller: RecepcionistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecepcionistController],
      providers: [RecepcionistService],
    }).compile();

    controller = module.get<RecepcionistController>(RecepcionistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
