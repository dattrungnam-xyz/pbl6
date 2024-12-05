import { Test, TestingModule } from '@nestjs/testing';
import { ListenLessionService } from './listen-lession.service';

describe('ListenLessionService', () => {
  let service: ListenLessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListenLessionService],
    }).compile();

    service = module.get<ListenLessionService>(ListenLessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
