import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PartService } from './part.service';
import { CreatePartDTO } from './input/createPart.dto';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { Roles } from '../common/decorator/role.decorator';
import { Role } from '../common/type/role.type';
import { RolesGuard } from '../auth/roles.guard';

@Controller('part')
export class PartController {
  constructor(private readonly partService: PartService) {}
  @Post()
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createPart(@Body() createPartDTO: CreatePartDTO) {
    return await this.partService.createPart(createPartDTO);
  }

  @Get()
  async findListPart() {
    return await this.partService.findListPart();
  }

  @Delete('id')
  @Roles(Role.MODERATOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deletePart(@Param('id') id: string) {
    return await this.partService.deletePart(id);
  }
}
