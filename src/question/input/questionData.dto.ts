import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsValidAnswer } from '../../validation/IsValidAnswer.constraint';

export class QuestionData {
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
