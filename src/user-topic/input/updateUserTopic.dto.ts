import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserTopicDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
