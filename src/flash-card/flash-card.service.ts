import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlashCard } from './entity/flashCard.entity';
import { Repository } from 'typeorm';
import { CreateFlashCardDTO } from './input/createFlashCard.dto';
import { UpdateFlashCardDTO } from './input/updateFlashCard.dto';
import { User } from '../users/entity/user.entity';

@Injectable()
export class FlashCardService {
  constructor(
    @InjectRepository(FlashCard)
    private readonly flashCardRepository: Repository<FlashCard>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createFlashCard(
    userId: string,
    createFlashCardDTO: CreateFlashCardDTO,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const newFlashCard = new FlashCard();
    newFlashCard.user = user;
    Object.assign(newFlashCard, createFlashCardDTO);
    return await this.flashCardRepository.save(newFlashCard);
  }
  async updateFlashCard(
    id: string,
    userId: string,
    updateFlashCardDTO: UpdateFlashCardDTO,
  ) {
    const flashCard = await this.flashCardRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!flashCard) throw new NotFoundException('Flash card not found');
    if (userId !== flashCard.user.id) {
      throw new ForbiddenException(
        'User not allowed to update this flash card',
      );
    }
    return await this.flashCardRepository.save(
      new FlashCard({ ...flashCard, ...updateFlashCardDTO }),
    );
  }
  async deleteFlashCard(id: string, userId: string) {
    const flashCard = await this.flashCardRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!flashCard) throw new NotFoundException('Flash card not found');
    if (flashCard.user.id !== userId) {
      throw new ForbiddenException('User not allowed to view this flash card');
    }
    return await this.flashCardRepository.softDelete(id);
  }
  async findListFlashCardByUserId(userId: string) {
    return await this.flashCardRepository
      .createQueryBuilder('flashCard')
      .innerJoinAndSelect('flashCard.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }
  async findFlashCardDetail(id: string, userId: string) {
    const flashCard = await this.flashCardRepository.findOne({
      where: { id },
      relations: ['words', 'user'],
    });
    if (!flashCard) throw new NotFoundException('Flash card not found');
    if (flashCard.user.id !== userId) {
      throw new ForbiddenException('User not allowed to view this flash card');
    }
    return flashCard;
  }

  async getListFlashCard() {
    return await this.flashCardRepository.find({ relations: ['user'] });
  }

  async findFlashCardById(id: string) {
    return await this.flashCardRepository.findOne({
      where: { id },
      relations: ['words', 'user'],
    });
  }
}
