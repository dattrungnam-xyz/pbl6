import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTagDTO } from '../../tag/input/createTag.dto';
import { ListTopicQuestionDTO } from '../../topic-question/input/listTopicQuestion.dto';

export class CreateTopicDTO {
  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDTO)
  tags: CreateTagDTO[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListTopicQuestionDTO)
  listTopicQuestion: ListTopicQuestionDTO[];
}
