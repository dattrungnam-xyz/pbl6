import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginGoogleDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  avatar: string;
  @IsNotEmpty()
  name: string;
}
