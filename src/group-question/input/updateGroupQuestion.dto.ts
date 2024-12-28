import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  ValidateNested,
} from 'class-validator';
import { IsValidAnswer } from '../../common/validation/IsValidAnswer.constraint';

export class UpdateGroupQuestionDTO {
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

  @IsOptional()
  @IsString()
  transcript: string;
}

class ImageInput {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsOptional()
  @Matches(/^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+/]+={0,2}$/, {
    message: 'Image must be a valid Base64 encoded image (PNG, JPG, JPEG, GIF)',
  })
  file: string;

  @IsOptional()
  @IsString()
  fileUrl: string;

  @IsNotEmpty()
  @IsInt()
  index: number;
}

class QuestionData {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  questionNumber: number;

  @IsOptional()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  answer: string[];

  @IsNotEmpty()
  @IsValidAnswer({ message: 'Answer must be one of the options A, B, C, or D' })
  correctAnswer: string;

  @IsOptional()
  @IsString()
  explain: string;
}
