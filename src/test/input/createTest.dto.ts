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
import { CreateTagDTO } from '../../tag/input/createTag.dto';
import { Type } from 'class-transformer';
import { IsValidAnswer } from '../../common/validation/IsValidAnswer.constraint';
import { PartDataDTO } from '../../part/input/partData.dto';

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
  @Type(() => CreateTagDTO)
  tags: CreateTagDTO[];

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PartDataDTO)
  partData: PartDataDTO[];
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
