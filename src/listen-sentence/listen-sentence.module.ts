import { Module } from '@nestjs/common';
import { ListenSentenceService } from './listen-sentence.service';
import { ListenSentenceController } from './listen-sentence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenSentence } from './entity/listenSentence.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListenSentence]), CloudinaryModule],
  controllers: [ListenSentenceController],
  providers: [ListenSentenceService],
  exports: [ListenSentenceService],
})
export class ListenSentenceModule {}
