import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenSentence } from './entity/listenSentence.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateListenSentenceDTO } from './input/createListenSentence.dto';

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
}
