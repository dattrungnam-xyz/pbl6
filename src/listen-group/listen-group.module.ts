import { Module } from '@nestjs/common';
import { ListenGroupService } from './listen-group.service';
import { ListenGroupController } from './listen-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenGroup } from './entity/listenGroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListenGroup])],
  controllers: [ListenGroupController],
  providers: [ListenGroupService],
})
export class ListenGroupModule {}
