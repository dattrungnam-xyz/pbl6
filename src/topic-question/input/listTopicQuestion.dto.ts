import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { TopicQuestionType } from '../../type/topicQuestion.type';
import { WordClassType } from '../../type/wordClass.type';

export class ListTopicQuestionDTO {
  @IsOptional()
  @Matches(/^data:image\/(png|jpg|jpeg|gif);base64,[A-Za-z0-9+/]+={0,2}$/, {
    message:
      'Thumbnail must be a valid Base64 encoded image (PNG, JPG, JPEG, GIF)',
  })
  thumbnail: string;

  @IsOptional()
  @Matches(/^data:audio\/(mp3|wav|mpeg);base64,[A-Za-z0-9+/]+={0,2}$/, {
    message: 'Audio must be a valid Base64 encoded audio file (MP3, WAV, MPEG)',
  })
  audio: string;

  @IsNotEmpty()
  @IsEnum(TopicQuestionType)
  type: TopicQuestionType;

  @IsNotEmpty()
  @IsString()
  describeQuestion: string;

  @IsNotEmpty()
  @IsString()
  questionContent: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  answer: string[];

  @IsNotEmpty()
  @IsString()
  correctAnswer: string;

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
  exampleAudio: string;

  @IsOptional()
  @IsString()
  defenition: string;
}
