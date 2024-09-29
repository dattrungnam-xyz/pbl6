import { Controller } from '@nestjs/common';
import { UserNewWordService } from './user-new-word.service';

@Controller('user-new-word')
export class UserNewWordController {
  constructor(private readonly userNewWordService: UserNewWordService) {}
}
