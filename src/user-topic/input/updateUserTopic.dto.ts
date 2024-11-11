import { IsNotEmpty, IsString } from 'class-validator';

export class updateUserTopic {
  @IsNotEmpty()
  @IsString()
  name: string;
}
