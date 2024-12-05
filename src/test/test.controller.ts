import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDTO } from './input/createTest.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateTestDTO } from './input/updateTest.dto';
import { UpdateTagsTestDTO } from './input/updateTagTest.dto';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { CurrentUser } from '../common/decorator/currentUser.decorator';
import { User } from '../users/entity/user.entity';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { RolesGuard } from '../auth/roles.guard';

@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  //include group question, question, test, question media, question option, tag, part
  @Post()
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createTest(@Body() createTestDTO: CreateTestDTO) {
    return await this.testService.createEntireTest(createTestDTO);
  }
  @Get()
  async findAll(
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('tag_id') tag_id: string,
  ) {
    return await this.testService.findPagination(limit, page, tag_id);
  }

  @Patch(':id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateTest(
    @Param('id') id: string,
    @Body() updateTestDTO: UpdateTestDTO,
  ) {
    return await this.testService.updateTest(id, updateTestDTO);
  }

  @Get(':id')
  async getTestDetail(@Param('id') id: string) {
    return await this.testService.findOneById(id);
  }
  @Get(':id/user')
  @UseGuards(JwtAuthGuard)
  async getTestHistory(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.testService.getTestHistory(id, user.id);
  }
  @Delete(':id')
  @Roles(Role.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  async deleteTest(@Param('id') id: string) {
    await this.testService.deleteTest(id);
    return {
      message: 'Test deleted successfully.',
    };
  }

  @Patch('tags/:id')
  async updateTagsOfTest(
    @Param('id') id: string,
    @Body() updateTagsTestDTO: UpdateTagsTestDTO,
  ) {
    return await this.testService.updateTagsOfTest(id, updateTagsTestDTO);
  }
}
