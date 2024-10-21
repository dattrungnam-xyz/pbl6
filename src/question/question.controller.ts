import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { QuestionService } from './question.service';
import { UpdateQuestionDTO } from './input/updateQuestion.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Patch(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() updateQuestionDTO: UpdateQuestionDTO,
  ) {
    return await this.questionService.updateQuestion(id, updateQuestionDTO);
  }
  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    await this.questionService.deleteQuestion(id);
    return { message: 'Question deleted successfully' };
  }
}
