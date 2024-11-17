import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashCardDTO } from './createFlashCard.dto';

export class UpdateFlashCardDTO extends PartialType(CreateFlashCardDTO) {}
