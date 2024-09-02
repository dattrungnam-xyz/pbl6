import { Controller } from '@nestjs/common';
import { PartService } from './part.service';

@Controller('part')
export class PartController {
  constructor(private readonly partService: PartService) {}
}
