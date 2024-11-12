import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserAnswerDTO {
  @IsNotEmpty()
  @IsUUID()
  idQuestion: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
