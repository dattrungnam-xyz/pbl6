import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TopicQuestionType } from "../../type/topicQuestion.type";
import { WordClassType } from "../../type/wordClass.type";

export class CreateTopicQuestionDTO {
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
}
