import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './decorator/role.decorator';
import { Role } from './type/role.type';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ParseFile } from './validation/ParseFile.pipe';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { JwtAuthGuard } from './auth/authGuard.jwt';
import { CurrentUser } from './decorator/currentUser.decorator';
import { RolesGuard } from './auth/roles.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getHello(@CurrentUser() user: any): string {
    // console.log(user);
    return this.appService.getHello();
  }

  // example use upload mp3 file
  @Post()
  async testUploadFile(@Body() body: { file: string }) {
    const file = body.file;
    return await this.cloudinaryService.uploadBase64(file);
  }
}
