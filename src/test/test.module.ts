import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entity/test.entity';
import { Tag } from '../tag/entity/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test,Tag])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
