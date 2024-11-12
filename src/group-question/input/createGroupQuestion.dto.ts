import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { QuestionData } from '../../question/input/questionData.dto';

export class GroupQuestionDataDTO {
  //audio: []
  @IsOptional()
  @Matches(/^data:audio\/(mp3|wav|mpeg);base64,[A-Za-z0-9+/]+={0,2}$/, {
    message: 'Audio must be a valid Base64 encoded audio file (MP3, WAV, MPEG)',
  })
  audio: string;

  @IsOptional()
  @IsString()
  audioUrl: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageInput)
  image: ImageInput[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => QuestionData)
  questionData: QuestionData[];

  @IsOptional()
  @IsString()
  describeAnswer: string;

  @IsOptional()
  @IsString()
  detail: string;
}

class ImageInput {
  @IsOptional()
  @Matches(/^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+/]+={0,2}$/, {
    message:
      'Image must be a valid Base64 encoded image (PNG, JPG, JPEG, GIF)',
  })
  file: string;

  @IsOptional()
  @IsString()
  fileUrl: string;

  @IsNotEmpty()
  @IsInt()
  index: number;
}
