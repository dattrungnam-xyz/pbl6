import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { UpdateProfileDTO } from './input/updateProfile.dto';
import { CurrentUser } from '../common/decorator/currentUser.decorator';
import { User } from './entity/user.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { RolesGuard } from '../auth/roles.guard';

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

  @Get()
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getListUser() {
    return await this.usersService.getListUser();
  }

  @Patch('active/:id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async activeUser(@Param('id') id: string) {
    return await this.usersService.activeUser(id);
  }

  @Patch('deactive/:id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deactiveUser(@Param('id') id: string) {
    return await this.usersService.deactiveUser(id);
  }

  @Delete(':id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
  @Get('with-delete')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getListUserWithDelete() {
    return await this.usersService.getListUserWithDelete();
  }

  @Get('delete')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getListUserDelete() {
    return await this.usersService.getListUserDelete();
  }
  @Get('active')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getListUserActive() {
    return await this.usersService.getListUserActive();
  }
  @Get('deactive')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getListUserDeactive() {
    return await this.usersService.getListUserDeactive();
  }
}
