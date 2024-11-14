import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDTO } from './input/createWord.dto';
import { UpdateWordDTO } from './input/updateWord.dto';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post(':id')
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

  @Get(':id')
  async findWord(@Param('id') id: string) {
    return await this.wordService.findWordById(id);
  }
  @Patch(':id')
  async updateWord(
    @Param('id') id: string,
    @Body() updateWordDTO: UpdateWordDTO,
  ) {
    return await this.wordService.updateWord(id, updateWordDTO);
  }
}
