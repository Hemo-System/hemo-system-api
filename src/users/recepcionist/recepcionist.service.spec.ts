import { Test, TestingModule } from '@nestjs/testing';
import { RecepcionistService } from './recepcionist.service';

describe('RecepcionistService', () => {
  let service: RecepcionistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecepcionistService],
    }).compile();

    service = module.get<RecepcionistService>(RecepcionistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
