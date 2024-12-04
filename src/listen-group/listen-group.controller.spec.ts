import { Test, TestingModule } from '@nestjs/testing';
import { ListenGroupController } from './listen-group.controller';
import { ListenGroupService } from './listen-group.service';

describe('ListenGroupController', () => {
  let controller: ListenGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListenGroupController],
      providers: [ListenGroupService],
    }).compile();

    controller = module.get<ListenGroupController>(ListenGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
