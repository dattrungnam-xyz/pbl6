import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenGroup } from '../listen-group/entity/listenGroup.entity';
import { Repository } from 'typeorm';
import { ListenSentence } from '../listen-sentence/entity/listenSentence.entity';
import { ListenLession } from './entity/listenLession.entity';
import { CreateListenLessionDTO } from './input/createListenLession.dto';
import { ListenSentenceService } from '../listen-sentence/listen-sentence.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateListenLessionDTO } from './input/updateListenLession.dto';

@Injectable()
export class ListenLessionService {
  constructor(
    @InjectRepository(ListenGroup)
    private readonly listenGroupRepository: Repository<ListenGroup>,
    @InjectRepository(ListenSentence)
    private readonly listenSentenceRepository: Repository<ListenSentence>,
    @InjectRepository(ListenLession)
    private readonly listenLessionRepository: Repository<ListenLession>,
    private readonly listenSentenceService: ListenSentenceService,
    private readonly cloudinaryService: CloudinaryService,
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
    const listenLession = new ListenLession({});
    listenLession.listenGroup = listenGroup;
    if (createListenLessionDTO.listenSentences) {
      listenLession.listenSentences =
        await this.listenSentenceService.createListListenSentence(
          createListenLessionDTO.listenSentences,
        );
      delete createListenLessionDTO.listenSentences;
    }
    if (createListenLessionDTO.audioUrl) {
      createListenLessionDTO.audio = createListenLessionDTO.audioUrl;
    } else if (createListenLessionDTO.audio) {
      createListenLessionDTO.audio = await this.cloudinaryService.uploadBase64(
        createListenLessionDTO.audio,
      );
    }
    Object.assign(listenLession, createListenLessionDTO);

    return await this.listenLessionRepository.save(listenLession);
  }

  async getListenLession(id: string) {
    const result = await this.listenLessionRepository.findOne({
      where: { id },
      relations: ['listenSentences', 'listenGroup'],
    });
    result?.listenSentences.sort((a, b) => a.index - b.index);
    return result;
  }

  async getListListenLession() {
    const result = await this.listenLessionRepository.find({
      relations: ['listenSentences', 'listenGroup'],
    });
    result.forEach((it) =>
      it.listenSentences.sort((a, b) => a.index - b.index),
    );
    return result;
  }

  async deleteListenLession(id: string) {
    const listenLession = await this.listenLessionRepository.findOneBy({ id });
    if (!listenLession) {
      throw new NotFoundException('Listen lession not found');
    }
    await this.listenLessionRepository.softDelete(id);
    return {
      message: 'Delete listen lession successfully',
    };
  }

  async updateListenLession(
    id: string,
    updateListenLessionDTO: UpdateListenLessionDTO,
  ) {
    const listenLession = await this.listenLessionRepository.findOneBy({ id });
    if (!listenLession) {
      throw new NotFoundException('Listen lession not found');
    }
    if (updateListenLessionDTO.audioUrl) {
      updateListenLessionDTO.audio = updateListenLessionDTO.audioUrl;
    } else if (updateListenLessionDTO.audio) {
      updateListenLessionDTO.audio = await this.cloudinaryService.uploadBase64(
        updateListenLessionDTO.audio,
      );
    }

    return await this.listenLessionRepository.save(
      new ListenLession({ ...listenLession, ...updateListenLessionDTO }),
    );
  }
}
