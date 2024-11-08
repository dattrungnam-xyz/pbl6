import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDTO } from './input/createWord.dto';

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

}
