import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDTO } from './input/createTest.dto';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {
    
  }
  //include group question, question, test, question media, question option, tag, part
  @Post()
  async createTest(@Body() createTestDTO:CreateTestDTO){
    return await this.testService.createEntireTest(createTestDTO)
  }
  @Get()
  async findAll()
  {
    return await this.testService.findAll()
  }
}
