import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { GroupQuestionService } from './group-question.service';

@Controller('group-question')
export class GroupQuestionController {
  constructor(private readonly groupQuestionService: GroupQuestionService) {}
  @Delete(':id')
  @HttpCode(200)
  async deleteGroupQuestion(@Param('id') id: string) {
    await this.groupQuestionService.deleteGroupQuestion(id);
    return {
      message: 'Group question deleted successfully',
    };
  }
}
