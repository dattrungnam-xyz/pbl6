import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './entity/word.entity';
import { Repository } from 'typeorm';
import { CreateWordDTO } from './input/createWord.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateWordDTO } from './input/updateWord.dto';
import { Topic } from '../topic/entity/topic.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word) private readonly wordRepository: Repository<Word>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async createListWord(listWord: CreateWordDTO[]) {
    const newListWord = listWord.map(async (word) => {
      if (word.thumbnail) {
        word.thumbnail = await this.cloudinaryService.uploadBase64(
          word.thumbnail,
        );
      }
      if (word.audio) {
        word.audio = await this.cloudinaryService.uploadBase64(word.audio);
      }
      if (word.exampleAudio) {
        word.exampleAudio = await this.cloudinaryService.uploadBase64(
          word.exampleAudio,
        );
      }
      return word;
    });

    const wordPromise = newListWord.map(async (word) => {
      return this.wordRepository.save(new Word({ ...(await word) }));
    });
    let listQuestion = await Promise.all(wordPromise);
    return listQuestion;
  }
  async createWord(createWordDTO: CreateWordDTO, id?: string) {
    if (createWordDTO.thumbnail) {
      createWordDTO.thumbnail = await this.cloudinaryService.uploadBase64(
        createWordDTO.thumbnail,
      );
    }
    if (createWordDTO.audio) {
      createWordDTO.audio = await this.cloudinaryService.uploadBase64(
        createWordDTO.audio,
      );
    }
    const newWord = new Word({ ...createWordDTO });
    if (id) {
      const topic = await this.topicRepository.findOneBy({ id });
      if (!topic) throw new NotFoundException('Topic not found');
      newWord.topic = Promise.resolve(topic);
    }
    return await this.wordRepository.save(newWord);
  }
  async updateWord(id: string, updateWordDTO: UpdateWordDTO) {
    let word = await this.wordRepository.findOneBy({ id });
    if (!word) {
      throw new NotFoundException('Word not found');
    }
    if (updateWordDTO.thumbnail) {
      updateWordDTO.thumbnail = await this.cloudinaryService.uploadBase64(
        updateWordDTO.thumbnail,
      );
    }
    if (updateWordDTO.audio) {
      updateWordDTO.audio = await this.cloudinaryService.uploadBase64(
        updateWordDTO.audio,
      );
    }
    if (updateWordDTO.exampleAudio) {
      updateWordDTO.exampleAudio = await this.cloudinaryService.uploadBase64(
        updateWordDTO.exampleAudio,
      );
    }
    Object.assign(word, updateWordDTO);
    return await this.wordRepository.save(word);
  }
  async findWordById(id: string) {
    return await this.wordRepository.findOneBy({ id });
  }
}
