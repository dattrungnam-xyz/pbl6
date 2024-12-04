import { Test, TestingModule } from '@nestjs/testing';
import { ListenSentenceController } from './listen-sentence.controller';
import { ListenSentenceService } from './listen-sentence.service';

describe('ListenSentenceController', () => {
  let controller: ListenSentenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListenSentenceController],
      providers: [ListenSentenceService],
    }).compile();

    controller = module.get<ListenSentenceController>(ListenSentenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
