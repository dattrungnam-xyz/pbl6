import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddTopicDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  idTopic: string;
}
