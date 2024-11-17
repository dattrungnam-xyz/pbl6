import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FlashCardService } from './flash-card.service';
import { CreateFlashCardDTO } from './input/createFlashCard.dto';
import { UpdateFlashCardDTO } from './input/updateFlashCard.dto';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { CurrentUser } from '../decorator/currentUser.decorator';
import { User } from '../users/entity/user.entity';

@Controller('flash-card')
@UseInterceptors(ClassSerializerInterceptor)
export class FlashCardController {
  constructor(private readonly flashCardService: FlashCardService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async createFlashCard(
    @CurrentUser() user: User,
    @Body() createFlashCardDTO: CreateFlashCardDTO,
  ) {
    return this.flashCardService.createFlashCard(user.id, createFlashCardDTO);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateFlashCard(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() updateFlashCardDTO: UpdateFlashCardDTO,
  ) {
    return this.flashCardService.updateFlashCard(
      id,
      user.id,
      updateFlashCardDTO,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteFlashCard(@CurrentUser() user: User, @Param('id') id: string) {
    return this.flashCardService.deleteFlashCard(id, user.id);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async findListFlashCardByUserId(@Param('userId') id: string) {
    return await this.flashCardService.findListFlashCardByUserId(id);
  }

  @Get('user/')
  @UseGuards(JwtAuthGuard)
  async findListFlashCardByUser(@CurrentUser() user: User) {
    return await this.flashCardService.findListFlashCardByUserId(user.id);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findFlashCartDetail(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ) {
    return await this.flashCardService.findFlashCardDetail(id, user.id);
  }
  @Get()
  async getListFlashCard() {
    return await this.flashCardService.getListFlashCard();
  }
}
