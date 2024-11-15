import { ArrayNotEmpty, IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdateListWordTopicDTO {
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  push: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  pull: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  listWord: string[];
}
