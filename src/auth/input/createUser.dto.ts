import { ArrayNotEmpty, IsArray, IsEmail, IsString, Length } from 'class-validator';
import { UserDoesNotExist } from '../../validation/UserDoesNotExist.constraint';
import { IsRepeated } from '../../validation/IsRepeated.constraint';
import { Role } from '../../type/role.type';

export class CreateUserDTO {
  @Length(6)
  @IsString()
  @UserDoesNotExist()
  username: string;

  @IsString()
  @Length(6)
  name: string;

  @IsEmail()
  @UserDoesNotExist()
  email: string;

  @Length(6)
  @IsString()
  password: string;

  @IsString()
  @IsRepeated('password')
  passwordConfirm: string;

  @IsArray()
  @ArrayNotEmpty()
  roles: Role[];
  
}
