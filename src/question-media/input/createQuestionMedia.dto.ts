import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { MediaType } from '../../common/type/media.type';

export class CreateQuestionMediaDTO {
  @IsOptional()
  @IsUUID()
  idGroupQuestion: string;

  @IsOptional()
  index: number;

  @IsOptional()
  fileUrl: string;

  @IsOptional()
  file: string;

  @IsNotEmpty()
  type: MediaType;
}
