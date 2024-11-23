import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TestPracticeService } from './test-practice.service';
import { CreateTestPracticeDTO } from './input/createTestPratice.dto';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { CurrentUser } from '../decorator/currentUser.decorator';
import { User } from '../users/entity/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('test-practice')
export class TestPracticeController {
  constructor(private readonly testPracticeService: TestPracticeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTestPractice(
    @Body() createTestPracticeDTO: CreateTestPracticeDTO,
  ) {
    return await this.testPracticeService.createTestPractice(
      createTestPracticeDTO,
    );
  }

  @Get('test/:id')
  @UseGuards(JwtAuthGuard)
  async getListTestPracticeByUserIdAndTestId(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.testPracticeService.getListTestPracticeByUserTest(
      user.id,
      id,
    );
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async getListTestPracticeByUserAndTest(@CurrentUser() user: User) {
    return await this.testPracticeService.getListTestPracticeByUser(user.id);
  }
}
