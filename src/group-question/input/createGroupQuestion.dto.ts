import { Type } from "class-transformer";
import { ArrayNotEmpty, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { QuestionData } from "../../question/input/questionData.dto";

export class GroupQuestionDataDTO {
  //audio: []
  @IsOptional()
  audio: string;

  @IsOptional()
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

class ImageInput
{

  filename: string;
  index: number
}