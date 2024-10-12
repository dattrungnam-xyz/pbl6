import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entity/test.entity';
import { Repository } from 'typeorm';
import { CreateTestDTO } from './input/createTest.dto';
import { UpdateTestDTO } from './input/updateTest.dto';
import { GroupQuestion } from '../group-question/entity/groupQuestion.entity';
import { Question } from '../question/entity/question.entity';
import { TagService } from '../tag/tag.service';
import { PartService } from '../part/part.service';
import { GroupQuestionService } from '../group-question/group-question.service';
import { CloudinaryResponse } from '../cloudinary/cloudinary-response';
import { QuestionMediaService } from '../question-media/question-media.service';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private readonly testRepository: Repository<Test>,
    @InjectRepository(GroupQuestion)
    private readonly groupQuestionRepository: Repository<GroupQuestion>,
    private readonly tagService: TagService,
    private readonly partService: PartService,
    private readonly groupQuestionService: GroupQuestionService,
    private readonly questionMediaService: QuestionMediaService,
  ) {}

  // async createTest(createTestDTO: CreateTestDTO): Promise<Test> {
  //   return await this.testRepository.save(new Test({ ...createTestDTO }));
  // }

  async createEntireTest(
    createTestDTO: CreateTestDTO,
    listFile: CloudinaryResponse[],
  ): Promise<Test> {
    // create test
    let test = new Test({
      name: createTestDTO.name,
      time: createTestDTO.time || 120,
    });
    test = await this.testRepository.save(test);

    // handle mapping tag or create tag
    const tags = await this.tagService.findOrCreateTags(createTestDTO.tags);
    test.tags = Promise.resolve(tags);

    // handle create group question
    let groupQuestions = [];
    createTestDTO.partData.forEach(async (data) => {
      let part = await this.partService.findPartBy({ name: data.part });
      if (!part) {
        throw new NotFoundException('Part not found!');
      }
      const listGroupQuestion =
        await this.groupQuestionService.createListGroupQuestion(
          data.groupQuestionData,
          part,
          test,
          listFile,
        );
      groupQuestions = [...groupQuestions, ...listGroupQuestion];
    });
    test.groupQuestions = Promise.resolve(groupQuestions);
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
  async findAll() {
    return await this.testRepository.find({
      relations: ['tags', 'groupQuestions', 'groupQuestions.questions', 'groupQuestions.questionMedia'],
      order: { createdAt: 'DESC' },
    });
  }
}
