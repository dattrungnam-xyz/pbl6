import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TestPracticeService } from './test-practice.service';
import { CreateTestPracticeDTO } from './input/createTestPratice.dto';
import { ClassSerializerInterceptor } from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('test-practice')
export class TestPracticeController {
  constructor(private readonly testPracticeService: TestPracticeService) {}

  @Post()
  async createTestPractice(
    @Body() createTestPracticeDTO: CreateTestPracticeDTO,
  ) {
    return await this.testPracticeService.createTestPractice(
      createTestPracticeDTO,
    );
  }

  @Get()
  async getTestPracticeByUserIdAndTestId() {}
}
