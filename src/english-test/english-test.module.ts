import { Module } from '@nestjs/common';
import { EnglishTestService } from './english-test.service';
import { EnglishTestController } from './english-test.controller';

@Module({
  controllers: [EnglishTestController],
  providers: [EnglishTestService],
})
export class EnglishTestModule {}
