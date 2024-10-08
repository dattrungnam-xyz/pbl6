import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDTO } from './input/createTest.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}
  //include group question, question, test, question media, question option, tag, part
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'audio' }, { name: 'image' }]),
  )
  async createTest(@Body() createTestDTO: CreateTestDTO) {
    return await this.testService.createEntireTest(createTestDTO);
  }
  @Get()
  async findAll() {
    return await this.testService.findAll();
  }
}
