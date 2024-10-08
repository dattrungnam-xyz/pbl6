import {
  ArrayNotEmpty,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateTagDto } from '../../tag/dto/createTag.dto';
import { Type } from 'class-transformer';
import { IsValidAnswer } from '../../validation/IsValidAnswer.constraint';

export class CreateTestDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Invalid time.' })
  time?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDto)
  tags: CreateTagDto[];

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PartDataDTO)
  partData: PartDataDTO[];
}

class PartDataDTO {
  @IsNotEmpty()
  @IsString()
  part: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => GroupQuestionDataDTO)
  groupQuestionData: GroupQuestionDataDTO[];
}

class GroupQuestionDataDTO {
  //audio: []
  @IsOptional()
  audioName: string;

  @IsOptional()
  imageName: string[];

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

class QuestionData {
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


// example data
// {
// 	name: "toec ets 1 p1" // not null
// 	time: 120, //optional, default value 120
// 	listTag: [{id: 1, name: Ets 2019}, {id:2, name: 2020}],
// 	data:
// 	[// list part
// 		{
// 			part: "part1",
// 			data-listGroupQuestionInPart: [ //list group question
// 			{
// 				audio: abc.mp3,
// 				image: [1.png, 2.png,....]
// 				data-Question:
// 				[
// 					{
// 						number: 12,
// 						question: "day la gi",
// 						optionA: "a",
// 						optionB: "b",
// 						optionC: "c",
// 						optionD: "d",
// 					}
// 				]

// 			}
// 			]
// 		}
// 	]
// }