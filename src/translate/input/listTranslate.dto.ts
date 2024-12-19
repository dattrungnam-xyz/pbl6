import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { languages } from '../../common/type/language.type';

export class TranslateListDTO {
  @IsOptional()
  @IsEnum(languages)
  from: string;

  @IsOptional()
  @IsEnum(languages)
  to: string;

  @IsNotEmpty()
  @IsArray()
  listText: string[];
}