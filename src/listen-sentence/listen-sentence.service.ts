import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenSentence } from './entity/listenSentence.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateListenSentenceDTO } from './input/createListenSentence.dto';
import { UpdateListenSentenceDTO } from './input/updateListenSentence.dto';

@Injectable()
export class ListenSentenceService {
  constructor(
    @InjectRepository(ListenSentence)
    private readonly listenSentenceRepository: Repository<ListenSentence>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createListListenSentence(
    createListenSentenceDTO: CreateListenSentenceDTO[],
  ) {
    createListenSentenceDTO = await Promise.all(
      createListenSentenceDTO.map(async (sentence) => {
        if (sentence.audioUrl) {
          sentence.audio = sentence.audioUrl;
        } else if (sentence.audio) {
          const uploadResult = await this.cloudinaryService.uploadBase64(
            sentence.audio,
          );
          sentence.audio = uploadResult;
        }
        return sentence;
      }),
    );
    const listenSentencesPromise = createListenSentenceDTO.map(
      (listenSentence) => {
        return this.listenSentenceRepository.save(
          new ListenSentence({ ...listenSentence }),
        );
      },
    );
    return await Promise.all(listenSentencesPromise);
  }

  async updateListenSentence(
    id: string,
    updateListenSentenceDTO: UpdateListenSentenceDTO,
  ) {
    const listenSentence = await this.listenSentenceRepository.findOneBy({
      id,
    });
    if (!listenSentence) {
      throw new NotFoundException('Listen Sentence not found');
    }
    if (updateListenSentenceDTO.audioUrl) {
      updateListenSentenceDTO.audio = updateListenSentenceDTO.audioUrl;
    } else if (updateListenSentenceDTO.audio) {
      const uploadResult = await this.cloudinaryService.uploadBase64(
        updateListenSentenceDTO.audio,
      );
      updateListenSentenceDTO.audio = uploadResult;
    }
    return await this.listenSentenceRepository.save(
      new ListenSentence({ ...listenSentence, ...updateListenSentenceDTO }),
    );
  }
  async deleteListenSentence(id: string) {
    const listenSentence = await this.listenSentenceRepository.findOneBy({
      id,
    });
    if (!listenSentence) {
      throw new NotFoundException('Listen Sentence not found');
    }
    await this.listenSentenceRepository.softDelete({ id });
    return { message: 'Listen Sentence deleted successfully' };
  }
  async getListenSentenceByLesson(idLesson: string) {
    return await this.listenSentenceRepository.find({
      where: { listenLesson: { id: idLesson } },
      relations: ['listenLesson'],
    });
  }
  async handleUpdateOrCreateSentence(listSentence: UpdateListenSentenceDTO[]) {
    listSentence = await Promise.all(
      listSentence.map(async (sentence) => {
        if (sentence.audioUrl) {
          sentence.audio = sentence.audioUrl;
        } else if (sentence.audio) {
          const uploadResult = await this.cloudinaryService.uploadBase64(
            sentence.audio,
          );
          sentence.audio = uploadResult;
        }
        return sentence;
      }),
    );
    const listenSentencesPromise = listSentence.map((sentence) => {
      if (!sentence.id) {
        return this.listenSentenceRepository.save(
          new ListenSentence({ ...sentence }),
        );
      }
      return this.listenSentenceRepository.save(
        new ListenSentence({ ...sentence }),
      );
    });
    return await Promise.all(listenSentencesPromise);
  }
}
