import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from './entity/part.entity';
import { Repository } from 'typeorm';
import { CreatePartDTO } from './input/createPart.dto';

@Injectable()
export class PartService {
  constructor(
    @InjectRepository(Part) private readonly partRepository: Repository<Part>,
  ) {}

  async createPart(createPartDTO: CreatePartDTO): Promise<Part> {
    let part = new Part({ ...createPartDTO });

    return await this.partRepository.save(part);
  }
  async findPartBy(params: { name: string } | { id: string }) {
    return this.partRepository.findOneBy(params);
  }
}
