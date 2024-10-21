import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TopicQuestionType } from '../../type/topicQuestion.type';
import { WordClassType } from '../../type/wordClass.type';

export class ListTopicQuestionDTO {
  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsString()
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
  @IsString()
  optionA: string;

  @IsOptional()
  @IsString()
  optionB: string;

  @IsOptional()
  @IsString()
  optionC: string;

  @IsOptional()
  @IsString()
  optionD: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsOptional()
  @IsString()
  translate: string;

  @IsOptional()
  @IsString()
  pronunciation: string;

  @IsOptional()
  @IsEnum(WordClassType)
  wordClass: WordClassType;
}
