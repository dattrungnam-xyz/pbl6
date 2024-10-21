import { Test, TestingModule } from '@nestjs/testing';
import { TopicQuestionService } from './topic-question.service';

describe('TopicQuestionService', () => {
  let service: TopicQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicQuestionService],
    }).compile();

    service = module.get<TopicQuestionService>(TopicQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
