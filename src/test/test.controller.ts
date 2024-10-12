import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDTO } from './input/createTest.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ParseFile } from '../validation/ParseFile.pipe';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

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
}
