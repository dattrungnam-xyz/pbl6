import { Module } from '@nestjs/common';
import { ListenLessionService } from './listen-lession.service';
import { ListenLessionController } from './listen-lession.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenGroup } from '../listen-group/entity/listenGroup.entity';
import { ListenLession } from './entity/listenLession.entity';
import { ListenSentence } from '../listen-sentence/entity/listenSentence.entity';
import { ListenSentenceModule } from '../listen-sentence/listen-sentence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListenGroup, ListenLession, ListenSentence]),
    ListenSentenceModule,
    CloudinaryModule,
  ],
  controllers: [ListenLessionController],
  providers: [ListenLessionService],
})
export class ListenLessionModule {}
