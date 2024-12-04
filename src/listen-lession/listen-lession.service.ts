import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenGroup } from '../listen-group/entity/listenGroup.entity';
import { Repository } from 'typeorm';
import { ListenSentence } from '../listen-sentence/entity/listenSentence.entity';
import { ListenLession } from './entity/listenLession.entity';
import { CreateListenLessionDTO } from './input/createListenLession.dto';

@Injectable()
export class ListenLessionService {
  constructor(
    @InjectRepository(ListenGroup)
    private readonly listenGroupRepository: Repository<ListenGroup>,
    @InjectRepository(ListenSentence)
    private readonly listenSentenceRepository: Repository<ListenSentence>,
    @InjectRepository(ListenLession)
    private readonly listenLessionRepository: Repository<ListenLession>,
  ) {}
  async createListenLessionWithSentence(
    id: string,
    createListenLessionDTO: CreateListenLessionDTO,
  ) {
    const listenGroup = await this.listenGroupRepository.findOne({
      where: { id },
    });
    if (!listenGroup) {
      throw new NotFoundException('Listen group not found');
    }
    // const listenLession = new ListenLession({
    //   ...createListenLessionDTO,
    //   listenGroup,
    // });
    // const listenSentence = new ListenSentence({
    //   ...createListenLessionDTO,
    //   listenLession,
    // });
    // await this.listenLessionRepository.save(listenLession);
    // await this.listenSentenceRepository.save(listenSentence);
    // return listenLession;
  }
}
