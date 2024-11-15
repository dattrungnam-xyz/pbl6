import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PartService } from './part.service';
import { CreatePartDTO } from './input/createPart.dto';

@Controller('part')
export class PartController {
  constructor(private readonly partService: PartService) {}
  @Post()
  async createPart(@Body() createPartDTO: CreatePartDTO) {
    return await this.partService.createPart(createPartDTO);
  }

  @Get()
  async findListPart() {
    return await this.partService.findListPart();
  }

  @Delete('id')
  async deletePart(@Param('id') id: string) {
    return await this.partService.deletePart(id);
  }
}
