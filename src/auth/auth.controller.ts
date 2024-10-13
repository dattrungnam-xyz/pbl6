import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuardLocal } from './authGuard.local';
import { User } from '../users/entity/user.entity';
import { MailService } from '../mail/mail.service';
import { CurrentUser } from '../decorator/currentUser.decorator';
import { CreateUserDTO } from './input/createUser.dto';
import { ForgotPassWordDTO } from './input/forgotPassword.dto';
import { ResetPassworDTO } from './input/resetPassword.dto';
import { JwtAuthGuard } from './authGuard.jwt';
import { UpdatePasswordDTO } from './input/updatePassword.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}
  @Post('login')
  @UseGuards(AuthGuardLocal)
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@CurrentUser() user: User) {
    // let user = await this.authService.createUser(createUserDTO);
    return {
      token: this.authService.signToken(user),
      user: user,
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getMe(@Req() req: any): Promise<User> {
    // this.mailService.sendMailResetPassword(req.user, 'testurl');
    return req.user;
  }

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() createUserDTO: CreateUserDTO) {
    let user = await this.authService.createUser(createUserDTO);
    return {
      token: this.authService.signToken(user),
      user: user,
    };
  }

  @Post('forgotPassword')
  @UseInterceptors(ClassSerializerInterceptor)
  async forgotPassword(
    @Body() forgotPassWordDTO: ForgotPassWordDTO,
    @Req() req: Request,
  ) {
    let host = `${req.protocol}://${req.get('Host')}`;
    return await this.authService.forgotPassword(forgotPassWordDTO.email, host);
  }

  @Patch('resetPassword/:token')
  @UseInterceptors(ClassSerializerInterceptor)
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPassworDTO: ResetPassworDTO,
  ) {
    return await this.authService.resetPassword(token, resetPassworDTO);
  }

  @Patch('updatePassword')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(
    @CurrentUser() user: User,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ) {
    if (!user) throw new UnauthorizedException();
    return await this.authService.updatePassword(user.id, updatePasswordDTO);
  }
}
