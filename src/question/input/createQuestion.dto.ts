import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { AnswerType } from '../../type/answer.type';
import { IsValidAnswer } from '../../validation/IsValidAnswer.constraint';

export class CreateQuestionDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  questionNumber: number;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  explain: string;
}
