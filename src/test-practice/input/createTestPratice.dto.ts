import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateUserAnswerDTO } from '../../user-answer/input/createUserAnswer.dto';
import { Type } from 'class-transformer';

export class CreateTestPracticeDTO {
  @IsOptional()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  testId: string;

  @IsNotEmpty()
  @IsNumber()
  time: number;

  @IsOptional()
  @IsNumber()
  score: number;

  @IsOptional()
  @IsNumber()
  totalQuestion: number;

  @IsOptional()
  @IsNumber()
  numCorrect: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUserAnswerDTO)
  userAnswer: CreateUserAnswerDTO[];
}
