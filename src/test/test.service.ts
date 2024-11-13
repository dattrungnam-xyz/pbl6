import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedTest, Test } from './entity/test.entity';
import { Repository } from 'typeorm';
import { CreateTestDTO } from './input/createTest.dto';
import { UpdateTestDTO } from './input/updateTest.dto';
import { GroupQuestion } from '../group-question/entity/groupQuestion.entity';
import { Question } from '../question/entity/question.entity';
import { TagService } from '../tag/tag.service';
import { PartService } from '../part/part.service';
import { GroupQuestionService } from '../group-question/group-question.service';
import { QuestionMediaService } from '../question-media/question-media.service';
import { UpdateTagsTestDTO } from './input/updateTagTest.dto';
import { CloudinaryOutput } from '../cloudinary/cloudinary.output';
import { paginate } from '../pagination/paginator';

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

  async createEntireTest(createTestDTO: CreateTestDTO): Promise<Test> {
    // create test
    let test = new Test({
      name: createTestDTO.name,
      time: createTestDTO.time || 120,
    });
    test = await this.testRepository.save(test);

    // handle mapping tag or create tag
    const tags = await this.tagService.findOrCreateTags(
      createTestDTO.tags || [],
    );
    test.tags = Promise.resolve(tags);

    // handle create group question
    let groupQuestions = [];
    createTestDTO.partData.forEach(async (data) => {
      let part = await this.partService.findPartBy({ id: data.part });
      if (!part) {
        throw new NotFoundException('Part not found');
      }
      const listGroupQuestion =
        await this.groupQuestionService.createListGroupQuestion(
          data.groupQuestionData,
          part,
          test,
        );
      groupQuestions = [...groupQuestions, ...listGroupQuestion];
    });
    test.groupQuestions = Promise.resolve(groupQuestions);
    return await this.testRepository.save(test);
  }

  async updateTest(id: string, updateTestDTO: UpdateTestDTO): Promise<Test> {
    let test = await this.testRepository.findOneBy({ id: id });
    if (!test) {
      throw new NotFoundException('Test not found');
    }
    return await this.testRepository.save(
      new Test({ ...test, ...updateTestDTO }),
    );
  }

  async deleteTest(id: string) {
    let test = await this.testRepository.findOneBy({ id });
    if (!test) {
      throw new NotFoundException('Test not found');
    }
    return await this.testRepository.softDelete(id);
  }
  async updateTagsOfTest(id: string, updateTagsTestDTO: UpdateTagsTestDTO) {
    let test = await this.testRepository.findOneBy({ id });
    if (!test) {
      throw new NotFoundException('Test not found');
    }
    let listTag = (await test.tags).filter(
      (tag) => !updateTagsTestDTO.pull.includes(tag.id),
    );
    for (let tag of await this.tagService.findOrCreateTags(
      updateTagsTestDTO.push || [],
    )) {
      if (listTag.findIndex((ltag) => ltag.id === tag.id) === -1) {
        listTag.push(tag);
      }
    }
    test.tags = Promise.resolve(listTag);
    return await this.testRepository.save(test);
  }
  async findAll() {
    return await this.testRepository.find({
      relations: [
        'tags',
        'groupQuestions',
        'groupQuestions.questions',
        'groupQuestions.questionMedia',
      ],
      order: { createdAt: 'DESC' },
    });
  }
  async findOneById(id: string) {
    return await this.testRepository.findOne({
      where: { id: id },
      relations: [
        'tags',
        'groupQuestions',
        'groupQuestions.questions',
        'groupQuestions.questionMedia',
        'groupQuestions.part',
      ],
    });
  }

  async findPagination(limit = 15, page = 0) {
    const offset = page * limit;
    const qb = this.testRepository
      .createQueryBuilder('test')
      .leftJoinAndSelect('test.tags', 'tags')
      .leftJoinAndSelect('test.groupQuestions', 'groupQuestions')
      .leftJoinAndSelect('groupQuestions.questions', 'questions')
      .leftJoinAndSelect('groupQuestions.questionMedia', 'questionMedia')
      .orderBy('test.createdAt', 'DESC');
    return paginate<Test, PaginatedTest>(qb, PaginatedTest, {
      limit,
      page,
      total: true,
    });
  }
}
