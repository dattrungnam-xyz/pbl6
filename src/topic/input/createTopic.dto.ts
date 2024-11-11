import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { CreateTagDTO } from '../../tag/input/createTag.dto';
import { CreateWordDTO } from '../../word/input/createWord.dto';


export class CreateTopicDTO {
  @IsOptional()
  @Matches(/^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+/]+={0,2}$/, {
    message:
      'Avatar must be a valid Base64 encoded image (PNG, JPG, JPEG, GIF)',
  })
  thumbnail: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDTO)
  tags: CreateTagDTO[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWordDTO)
  listWord: CreateWordDTO[];
}
