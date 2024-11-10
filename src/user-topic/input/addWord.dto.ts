import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class AddWordDTO {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  listWordId: string[];
}
