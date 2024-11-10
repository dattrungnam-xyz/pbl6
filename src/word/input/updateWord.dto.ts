import { PartialType } from '@nestjs/mapped-types';
import { CreateWordDTO } from './createWord.dto';

export class UpdateWordDTO extends PartialType(CreateWordDTO) {}
