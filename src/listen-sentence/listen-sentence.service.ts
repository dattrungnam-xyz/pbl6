import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenSentence } from './entity/listenSentence.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ListenSentenceService {
  constructor(
    @InjectRepository(ListenSentence)
    private readonly listenSentenceRepository: Repository<ListenSentence>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createListListenSentence(listenSentences: ListenSentence[]) {}
}
