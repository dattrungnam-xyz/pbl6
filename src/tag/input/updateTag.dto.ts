import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDTO } from './createTag.dto';

export class UpdateTagDTO extends PartialType(CreateTagDTO) {}
