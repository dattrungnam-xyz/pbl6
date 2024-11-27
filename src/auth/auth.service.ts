import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../users/entity/user.entity';
import { MoreThan, Repository } from 'typeorm';
import { CreateUserDTO } from './input/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { ResetPassworDTO } from './input/resetPassword.dto';
import { UpdatePasswordDTO } from './input/updatePassword.dto';
import { MailService } from '../mail/mail.service';
import { LoginException } from '../exception/login.exception';
import { Role } from '../type/role.type';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private oauth2Client: OAuth2Client;
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {
    this.oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  public async comparePassword(
    password: string,
    userpassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, userpassword);
  }
  public async validateUser(username: string, password: string): Promise<User> {
    if (!username.trim() || !password.trim()) {
      throw new LoginException();
    }
    const user: User = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      this.logger.debug(`User ${username} not found`);
      throw new LoginException();
    }
    if (!(await this.comparePassword(password, user.password))) {
      this.logger.debug(`Password incorrect!`);
      throw new LoginException();
    }

    return user;
  }
  public signToken(user: User): string {
    return this.jwtService.sign({ id: user.id });
  }
  public async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    createUserDTO.passwordConfirm = undefined;
    let date = new Date();
    date.setMonth(date.getMonth() + 3);
    return this.userRepository.save(
      new User({
        ...createUserDTO,
        testDate: date,
        password: await this.hashPassword(createUserDTO.password),
      }),
    );
  }
  public async forgotPassword(email: string, host: string) {
    let user = await this.userRepository.findOneBy({
      email: email,
    });
    if (user == null) {
      throw new NotFoundException('There is no user with email address');
    }
    const token = crypto.randomBytes(32).toString('hex');
    // console.log(token);
    await this.userRepository.save(
      new User({
        ...user,
        passwordResetToken: crypto
          .createHash('sha256')
          .update(token)
          .digest('hex'),
        passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000),
      }),
    );
    const resetURL = `${host}/auth/resetPassword/${token}`;
    await this.mailService.sendMailResetPassword(user, resetURL);
    return {
      status: 'success',
      message: 'Token sent to email!',
    };
  }
  public async resetPassword(token: string, resetPassword: ResetPassworDTO) {
    let hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    let user = await this.userRepository.findOne({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: MoreThan(new Date()),
      },
    });
    if (user == null) {
      throw new NotFoundException('Token is invalid or has expired');
    }
    await this.userRepository.save(
      new User({
        ...user,
        password: await this.hashPassword(resetPassword.password),
        passwordResetToken: null,
        passwordResetExpires: null,
        passwordChangedAt: new Date(),
      }),
    );
    return {
      status: 'success',
      message: 'Password reset successful!',
    };
  }
  async updatePassword(id: string, updatePassword: UpdatePasswordDTO) {
    let user = await this.userRepository.findOneBy({ id });
    // console.log(user);
    if (!user) {
      throw new NotFoundException();
    }
    if (
      !(await this.comparePassword(
        updatePassword.currentPassword,
        user.password,
      ))
    ) {
      throw new UnauthorizedException('Your current password is incorrect');
    }
    let newUser = await this.userRepository.save(
      new User({
        ...user,
        password: await this.hashPassword(updatePassword.password),
        passwordChangedAt: new Date(),
      }),
    );
    return newUser;
  }
  async googleLogin(req: any) {
    const user = await this.userRepository.findOneBy({ email: req.user.email });
    if (!user) {
      const newUser = new User({ ...req.user, roles: ['user'] });
      await this.userRepository.save(newUser);
      return {
        token: this.signToken(newUser),
        user: newUser,
      };
    }
    return {
      token: this.signToken(user),
      user: user,
    };
  }

  async validateGoogleToken(token: string) {
    try {
      const ticket = await this.oauth2Client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const avatar = payload?.picture;
      const googleId = payload?.sub;
      const email = payload?.email;
      const name = payload?.name;
      const user = await this.userRepository.findOneBy({
        email,
      });
      if (!user) {
        const date = new Date();
        date.setMonth(date.getMonth() + 3);
        const newUser = new User({
          avatar,
          email,
          testDate: date,
          name,
          roles: ['user'] as Role[],
        });
        await this.userRepository.save(newUser);
        return {
          token: this.signToken(newUser),
          user: newUser,
        };
      }
      return {
        token: this.signToken(user),
        user: user,
      };
    } catch (error) {
      throw new Error('Invalid Google token');
    }
  }
}
