import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entity/rating.entity';
import { GroupTopic } from '../group-topic/entity/groupTopic.entity';
import { User } from '../users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, GroupTopic, User])],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
