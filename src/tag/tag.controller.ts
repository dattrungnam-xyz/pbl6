import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDTO } from './input/createTag.dto';
import { UpdateTagDTO } from './input/updateTag.dto';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { RolesGuard } from '../auth/roles.guard';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateTagDTO: UpdateTagDTO) {
    return this.tagService.update(+id, updateTagDTO);
  }

  @Delete(':id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
