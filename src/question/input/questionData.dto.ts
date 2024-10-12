import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsValidAnswer } from "../../validation/IsValidAnswer.constraint";

export class QuestionData {
    @IsNotEmpty()
    @IsNumber()
    questionNumber: number;
  
    @IsOptional()
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
    @IsString()
    optionD: string;
  
    @IsNotEmpty()
    @IsValidAnswer({ message: 'Answer must be one of the options A, B, C, or D' })
    answer: string;
  
    @IsOptional()
    @IsString()
    explain: string;
  }