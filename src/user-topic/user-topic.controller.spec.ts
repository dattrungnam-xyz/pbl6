import { Test, TestingModule } from '@nestjs/testing';
import { UserTopicController } from './user-topic.controller';
import { UserTopicService } from './user-topic.service';

describe('UserTopicController', () => {
  let controller: UserTopicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTopicController],
      providers: [UserTopicService],
    }).compile();

    controller = module.get<UserTopicController>(UserTopicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
