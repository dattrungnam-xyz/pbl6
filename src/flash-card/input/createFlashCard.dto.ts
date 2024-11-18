import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFlashCardDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
