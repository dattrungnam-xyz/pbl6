import { Controller } from '@nestjs/common';
import { GroupQuestionService } from './group-question.service';

@Controller('group-question')
export class GroupQuestionController {
  constructor(private readonly groupQuestionService: GroupQuestionService) {}
}
