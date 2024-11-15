import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { GroupQuestionDataDTO } from '../../group-question/input/createGroupQuestion.dto';

export class PartDataDTO {
  @IsNotEmpty()
  @IsUUID()
  part: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => GroupQuestionDataDTO)
  groupQuestionData: GroupQuestionDataDTO[];
}
