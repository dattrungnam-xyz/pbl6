import { Test, TestingModule } from '@nestjs/testing';
import { FlashCardController } from './flash-card.controller';
import { FlashCardService } from './flash-card.service';

describe('FlashCardController', () => {
  let controller: FlashCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashCardController],
      providers: [FlashCardService],
    }).compile();

    controller = module.get<FlashCardController>(FlashCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
