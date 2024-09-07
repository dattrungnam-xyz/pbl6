import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EngLishTest } from './entity/englishTest.entity';
import { CreateEnglishTestDTO } from './input/createEnglishTest.dto';
import { UpdateEnglishTestDTO } from './input/updateEnglishTest.dto';

@Injectable()
export class EnglishTestService {
  constructor(
    @InjectRepository(EngLishTest)
    private readonly englishRepository: Repository<EngLishTest>,
  ) {}

  async createEnglishTest(
    createEnglishTestDTO: CreateEnglishTestDTO,
  ): Promise<EngLishTest> {
    return this.englishRepository.save(
      new EngLishTest({ ...createEnglishTestDTO }),
    );
  }

  async updateEnglishTest(
    updateEnglishTestDTO: UpdateEnglishTestDTO,
  ): Promise<EngLishTest> {
    let englishTest = await this.englishRepository.findOneBy({
      id: updateEnglishTestDTO.id,
    });
    if (!englishTest) {
      throw new NotFoundException('English test not found.');
    }
    return await this.englishRepository.save(
      new EngLishTest({ ...englishTest, ...updateEnglishTestDTO }),
    );
  }
}
