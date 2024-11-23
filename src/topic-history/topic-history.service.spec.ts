import { Test, TestingModule } from '@nestjs/testing';
import { TopicHistoryService } from './topic-history.service';

describe('TopicHistoryService', () => {
  let service: TopicHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicHistoryService],
    }).compile();

    service = module.get<TopicHistoryService>(TopicHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
