import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CurrentUser } from '../common/decorator/currentUser.decorator';
import { User } from '../users/entity/user.entity';
import { CreateCommentDTO } from './input/createComment.dto';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { UpdateCommentDTO } from './input/updateComment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async CreateCommentDTO(
    @CurrentUser() user: User,
    @Body() createCommentDTO: CreateCommentDTO,
  ) {
    return await this.commentService.createComment(user.id, createCommentDTO);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateComment(
    @Param('id') id: string,
    @Body() updateCommentDTO: UpdateCommentDTO,
    @CurrentUser() user: User,
  ) {
    return await this.commentService.updateComment(
      id,
      updateCommentDTO,
      user.id,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.commentService.deleteComment(id, user.id);
  }

  @Get('test/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getTestComment(@Param('id') id: string) {
    return await this.commentService.getComment(id, 'test');
  }
  @Get('group-topic/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getGroupTopicComment(@Param('id') id: string) {
    return await this.commentService.getComment(id, 'groupTopic');
  }
  @Get('question/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getQuestionComment(@Param('id') id: string) {
    return await this.commentService.getComment(id, 'question');
  }
}
