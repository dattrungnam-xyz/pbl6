import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Level } from '../../common/type/level.type';

export class CreateListenGroupDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Level, {
    message: 'Level must be either advanced, beginner, or intermediate.',
  })
  level: Level;
}
