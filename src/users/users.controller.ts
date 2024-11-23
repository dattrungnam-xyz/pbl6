import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Patch,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDTO } from './input/updateProfile.dto';
import { CurrentUser } from '../decorator/currentUser.decorator';
import { User } from './entity/user.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Patch('updateProfile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateProfile(
    @Body() updateProfileDTO: UpdateProfileDTO,
    @CurrentUser() user: User,
  ) {
    if (!user) {
      throw new UnauthorizedException();
    }
    if (updateProfileDTO.avatarUrl) {
      updateProfileDTO.avatar = updateProfileDTO.avatarUrl;
    } else if (updateProfileDTO.avatar) {
      updateProfileDTO.avatar = (
        await this.cloudinaryService.uploadImageBase64(updateProfileDTO.avatar)
      ).url;
    }
    return await this.usersService.updateProfile(user, updateProfileDTO);
  }
}
