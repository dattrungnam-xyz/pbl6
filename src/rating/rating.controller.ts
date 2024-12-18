import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { RatingService } from './rating.service';
import { JwtAuthGuard } from '../auth/authGuard.jwt';
import { CurrentUser } from '../common/decorator/currentUser.decorator';
import { User } from '../users/entity/user.entity';
import { CreateRatingDTO } from './input/createRating.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post('/groupTopic/:id')
  @UseGuards(JwtAuthGuard)
  async createRating(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() createRatingDTO: CreateRatingDTO,
  ) {
    return await this.ratingService.createRatingGroupTopic(
      user.id,
      id,
      createRatingDTO,
    );
  }
  @Get('/groupTopic/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getRatingGroupTopic(@Param('id') id: string) {
    return await this.ratingService.getRatingGroupTopic(id);
  }
}
