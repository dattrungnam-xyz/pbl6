import { Controller } from '@nestjs/common';
import { QuestionMediaService } from './question-media.service';

@Controller('question-media')
export class QuestionMediaController {
  constructor(private readonly questionMediaService: QuestionMediaService) {}
}
