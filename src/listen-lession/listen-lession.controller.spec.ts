import { Test, TestingModule } from '@nestjs/testing';
import { ListenLessionController } from './listen-lession.controller';
import { ListenLessionService } from './listen-lession.service';

describe('ListenLessionController', () => {
  let controller: ListenLessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListenLessionController],
      providers: [ListenLessionService],
    }).compile();

    controller = module.get<ListenLessionController>(ListenLessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
