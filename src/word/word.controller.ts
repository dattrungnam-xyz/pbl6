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
  Logger,
} from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDTO } from './input/createWord.dto';
import { UpdateWordDTO } from './input/updateWord.dto';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { CurrentUser } from '../common/decorator/currentUser.decorator';
import { User } from '../users/entity/user.entity';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { RolesGuard } from '../auth/roles.guard';

@Controller('word')
@UseInterceptors(ClassSerializerInterceptor)
export class WordController {
  constructor(private readonly wordService: WordService) {}
  private readonly logger = new Logger(WordController.name);

  @Post(':id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createWordWithTopic(
    @Param('id') topicId: string,
    @Body() createWordDTO: CreateWordDTO,
  ) {
    return await this.wordService.createWord(createWordDTO, topicId);
  }

  @Post()
  async createWord(@Body() createWordDTO: CreateWordDTO) {
    return await this.wordService.createWord(createWordDTO);
  }
  @Get('')
  async findListWord() {
    return await this.wordService.findWord();
  }

  @Get(':id')
  async findWord(@Param('id') id: string) {
    return await this.wordService.findWordById(id);
  }
  @Patch(':id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateWord(
    @Param('id') id: string,
    @Body() updateWordDTO: UpdateWordDTO,
  ) {
    return await this.wordService.updateWord(id, updateWordDTO);
  }
  @Delete(':id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteWord(@Param('id') id: string) {
    return await this.wordService.deleteWord(id);
  }

  // @Post('flash-card/:idFlashCard')
  // @UseGuards(JwtAuthGuard)
  // async createWordFlashCard(
  //   @CurrentUser() user: User,
  //   @Body() createWordDTO: CreateWordDTO,
  //   @Param('idFlashCard') idFlashCard: string,
  // ) {
  //   return await this.wordService.createWordFlashCard(
  //     idFlashCard,
  //     createWordDTO,
  //     user.id,
  //   );
  // }

  // @Delete('flash-card/:idWord')
  // @UseGuards(JwtAuthGuard)
  // async deleteWordFlashCard(
  //   @CurrentUser() user: User,
  //   @Param('idWord') idWord: string,
  // ) {
  //   return await this.wordService.deleteWordFlashCard(idWord, user.id);
  // }

  // @Patch('flash-card/:idWord')
  // @UseGuards(JwtAuthGuard)
  // async updateWordFlashCard(
  //   @CurrentUser() user: User,
  //   @Param('idWord') idWord: string,
  //   @Body() updateWordDTO: UpdateWordDTO,
  // ) {
  //   return await this.wordService.updateWordFlashCard(
  //     idWord,
  //     updateWordDTO,
  //     user.id,
  //   );
  // }
}
