import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { languages } from '../../type/language.type';

export class TranslateDTO {
  @IsOptional()
  @IsEnum(languages)
  from: string;

  @IsOptional()
  @IsEnum(languages)
  to: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
