import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenGroup, PaginatedListenGroup } from './entity/listenGroup.entity';
import { Repository } from 'typeorm';
import { CreateListenGroupDTO } from './input/createListenGroup.dto';
import { UpdateListenGroupDTO } from './input/updateListenGroup.dto';
import { paginate } from '../pagination/paginator';

@Injectable()
export class ListenGroupService {
  constructor(
    @InjectRepository(ListenGroup)
    private readonly listenGroupRepository: Repository<ListenGroup>,
  ) {}
  async createListenGroup(createListenGroupDTO: CreateListenGroupDTO) {
    return await this.listenGroupRepository.save(
      new ListenGroup({ ...createListenGroupDTO }),
    );
  }
  async updateListenGroup(
    id: string,
    updateListenGroupDTO: UpdateListenGroupDTO,
  ) {
    const groupListenDTO = await this.listenGroupRepository.findOneBy({ id });
    if (!groupListenDTO) {
      throw new NotFoundException('Group listen not found');
    }
    return await this.listenGroupRepository.save(
      new ListenGroup({ ...groupListenDTO, ...updateListenGroupDTO }),
    );
  }
  async getAllListenGroup() {
    return await this.listenGroupRepository.find({
      order: { name: 'ASC' },
      relations: ['listenLessions'],
    });
  }

  async findPagination(limit = 15, page = 0, search?: string, level?: string) {
    const offset = page * limit;
    let qb = this.listenGroupRepository
      .createQueryBuilder('listenGroup')
      .leftJoinAndSelect('listenGroup.listenLessions', 'listenLessions');
    if (search) {
      qb = qb.where('listenGroup.name LIKE :search', {
        search: `%${search}%`,
      });
    }
    if (level) {
      qb = qb.andWhere('listenGroup.level LIKE :level', {
        level: `%${level}%`,
      });
    }
    qb = qb.orderBy('listenGroup.createdAt', 'ASC');
    return paginate<ListenGroup, PaginatedListenGroup>(
      qb,
      PaginatedListenGroup,
      {
        limit,
        page,
        total: true,
      },
    );
  }

  async getListenGroup(id: string) {
    return await this.listenGroupRepository.findOne({
      where: { id },
      relations: ['listenLessions'],
    });
  }
  async deleteListenGroup(id: string) {
    const groupListenDTO = await this.listenGroupRepository.findOneBy({ id });
    if (!groupListenDTO) {
      throw new NotFoundException('Group listen not found');
    }
    await this.listenGroupRepository.softDelete(id);
    return {
      message: 'Delete group listen successfully',
    };
  }
}
