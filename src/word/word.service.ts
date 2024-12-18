import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './entity/word.entity';
import { Repository } from 'typeorm';
import { CreateWordDTO } from './input/createWord.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateWordDTO } from './input/updateWord.dto';
import { Topic } from '../topic/entity/topic.entity';
import { UserTopic } from '../user-topic/entity/userTopic.entity';
import { TranslateService } from '../translate/translate.service';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word) private readonly wordRepository: Repository<Word>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(UserTopic)
    private readonly userTopicRepository: Repository<UserTopic>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly translateService: TranslateService,
  ) {}
  async createListWord(listWord: CreateWordDTO[]) {
    const newListWord = listWord.map(async (word) => {
      word = (await this.handleImageAudio(word)) as CreateWordDTO;
      return word;
    });

    const wordPromise = newListWord.map(async (word) => {
      return this.wordRepository.save(new Word({ ...(await word) }));
    });
    let listWords = await Promise.all(wordPromise);
    return listWords;
  }

  async createWord(createWordDTO: CreateWordDTO, id?: string) {
    createWordDTO = (await this.handleImageAudio(
      createWordDTO,
    )) as CreateWordDTO;
    const newWord = new Word({ ...createWordDTO });

    if (!createWordDTO.exampleMeaning) {
      newWord.exampleMeaning = (
        await this.translateService.getTranslations({
          from: 'en',
          to: 'vi',
          text: createWordDTO.example,
        })
      ).text;
    }
    if (!createWordDTO.exampleAudio && !createWordDTO.exampleAudioUrl) {
      newWord.exampleAudio = (
        await this.translateService.textToSpeech({
          text: createWordDTO.example,
          to: 'vi',
          from: 'en',
        })
      ).url;
    }
    if (id) {
      const topic = await this.topicRepository.findOneBy({ id });
      if (!topic) throw new NotFoundException('Topic not found');
      newWord.topic = topic;
    }
    return await this.wordRepository.save(newWord);
  }

  async createWordWithUserTopic(createWordDTO: CreateWordDTO, id: string) {
    const userTopic = await this.userTopicRepository.findOneBy({
      id,
    });
    if (!userTopic) throw new NotFoundException('User topic not found');
    createWordDTO = (await this.handleImageAudio(
      createWordDTO,
    )) as CreateWordDTO;
    const newWord = new Word({ ...createWordDTO, userTopic: [userTopic] });
    return await this.wordRepository.save(newWord);
  }

  async updateWord(id: string, updateWordDTO: UpdateWordDTO) {
    let word = await this.wordRepository.findOneBy({ id });
    if (!word) {
      throw new NotFoundException('Word not found');
    }
    if (updateWordDTO.idTopic) {
      const topic = await this.topicRepository.findOneBy({
        id: updateWordDTO.idTopic,
      });
      if (!topic) throw new NotFoundException('Topic not found');
      word.topic = topic;
    }
    updateWordDTO = (await this.handleImageAudio(
      updateWordDTO,
    )) as UpdateWordDTO;
    Object.assign(word, updateWordDTO);
    return await this.wordRepository.save(word);
  }
  async findWordById(id: string) {
    return await this.wordRepository.findOneBy({ id });
  }
  async deleteWord(id: string) {
    const word = await this.wordRepository.findOneBy({ id });
    if (!word) throw new NotFoundException('Word not found');
    return await this.wordRepository.softDelete(id);
  }

  async handleImageAudio(obj: CreateWordDTO | UpdateWordDTO) {
    if (obj.audioUrl) {
      obj.audio = obj.audioUrl;
    } else if (obj.audio) {
      obj.audio = await this.cloudinaryService.uploadBase64(obj.audio);
    }
    if (obj.exampleAudioUrl) {
      obj.exampleAudio = obj.exampleAudioUrl;
    } else if (obj.exampleAudio) {
      obj.exampleAudio = await this.cloudinaryService.uploadBase64(
        obj.exampleAudio,
      );
    }
    if (obj.thumbnailUrl) {
      obj.thumbnail = obj.thumbnailUrl;
    } else if (obj.thumbnail) {
      obj.thumbnail = await this.cloudinaryService.uploadBase64(obj.thumbnail);
    }
    return obj;
  }
  async findWord() {
    return await this.wordRepository.find();
  }
}
