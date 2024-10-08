import { Body, Controller, Post } from '@nestjs/common';
import { PartService } from './part.service';
import { CreatePartDTO } from './input/createPart.dto';

@Controller('part')
export class PartController {
  constructor(private readonly partService: PartService) {}
  @Post()
  async createPart(@Body() createPartDTO:CreatePartDTO)
  {
    return await this.partService.createPart(createPartDTO);
  }
}
