import { Test, TestingModule } from '@nestjs/testing';
import { TestPracticeService } from './test-practice.service';

describe('TestPracticeService', () => {
  let service: TestPracticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestPracticeService],
    }).compile();

    service = module.get<TestPracticeService>(TestPracticeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
