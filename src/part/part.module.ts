import { Module } from '@nestjs/common';
import { PartService } from './part.service';
import { PartController } from './part.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Part } from './entity/part.entity';
import { EngLishTest } from '../english-test/entity/englishTest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part, EngLishTest])],
  controllers: [PartController],
  providers: [PartService],
})
export class PartModule {}
