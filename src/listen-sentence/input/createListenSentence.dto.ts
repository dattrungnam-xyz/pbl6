import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateListenSentenceDTO {
  @IsOptional()
  @Matches(/^data:audio\/(mp3|wav|mpeg);base64,[A-Za-z0-9+/]+={0,2}$/, {
    message: 'Audio must be a valid Base64 encoded audio file (MP3, WAV, MPEG)',
  })
  audio: string;

  @IsOptional()
  @IsString()
  audioUrl: string;

  @IsNotEmpty()
  @IsString()
  sentence: string;
}
