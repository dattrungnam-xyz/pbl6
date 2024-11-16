import { Test, TestingModule } from '@nestjs/testing';
import { FlashCardService } from './flash-card.service';

describe('FlashCardService', () => {
  let service: FlashCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlashCardService],
    }).compile();

    service = module.get<FlashCardService>(FlashCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
