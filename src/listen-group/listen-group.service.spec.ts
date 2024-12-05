import { Test, TestingModule } from '@nestjs/testing';
import { ListenGroupService } from './listen-group.service';

describe('ListenGroupService', () => {
  let service: ListenGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListenGroupService],
    }).compile();

    service = module.get<ListenGroupService>(ListenGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
