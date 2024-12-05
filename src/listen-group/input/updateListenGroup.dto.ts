import { PartialType } from '@nestjs/mapped-types';
import { CreateListenGroupDTO } from './createListenGroup.dto';

export class UpdateListenGroupDTO extends PartialType(CreateListenGroupDTO) {}
