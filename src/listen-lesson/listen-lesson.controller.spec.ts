import { Test, TestingModule } from '@nestjs/testing';
import { ListenLessonController } from './listen-lesson.controller';
import { ListenLessonService } from './listen-lesson.service';

describe('ListenLessonController', () => {
  let controller: ListenLessonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListenLessonController],
      providers: [ListenLessonService],
    }).compile();

    controller = module.get<ListenLessonController>(ListenLessonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
