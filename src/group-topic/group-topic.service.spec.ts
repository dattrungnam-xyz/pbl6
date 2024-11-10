import { Test, TestingModule } from '@nestjs/testing';
import { GroupTopicService } from './group-topic.service';

describe('GroupTopicService', () => {
  let service: GroupTopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTopicService],
    }).compile();

    service = module.get<GroupTopicService>(GroupTopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
