import { Module } from '@nestjs/common';
import { EnglishTestService } from './english-test.service';
import { EnglishTestController } from './english-test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngLishTest } from './entity/englishTest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EngLishTest])],
  controllers: [EnglishTestController],
  providers: [EnglishTestService],
})
export class EnglishTestModule {}
