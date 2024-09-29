import { Body, Controller, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDTO } from './input/createTest.dto';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async createTest(@Body() createTestDTO : CreateTestDTO)
  {
    
  }
}
