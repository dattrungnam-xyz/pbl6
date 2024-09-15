import { IsOptional, IsString } from 'class-validator';

export class CreateGroupQuestionDTO {
  @IsOptional()
  @IsString()
  detail?: string;
  
  @IsOptional()
  @IsString()
  describeQuestion?: string;
}
