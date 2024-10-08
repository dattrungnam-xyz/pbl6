import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entity/test.entity';
import { Tag } from '../tag/entity/tag.entity';
import { Part } from '../part/entity/part.entity';
import { GroupQuestion } from '../group-question/entity/groupQuestion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test, Tag, Part, GroupQuestion])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
