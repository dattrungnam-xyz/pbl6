import { Injectable } from '@nestjs/common';
import {
  translate,
  Translator,
  speak,
  singleTranslate,
  batchTranslate,
  languages,
  isSupported,
  getCode,
} from 'google-translate-api-x';
import { TranslateDTO } from './input/translate.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class TranslateService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  async getTranslations(translateDTO: TranslateDTO) {
    const { text = '', from = 'en', to = 'vi' } = translateDTO;
    const res = await translate(text, {
      to,
      from,
      autoCorrect: true,
    });
    return { text: res.text.toLowerCase(), res };
  }

  async textToSpeech(translateDTO: TranslateDTO) {
    const { text = '', from = 'en', to = 'vi' } = translateDTO;
    const res = await speak(text, { to });
    const newBase64data = 'data:audio/mpeg;base64,' + res;
    const url = await this.cloudinaryService.uploadBase64(newBase64data);
    return { url };
  }
}
