import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDTO } from './input/createTag.dto';
import { UpdateTagDTO } from './input/updateTag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDTO) {
    return await this.tagService.create(createTagDto);
  }

  @Get()
  async findAll(@Query('type') type: string) {
    if (type) {
      return await this.tagService.findAllByType(type);
    }
    return await this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDTO: UpdateTagDTO) {
    return this.tagService.update(+id, updateTagDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
