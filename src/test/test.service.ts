import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedTest, Test } from './entity/test.entity';
import { Repository } from 'typeorm';
import { CreateTestDTO } from './input/createTest.dto';
import { UpdateTestDTO } from './input/updateTest.dto';
import { TagService } from '../tag/tag.service';
import { PartService } from '../part/part.service';
import { GroupQuestionService } from '../group-question/group-question.service';
import { UpdateTagsTestDTO } from './input/updateTagTest.dto';
import { paginate } from '../pagination/paginator';
import { DataSource } from 'typeorm';
import { UserAnswerService } from '../user-answer/user-answer.service';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private readonly testRepository: Repository<Test>,
    private readonly tagService: TagService,
    private readonly partService: PartService,
    private readonly groupQuestionService: GroupQuestionService,
    private dataSource: DataSource,
    private readonly userAnswerService: UserAnswerService,
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
    test.tags = tags;

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
    test.groupQuestions = groupQuestions;
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
    let listTag = test.tags.filter(
      (tag) => !updateTagsTestDTO.pull.includes(tag.id),
    );
    for (let tag of await this.tagService.findOrCreateTags(
      updateTagsTestDTO.push || [],
    )) {
      if (listTag.findIndex((ltag) => ltag.id === tag.id) === -1) {
        listTag.push(tag);
      }
    }
    test.tags = listTag;
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
    let result = await this.testRepository
      .createQueryBuilder('test')
      .leftJoinAndSelect('test.tags', 'tags')
      .leftJoinAndSelect('test.groupQuestions', 'groupQuestions')
      .leftJoinAndSelect('groupQuestions.questions', 'questions')
      .leftJoinAndSelect('groupQuestions.questionMedia', 'questionMedia')
      .leftJoinAndSelect('groupQuestions.part', 'part')
      .where('test.id = :id', { id })
      .getOne();

    if (result && result.groupQuestions) {
      for (const group of result.groupQuestions) {
        group.audio = [];
        group.image = [];
        for (const media of group.questionMedia) {
          if (media.type === 'audio') {
            group.audio.push(media);
          } else if (media.type === 'image') {
            group.image.push(media);
          }
        }
        if (group.questions) {
          group.questions.sort((a, b) => a.questionNumber - b.questionNumber);
        }
      }
    }
    // (await result.groupQuestions).sort((a, b) => {
    //   return a.questions[0].questionNumber - b.questions[0].questionNumber;
    // });

    return result;
  }

  async findPagination(limit = 15, page = 0, tag_id?: string) {
    const offset = page * limit;
    let qb = this.testRepository
      .createQueryBuilder('test')
      .leftJoinAndSelect('test.tags', 'tags');
    if (tag_id) {
      qb = qb.andWhere('tags.id = :tag_id', { tag_id });
    }
    qb = qb
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
  async getTestHistory(idTest: string, idUser: string) {
    let result = await this.testRepository.findOne({
      where: { id: idTest },
    });
    const query = `SELECT 
      t.id AS id,
      t.createdAt AS createdAt,
      t.deletedAt AS deletedAt,
      t.time AS time, 
      t.LCScore AS LCScore, 
      t.RCScore AS RCScore,
      t.isFullTest AS isFullTest, 
      t.totalQuestion AS totalQuestion, 
      t.numCorrect AS numCorrect
    FROM test_practice as t
    LEFT JOIN user as u 
      ON u.id = t.userId 
      AND u.deletedAt IS NULL
    LEFT JOIN test as test 
      ON test.id = t.testId 
      AND test.deletedAt IS NULL
    WHERE u.id = "${idUser}" 
      AND test.id = "${idTest}"
      AND t.deletedAt IS NULL
    ORDER BY t.createdAt DESC`;
    let testPractice = await this.dataSource.query(query);

    testPractice = await Promise.all(
      testPractice.map(async (it) => {
        it.listPart = await this.userAnswerService.getListPartOfUserAnswer(
          it.id,
        );
        return it;
      }),
    );
    return { test: result, testPractice };
  }
}
