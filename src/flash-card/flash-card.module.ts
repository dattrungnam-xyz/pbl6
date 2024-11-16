import { Module } from '@nestjs/common';
import { FlashCardService } from './flash-card.service';
import { FlashCardController } from './flash-card.controller';

@Module({
  controllers: [FlashCardController],
  providers: [FlashCardService],
})
export class FlashCardModule {}
