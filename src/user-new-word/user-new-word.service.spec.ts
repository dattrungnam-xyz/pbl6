import { Test, TestingModule } from '@nestjs/testing';
import { UserNewWordService } from './user-new-word.service';

describe('UserNewWordService', () => {
  let service: UserNewWordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserNewWordService],
    }).compile();

    service = module.get<UserNewWordService>(UserNewWordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
