import { Body, Controller, Post } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { TranslateDTO } from './input/translate.dto';
import { TextToSpeechDTO } from './input/text2Speech.dto';

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Post()
  async translate(@Body() translateDTO: TranslateDTO) {
    return await this.translateService.getTranslations(translateDTO);
  }

  @Post('text-to-speech')
  async speak(@Body() translateDTO: TranslateDTO) {
    return await this.translateService.textToSpeech(translateDTO);
  }
  @Post('text2speech')
  async speak2(@Body() textToSpeech: TextToSpeechDTO) {
    return await this.translateService.textToSpeech2(textToSpeech);
  }
}
