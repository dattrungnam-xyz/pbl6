import { Controller } from '@nestjs/common';
import { EnglishTestService } from './english-test.service';

@Controller('english-test')
export class EnglishTestController {
  constructor(private readonly englishTestService: EnglishTestService) {}
}
