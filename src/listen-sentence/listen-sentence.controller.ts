import { Controller } from '@nestjs/common';
import { ListenSentenceService } from './listen-sentence.service';

@Controller('listen-sentence')
export class ListenSentenceController {
  constructor(private readonly listenSentenceService: ListenSentenceService) {}
}
