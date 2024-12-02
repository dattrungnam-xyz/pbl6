import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsUUID()
  idComment: string;

  @IsOptional()
  @IsUUID()
  idTest: string;

  @IsOptional()
  @IsUUID()
  idGroupTopic: string;

  @IsOptional()
  @IsUUID()
  idQuestion: string;
}
