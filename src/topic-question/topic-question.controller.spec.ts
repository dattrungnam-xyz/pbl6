import { Test, TestingModule } from '@nestjs/testing';
import { TopicQuestionController } from './topic-question.controller';
import { TopicQuestionService } from './topic-question.service';

describe('TopicQuestionController', () => {
  let controller: TopicQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicQuestionController],
      providers: [TopicQuestionService],
    }).compile();

    controller = module.get<TopicQuestionController>(TopicQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
