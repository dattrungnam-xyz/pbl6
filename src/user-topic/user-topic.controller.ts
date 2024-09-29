import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTopicService } from './user-topic.service';
import { CreateUserTopicDto } from './dto/create-user-topic.dto';
import { UpdateUserTopicDto } from './dto/update-user-topic.dto';

@Controller('user-topic')
export class UserTopicController {
  constructor(private readonly userTopicService: UserTopicService) {}

  @Post()
  create(@Body() createUserTopicDto: CreateUserTopicDto) {
    return this.userTopicService.create(createUserTopicDto);
  }

  @Get()
  findAll() {
    return this.userTopicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTopicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTopicDto: UpdateUserTopicDto) {
    return this.userTopicService.update(+id, updateUserTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTopicService.remove(+id);
  }
}
