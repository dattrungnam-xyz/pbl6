import { Test, TestingModule } from '@nestjs/testing';
import { GroupTopicController } from './group-topic.controller';
import { GroupTopicService } from './group-topic.service';

describe('GroupTopicController', () => {
  let controller: GroupTopicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupTopicController],
      providers: [GroupTopicService],
    }).compile();

    controller = module.get<GroupTopicController>(GroupTopicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
