import { Module } from '@nestjs/common';
import { FlashCardService } from './flash-card.service';
import { FlashCardController } from './flash-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashCard } from './entity/flashCard.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { User } from '../users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlashCard, User]), CloudinaryModule],
  controllers: [FlashCardController],
  providers: [FlashCardService],
  exports: [FlashCardService],
})
export class FlashCardModule {}
