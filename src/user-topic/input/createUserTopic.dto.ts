import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserTopicDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
