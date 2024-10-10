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
    // @Body() createTestDTO: CreateTestDTO,
    @UploadedFiles(ParseFile)
    files: {
      audio: Express.Multer.File[];
      image: Express.Multer.File[];
    },
  ) {
    // console.log(files);
    //handle upload list audio files and image files
    const [listAudio, listImage] = await Promise.allSettled([
      this.cloudinaryService.uploadListAudio(files.audio),
      this.cloudinaryService.uploadListImage(files.image),
    ]);

    // console.log(files.image)

    // return await this.testService.createEntireTest(createTestDTO);
    return '';
  }
  @Get()
  async findAll() {
    return await this.testService.findAll();
  }
}
