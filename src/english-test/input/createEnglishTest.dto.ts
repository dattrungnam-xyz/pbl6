import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EngLishTestType } from '../../type/englishTest.type';

export class CreateEnglishTestDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(EngLishTestType)
  type: EngLishTestType;
}
