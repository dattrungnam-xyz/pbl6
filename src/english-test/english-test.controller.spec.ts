import { Test, TestingModule } from '@nestjs/testing';
import { EnglishTestController } from './english-test.controller';
import { EnglishTestService } from './english-test.service';

describe('EnglishTestController', () => {
  let controller: EnglishTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnglishTestController],
      providers: [EnglishTestService],
    }).compile();

    controller = module.get<EnglishTestController>(EnglishTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
