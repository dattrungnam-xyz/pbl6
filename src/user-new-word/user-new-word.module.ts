import { Module } from '@nestjs/common';
import { UserNewWordService } from './user-new-word.service';
import { UserNewWordController } from './user-new-word.controller';

@Module({
  controllers: [UserNewWordController],
  providers: [UserNewWordService],
})
export class UserNewWordModule {}
