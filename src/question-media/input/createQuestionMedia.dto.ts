import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MediaType } from '../../type/media.type';

export class CreateQuestionMediaDTO {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsEnum(MediaType)
  type: MediaType;
}
