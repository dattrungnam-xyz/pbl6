import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { UpdateQuestionDTO } from './input/updateQuestion.dto';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { Roles } from '../decorator/role.decorator';
import { Role } from '../type/role.type';
import { RolesGuard } from '../auth/roles.guard';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Patch(':id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateQuestion(
    @Param('id') id: string,
    @Body() updateQuestionDTO: UpdateQuestionDTO,
  ) {
    return await this.questionService.updateQuestion(id, updateQuestionDTO);
  }
  @Delete(':id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteQuestion(@Param('id') id: string) {
    await this.questionService.deleteQuestion(id);
    return { message: 'Question deleted successfully' };
  }
}
