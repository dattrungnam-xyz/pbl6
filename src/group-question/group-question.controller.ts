import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GroupQuestionService } from './group-question.service';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateGroupQuestionDTO } from './input/updateGroupQuestion.dto';

@Controller('group-question')
export class GroupQuestionController {
  constructor(private readonly groupQuestionService: GroupQuestionService) {}
  @Delete(':id')
  @HttpCode(200)
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteGroupQuestion(@Param('id') id: string) {
    await this.groupQuestionService.deleteGroupQuestion(id);
    return {
      message: 'Group question deleted successfully',
    };
  }

  @Patch(':id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateGroupQuestion(
    @Param('id') id: string,
    @Body() updateGroupQuestionDTO: UpdateGroupQuestionDTO,
  ) {
    return await this.groupQuestionService.updateGroupQuestion(
      id,
      updateGroupQuestionDTO,
    );
  }
}
