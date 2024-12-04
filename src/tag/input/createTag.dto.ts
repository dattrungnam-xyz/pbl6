import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { TagType } from '../../common/type/tag.type';

export class CreateTagDTO {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(TagType, { message: 'type must be a valid TagType' })
  type: TagType;
}
