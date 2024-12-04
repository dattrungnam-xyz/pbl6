import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenGroup } from '../listen-group/entity/listenGroup.entity';
import { Repository } from 'typeorm';
import { ListenSentence } from '../listen-sentence/entity/listenSentence.entity';
import { ListenLession } from './entity/listenLession.entity';
import { CreateListenLessionDTO } from './input/createListenLession.dto';
import { ListenSentenceService } from '../listen-sentence/listen-sentence.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

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
    if (createListenLessionDTO.listenSentences) {
      listenLession.listenSentences =
        await this.listenSentenceService.createListListenSentence(
          createListenLessionDTO.listenSentences,
        );
    }
    if (createListenLessionDTO.audioUrl) {
      createListenLessionDTO.audio = createListenLessionDTO.audioUrl;
    } else if (createListenLessionDTO.audio) {
      createListenLessionDTO.audio = await this.cloudinaryService.uploadBase64(
        createListenLessionDTO.audioUrl,
      );
    }
    Object.assign(listenLession, createListenLessionDTO);
    return await this.listenLessionRepository.save(listenLession);
  }
}
