import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDTO } from './input/createTest.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ParseFile } from '../validation/ParseFile.pipe';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateTestDTO } from './input/updateTest.dto';
import { UpdateTagsTestDTO } from './input/updateTagTest.dto';

@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  //include group question, question, test, question media, question option, tag, part
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 100 },
      { name: 'image' },
    ]),
  )
  async createTest(
    @Body() createTestDTO: CreateTestDTO,
    @UploadedFiles()
    files: {
      audio: Express.Multer.File[];
      image: Express.Multer.File[];
    },
  ) {
    console.log(createTestDTO.partData[0].groupQuestionData[0])
    return;
    let filePromise = [];
    let listFile = [];
    if (files) {
      if (files.audio && files.audio.length) {
        filePromise.push(this.cloudinaryService.uploadListAudio(files.audio));
      }
      if (files.image && files.image.length) {
        filePromise.push(this.cloudinaryService.uploadListImage(files.image));
      }
      listFile = await Promise.all(filePromise);
      listFile = listFile.flat(1);
    }
    return await this.testService.createEntireTest(createTestDTO, listFile);
    // return '';
  }
  @Get()
  async findAll() {
    return await this.testService.findAll();
  }

  @Patch(':id')
  async updateTest(
    @Param('id') id: string,
    @Body() updateTestDTO: UpdateTestDTO,
  ) {
    return await this.testService.updateTest(id, updateTestDTO);
  }

  @Delete(':id')
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
