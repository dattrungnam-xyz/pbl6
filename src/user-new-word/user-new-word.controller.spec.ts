import { Test, TestingModule } from '@nestjs/testing';
import { UserNewWordController } from './user-new-word.controller';
import { UserNewWordService } from './user-new-word.service';

describe('UserNewWordController', () => {
  let controller: UserNewWordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserNewWordController],
      providers: [UserNewWordService],
    }).compile();

    controller = module.get<UserNewWordController>(UserNewWordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
