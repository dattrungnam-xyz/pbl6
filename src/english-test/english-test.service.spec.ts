import { Test, TestingModule } from '@nestjs/testing';
import { EnglishTestService } from './english-test.service';

describe('EnglishTestService', () => {
  let service: EnglishTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnglishTestService],
    }).compile();

    service = module.get<EnglishTestService>(EnglishTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
