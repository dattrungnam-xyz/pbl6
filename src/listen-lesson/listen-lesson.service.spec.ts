import { Test, TestingModule } from '@nestjs/testing';
import { ListenLessonService } from './listen-lesson.service';

describe('ListenLessonService', () => {
  let service: ListenLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListenLessonService],
    }).compile();

    service = module.get<ListenLessonService>(ListenLessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
