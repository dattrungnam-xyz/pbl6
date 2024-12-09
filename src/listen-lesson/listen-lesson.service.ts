import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenGroup } from '../listen-group/entity/listenGroup.entity';
import { Repository } from 'typeorm';
import { ListenSentence } from '../listen-sentence/entity/listenSentence.entity';
import { ListenLesson } from './entity/listenLesson.entity';
import { CreateListenLessonDTO } from './input/createListenLesson.dto';
import { ListenSentenceService } from '../listen-sentence/listen-sentence.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateListenLessonDTO } from './input/updateListenLesson.dto';

@Injectable()
export class ListenLessonService {
  constructor(
    @InjectRepository(ListenGroup)
    private readonly listenGroupRepository: Repository<ListenGroup>,
    @InjectRepository(ListenSentence)
    private readonly listenSentenceRepository: Repository<ListenSentence>,
    @InjectRepository(ListenLesson)
    private readonly listenLessonRepository: Repository<ListenLesson>,
    private readonly listenSentenceService: ListenSentenceService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async createListenLessonWithSentence(
    id: string,
    createListenLessonDTO: CreateListenLessonDTO,
  ) {
    const listenGroup = await this.listenGroupRepository.findOne({
      where: { id },
    });
    if (!listenGroup) {
      throw new NotFoundException('Listen group not found');
    }
    const listenLesson = new ListenLesson({});
    listenLesson.listenGroup = listenGroup;
    if (createListenLessonDTO.listenSentences) {
      listenLesson.listenSentences =
        await this.listenSentenceService.createListListenSentence(
          createListenLessonDTO.listenSentences,
        );
      delete createListenLessonDTO.listenSentences;
    }
    if (createListenLessonDTO.audioUrl) {
      createListenLessonDTO.audio = createListenLessonDTO.audioUrl;
    } else if (createListenLessonDTO.audio) {
      createListenLessonDTO.audio = await this.cloudinaryService.uploadBase64(
        createListenLessonDTO.audio,
      );
    }
    Object.assign(listenLesson, createListenLessonDTO);

    return await this.listenLessonRepository.save(listenLesson);
  }

  async getListenLesson(id: string) {
    const result = await this.listenLessonRepository.findOne({
      where: { id },
      relations: ['listenSentences', 'listenGroup'],
    });
    result?.listenSentences.sort((a, b) => a.index - b.index);
    return result;
  }

  async getListListenLesson() {
    const result = await this.listenLessonRepository.find({
      relations: ['listenSentences', 'listenGroup'],
    });
    result.forEach((it) =>
      it.listenSentences.sort((a, b) => a.index - b.index),
    );
    return result;
  }

  async deleteListenLesson(id: string) {
    const listenLesson = await this.listenLessonRepository.findOneBy({ id });
    if (!listenLesson) {
      throw new NotFoundException('Listen lesson not found');
    }
    await this.listenLessonRepository.softDelete(id);
    return {
      message: 'Delete listen lesson successfully',
    };
  }

  async updateListenLesson(
    id: string,
    updateListenLessonDTO: UpdateListenLessonDTO,
  ) {
    const listenLesson = await this.listenLessonRepository.findOneBy({ id });
    if (!listenLesson) {
      throw new NotFoundException('Listen lesson not found');
    }
    if (updateListenLessonDTO.audioUrl) {
      updateListenLessonDTO.audio = updateListenLessonDTO.audioUrl;
    } else if (updateListenLessonDTO.audio) {
      updateListenLessonDTO.audio = await this.cloudinaryService.uploadBase64(
        updateListenLessonDTO.audio,
      );
    }
    if (updateListenLessonDTO.listenSentences) {
      updateListenLessonDTO.listenSentences =
        await this.listenSentenceService.handleUpdateOrCreateSentence(
          updateListenLessonDTO.listenSentences,
        );
    }
    Object.assign(listenLesson, updateListenLessonDTO);
    return await this.listenLessonRepository.save(
      new ListenLesson(listenLesson),
    );
  }
}
