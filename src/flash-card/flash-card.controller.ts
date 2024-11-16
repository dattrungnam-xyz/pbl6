import { Controller } from '@nestjs/common';
import { FlashCardService } from './flash-card.service';

@Controller('flash-card')
export class FlashCardController {
  constructor(private readonly flashCardService: FlashCardService) {}
}
