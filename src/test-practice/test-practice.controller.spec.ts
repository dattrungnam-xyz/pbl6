import { Test, TestingModule } from '@nestjs/testing';
import { TestPracticeController } from './test-practice.controller';
import { TestPracticeService } from './test-practice.service';

describe('TestPracticeController', () => {
  let controller: TestPracticeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestPracticeController],
      providers: [TestPracticeService],
    }).compile();

    controller = module.get<TestPracticeController>(TestPracticeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
