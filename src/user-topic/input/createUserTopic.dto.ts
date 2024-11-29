import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserTopicDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
