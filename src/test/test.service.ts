import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entity/test.entity';
import { Repository } from 'typeorm';
import { CreateTestDTO } from './input/createTest.dto';
import { UpdateTestDTO } from './input/updateTest.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private readonly testRepository: Repository<Test>,
  ) {}

  async createTest(createTestDTO: CreateTestDTO): Promise<Test> {
    return await this.testRepository.save(new Test({ ...createTestDTO }));
  }
  async updateTest(updateTestDTO: UpdateTestDTO): Promise<Test> {
    let test = await this.testRepository.findOneBy({ id: updateTestDTO.id });
    if (!test) {
      throw new NotFoundException('Test not found.');
    }
    return await this.testRepository.save(
      new Test({ ...test, ...updateTestDTO }),
    );
  }
  async deleteTest(id: string) {
    return await this.testRepository.softDelete(id);
  }
}
