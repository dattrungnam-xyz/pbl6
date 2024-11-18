import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { WordClassType } from '../../type/wordClass.type';

export class CreateWordDTO {
  @IsOptional()
  @Matches(/^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+/]+={0,2}$/, {
    message:
      'Thumbnail must be a valid Base64 encoded image (PNG, JPG, JPEG, GIF)',
  })
  thumbnail: string;

  @IsOptional()
  thumbnailUrl: string;

  @IsOptional()
  @Matches(/^data:audio\/(mp3|wav|mpeg);base64,[A-Za-z0-9+/]+={0,2}$/, {
    message: 'Audio must be a valid Base64 encoded audio file (MP3, WAV, MPEG)',
  })
  audio: string;

  @IsOptional()
  audioUrl: string;
  
  @IsOptional()
  @IsString()
  translate: string;

  @IsOptional()
  @IsString()
  pronunciation: string;

  @IsOptional()
  @IsEnum(WordClassType)
  wordClass: WordClassType;

  @IsOptional()
  @IsString()
  word: string;

  @IsOptional()
  @IsString()
  example: string;

  @IsOptional()
  @IsString()
  exampleMeaning: string;

  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @Matches(/^data:audio\/(mp3|wav|mpeg);base64,[A-Za-z0-9+/]+={0,2}$/, {
    message:
      'Example audio must be a valid Base64 encoded audio file (MP3, WAV, MPEG)',
  })
  exampleAudio: string;

  @IsOptional()
  exampleAudioUrl: string;

  @IsOptional()
  @IsString()
  definition: string;
}
