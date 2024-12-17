import { IsNotEmpty, IsString } from 'class-validator';

export class TextToSpeechDTO {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  voiceId: string;
}
