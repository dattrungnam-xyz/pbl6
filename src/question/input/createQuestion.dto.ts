import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { AnswerType } from '../../type/answer.type';

export class CreateQuestionDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  questionNumber: number;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  optionA: string;

  @IsNotEmpty()
  @IsString()
  optionB: string;

  @IsNotEmpty()
  @IsString()
  optionC: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  optionD: string;

  @IsNotEmpty()
  @IsEnum(AnswerType)
  answer: AnswerType;

  @IsNotEmpty()
  @IsString()
  explain: string;
}
