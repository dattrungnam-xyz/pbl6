import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupTopic } from '../group-topic/entity/groupTopic.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { Rating } from './entity/rating.entity';
import { CreateRatingDTO } from './input/createRating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(GroupTopic)
    private readonly groupTopicRepository: Repository<GroupTopic>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}
  async createRatingGroupTopic(
    idUser: string,
    idGroupTopic: string,
    createRatingDTO: CreateRatingDTO,
  ) {
    const user = await this.userRepository.findOneBy({ id: idUser });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const groupTopic = await this.groupTopicRepository.findOneBy({
      id: idGroupTopic,
    });
    if (!groupTopic) {
      throw new NotFoundException('Group topic not found');
    }
    const existingRating = await this.ratingRepository.findOne({
      where: { user: { id: idUser }, groupTopic: { id: idGroupTopic } },
    });
    if (existingRating) {
      throw new BadRequestException('Rating already exists');
    }
    return await this.ratingRepository.save(
      new Rating({ ...createRatingDTO, user, groupTopic }),
    );
    // const user = await this.userRepository.findOne(idUser);
    // const groupTopic = await this.groupTopicRepository;
  }
  async getRatingGroupTopic(id: string) {
    return await this.ratingRepository.find({
      where: { groupTopic: { id } },
      relations: ['user'],
    });
  }
}
