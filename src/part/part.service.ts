import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from './entity/part.entity';
import { Repository } from 'typeorm';
import { CreatePartDTO } from './input/createPart.dto';
import { EngLishTest } from '../english-test/entity/englishTest.entity';

@Injectable()
export class PartService {
  constructor(
    @InjectRepository(Part) private readonly partRepository: Repository<Part>,
    @InjectRepository(EngLishTest)
    private readonly engLishTestRepository: Repository<EngLishTest>,
  ) {}

  async createPart(createPartDTO: CreatePartDTO): Promise<Part> {
    let part = new Part({ ...createPartDTO });
    if (createPartDTO.idTest) {
      part.test = this.engLishTestRepository.findOneBy({
        id: createPartDTO.idTest,
      });
    }
    return await this.partRepository.save(part);
  }
}
