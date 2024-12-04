import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenGroup } from './entity/listenGroup.entity';
import { Repository } from 'typeorm';
import { CreateListenGroupDTO } from './input/createListenGroup.dto';
import { UpdateListenGroupDTO } from './input/updateListenGroup.dto';

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
    return await this.listenGroupRepository.find();
  }
  async getListenGroup(id: string) {
    return await this.listenGroupRepository.findOne({
      where: { id },
      relations: ['groupTopics'],
    });
  }
  async deleteListenGroup(id: string) {
    const groupListenDTO = await this.listenGroupRepository.findOneBy({ id });
    if (!groupListenDTO) {
      throw new NotFoundException('Group listen not found');
    }
    return await this.listenGroupRepository.softDelete(id);
  }
}
