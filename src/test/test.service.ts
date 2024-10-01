import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entity/test.entity';
import { Repository } from 'typeorm';
import { CreateTestDTO } from './input/createTest.dto';
import { UpdateTestDTO } from './input/updateTest.dto';
import { Tag } from '../tag/entity/tag.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private readonly testRepository: Repository<Test>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  // async createTest(createTestDTO: CreateTestDTO): Promise<Test> {
  //   return await this.testRepository.save(new Test({ ...createTestDTO }));
  // }

  async createEntireTest(createTestDTO: CreateTestDTO): Promise<Test> {
    // create test
    let test = new Test({
      name: createTestDTO.name,
      time: createTestDTO.time || 120,
    });

    // handle mapping tag or create tag
    let tagPromise = createTestDTO.tags.map((tag) => {
      if (tag.id) {
        return this.tagRepository.findOneBy({ id: tag.id });
      }
      return this.tagRepository.save(new Tag({ name: tag.name }));
    });
    const tags = await Promise.all(tagPromise);
    test.tags = Promise.resolve(tags);


    // handle create group question
    createTestDTO.partData.map((data)=>{

    })




    return await this.testRepository.save(test);
  }


  // async updateTest(updateTestDTO: UpdateTestDTO): Promise<Test> {
  //   let test = await this.testRepository.findOneBy({ id: updateTestDTO.id });
  //   if (!test) {
  //     throw new NotFoundException('Test not found.');
  //   }
  //   return await this.testRepository.save(
  //     new Test({ ...test, ...updateTestDTO }),
  //   );
  // }
  async deleteTest(id: string) {
    return await this.testRepository.softDelete(id);
  }
  async findAll()
  {
    return await this.testRepository.find({relations: ['tags']})
  }
}
