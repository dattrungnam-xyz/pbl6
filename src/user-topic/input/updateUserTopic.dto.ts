import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserTopicDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
