import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTestDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, {message:"Invalid time."})
  time: number;
}
