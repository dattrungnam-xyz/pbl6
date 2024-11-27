import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateTopicHistoryDTO {
  @IsOptional()
  @IsUUID()
  idUser: string;

  @IsNotEmpty()
  @IsUUID()
  idTopic: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  time: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  numCorrect: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalWord: number;

  @IsArray()
  @IsUUID('all', { each: true })
  listCorrectWord: string[];

  @IsArray()
  @IsUUID('all', { each: true })
  listIncorrectWord: string[];
}
