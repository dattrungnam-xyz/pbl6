import { Test, TestingModule } from '@nestjs/testing';
import { ListenSentenceService } from './listen-sentence.service';

describe('ListenSentenceService', () => {
  let service: ListenSentenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListenSentenceService],
    }).compile();

    service = module.get<ListenSentenceService>(ListenSentenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
