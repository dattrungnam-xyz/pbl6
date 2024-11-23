import { Test, TestingModule } from '@nestjs/testing';
import { TopicHistoryController } from './topic-history.controller';
import { TopicHistoryService } from './topic-history.service';

describe('TopicHistoryController', () => {
  let controller: TopicHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicHistoryController],
      providers: [TopicHistoryService],
    }).compile();

    controller = module.get<TopicHistoryController>(TopicHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
