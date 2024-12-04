import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { CreateListenSentenceDTO } from '../../listen-sentence/input/createListenSentence.dto';

export class CreateListenLessionDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @Matches(/^data:audio\/(mp3|wav|mpeg);base64,[A-Za-z0-9+/]+={0,2}$/, {
    message: 'Audio must be a valid Base64 encoded audio file (MP3, WAV, MPEG)',
  })
  audioFile: string;

  @IsOptional()
  @IsString()
  audioUrl: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateListenSentenceDTO)
  listenSentences: CreateListenSentenceDTO[];
}
