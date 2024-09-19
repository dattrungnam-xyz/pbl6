import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserDoesNotExist } from '../../validation/UserDoesNotExist.constraint';
import { IsRepeated } from '../../validation/IsRepeated.constraint';
import { Role } from '../../type/role.type';

export class CreateUserDTO {

  @IsNotEmpty()
  @Length(6)
  @IsString()
  @UserDoesNotExist()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @UserDoesNotExist()
  email: string;

  @IsNotEmpty()
  @Length(6)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsRepeated('password')
  passwordConfirm: string;

  @IsNotEmpty()
  @IsEnum(Role, { message: "Invalid role." })
  role: Role;
  
}
