import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import { GroupQuestionService } from './group-question.service';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { RolesGuard } from '../auth/roles.guard';

@Controller('group-question')
export class GroupQuestionController {
  constructor(private readonly groupQuestionService: GroupQuestionService) {}
  @Delete(':id')
  @HttpCode(200)
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteGroupQuestion(@Param('id') id: string) {
    await this.groupQuestionService.deleteGroupQuestion(id);
    return {
      message: 'Group question deleted successfully',
    };
  }
}
