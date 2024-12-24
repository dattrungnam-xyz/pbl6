import { PartialType } from '@nestjs/mapped-types';
import { CreateWordDTO } from './createWord.dto';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Matches,
} from 'class-validator';
import { WordClassType } from '../../common/type/wordClass.type';

export class UpdateWordDTO extends PartialType(CreateWordDTO) {
  @IsOptional()
  @IsUUID()
  idTopic: string;

  @IsOptional()
  @Matches(/^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+/]+={0,2}$/, {
    message:
      'Thumbnail must be a valid Base64 encoded image (PNG, JPG, JPEG, GIF)',
  })
  thumbnail: string;

  @IsOptional()
  @IsNotEmpty()
  thumbnailUrl: string;

  @IsOptional()
  @IsNotEmpty()
  definition: string;

  @IsOptional()
  @IsNotEmpty()
  translate: string;

  @IsOptional()
  @IsEnum(WordClassType)
  wordClass: WordClassType;
}
